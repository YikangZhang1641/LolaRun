import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import RateForm from "./RateForm";
import Review from "./Review";
import { Redirect, Link } from "react-router-dom";
import { SERVER_URL } from "../utils";
import axios from "axios";
import { withAlert } from "react-alert";

const companyName = "LOLARun";
const QUOTE_ENDPOINT = `${SERVER_URL}/search`;
const COMFIRM_ENDPOINT = `${SERVER_URL}/confirm`;
const CHECK_ENDPOINT = `${SERVER_URL}/firstcheck`;

const useStyles = theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
});

function getDefaultAddress() {
  return {
    firstName: "",
    lastName: "",
    addressLine1: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  };
}

const steps = ["Shipping address", "Shipping details", "Review order"];

class Ship extends React.Component {
  state = {
    fromAddress: getDefaultAddress(),
    toAddress: getDefaultAddress(),
    activeStep: 0,
    shippingOptions: [],
    selectedOptions: null,
    orderId: null,
    tempId: null,
    noDrone: false,
    noRobot: false,
    redirect: false,
    error: false
  };

  setSelectedOptions = selectedOptions => {
    this.setState({
      selectedOptions: selectedOptions
    });
  };

  updateAddress = (isFrom = false, update = {}) => {
    const { fromAddress, toAddress } = this.state;
    if (isFrom) {
      this.setState({
        fromAddress: {
          ...fromAddress,
          ...update
        }
      });
    } else {
      this.setState({
        toAddress: {
          ...toAddress,
          ...update
        }
      });
    }
  };

  handleNext = () => {
    switch (this.state.activeStep) {
      case 0:
        axios
          .get(QUOTE_ENDPOINT, {
            params: {
              start_location:
                this.state.fromAddress.addressLine1.split(" ").join("+") +
                "+" +
                this.state.fromAddress.city +
                "+" +
                this.state.fromAddress.state,
              end_location:
                this.state.toAddress.addressLine1.split(" ").join("+") +
                "+" +
                this.state.toAddress.city +
                "+" +
                this.state.toAddress.state
            }
          })
          .then(response => {
              this.setState({ shippingOptions: response.data });
          })
          .catch(error => {
            this.props.alert.error(
              "Oops, Something Wrong, Please double check"
            );
            console.log(error);
            this.handleBack();
          });
        break;
      case 1:
        // console.log(this.state.selectedOptions.robotType);
        // console.log(this.state.tempId);
        if ( (this.state.selectedOptions.robotType === "drone" && this.state.noDrone) 
          || (this.state.selectedOptions.robotType === "robot" && this.state.noRobot) ) {
          this.props.alert.error(
            "Oops, not avaiable, Please choose another way"
          );
          this.setState({ error: true });
        } 
        break;
      case 2:
        const payload = {
          start_location:
            this.state.fromAddress.addressLine1 +
            ", " +
            this.state.fromAddress.city +
            ", " +
            this.state.fromAddress.state,
          end_location:
            this.state.toAddress.addressLine1 +
            ", " +
            this.state.toAddress.city +
            ", " +
            this.state.toAddress.state,
          robotType: this.state.selectedOptions.robotType,
          distance: this.state.selectedOptions.distance,
          duration: this.state.selectedOptions.duration,
          price: this.state.selectedOptions.price,
          temp_id: this.state.tempId,
        };
        //console.log(payload);
        axios
          .post(COMFIRM_ENDPOINT, payload, {
            headers: {
              "Content-Type": "text/plain"
            }
          })
          .then(response => {
            this.setState({ orderId: response.data.order_id });
          })
          .catch(error => {
            this.props.alert.error(
              "Oops, Something Wrong, Please double check"
            );
            console.log(error);
            this.handleBack();
          });
        setTimeout(() => {
          this.setState({
            redirect: true
          });
        }, 5000);
        break;
      default:
    }
    this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
      selectedOptions: [],
      error: false
    }));
  };

  componentDidMount() {
        axios
          .get(CHECK_ENDPOINT)
          .then(response => {
            if (response.data.drone_id === -1 && response.data.robot_id === -1) {
              this.props.alert.info(
                "Not available robot. Please try next time"
              );
              this.setState({ redirect: true });
            } else {
              if (response.data.drone_id === -1) {
                this.setState({noDrone: true});
              }
              if (response.data.robot_id === -1) {
                this.setState({noRobot: true});
              } 
              this.setState({tempId: response.data.temp_id});
            }
          })
          .catch(error => {
            this.props.alert.error(
              "Oops, Something Wrong, Please double check"
            );
            console.log(error);
          });
  }

  renderContent() {
    const { fromAddress, toAddress, activeStep } = this.state;

    switch (activeStep) {
      case 0:
        return (
          <AddressForm
            fromAddress={fromAddress}
            toAddress={toAddress}
            updateAddress={this.updateAddress}
          />
        );
      case 1:
        return (
          <RateForm
            shippingOptions={this.state.shippingOptions}
            selectedOptions={this.state.selectedOptions}
            setSelectedOptions={this.setSelectedOptions}
            fromAddress={fromAddress}
            toAddress={toAddress}
          />
        );
      case 2:
        return (
          <Review
            selectedOptions={this.state.selectedOptions}
            fromAddress={fromAddress}
            toAddress={toAddress}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedOptions, fromAddress, toAddress, activeStep } = this.state;

    let isNextButtonDisabled = false;
    switch (activeStep) {
      case 0:
        if (
          fromAddress.firstName === "" ||
          fromAddress.addressLine1 === "" ||
          fromAddress.city === "" ||
          fromAddress.state === "" ||
          toAddress.firstName === "" ||
          toAddress.addressLine1 === "" ||
          toAddress.city === "" ||
          toAddress.state === ""
        ) {
          isNextButtonDisabled = true;
        }
        break;
      case 1:
        if (selectedOptions === null) {
          isNextButtonDisabled = true;
        }
        break;
      case 2: 
        if (this.state.error === true) {
          isNextButtonDisabled = true;
        }
        break;
      default:
    }

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="h5" color="inherit" noWrap>
                {companyName}
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Shipping
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for choosing us.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your tracking number is {this.state.orderId}. Please use
                    this tracking number to track your package status. Thank you
                    for using our service!
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.renderContent()}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      disabled={isNextButtonDisabled}
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withAlert()(withStyles(useStyles)(Ship));
