import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import RateForm from './RateForm';
import Review from './Review';
import { Redirect, Link } from "react-router-dom";
import { SERVER_URL } from "../utils";
import axios from "axios"; 

const companyName = 'LOLARun'

const useStyles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

function getDefaultAddress() {
  return {
    firstName: '',
    lastName: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  };
}

const steps = ['Shipping address', 'Show rates', 'Review order'];

class Ship extends React.Component {
  state = {
    selectedOrderID: null,
    fromAddress: getDefaultAddress(),
    toAddress: getDefaultAddress(),
    activeStep: 0,
    redirect: false
  };

  setSelectedOrderID = (orderID) => {
    this.setState({
      selectedOrderID: orderID,
    });
  }

  updateAddress = (isFrom = false, update = {}) => {
    const { fromAddress, toAddress } = this.state;
    if (isFrom) {
      this.setState({
        fromAddress: {
          ...fromAddress,
          ...update,
        },
      });
    } else {
      this.setState({
        toAddress: {
          ...toAddress,
          ...update,
        },
      });
    }
  }

  handleNext = () => {
    switch (this.state.activeStep) {
      case 0:
        // TODO: Make API call to get quote
        break;
      case 2:
        // TODO: Make API call to place order
          setTimeout(() => {
            this.setState({
              redirect: true,
            })
          }, 3000);
        break;
      default:
    }
    this.setState(prevState => ({ activeStep: prevState.activeStep + 1}));
  }

  handleBack = () => {
    this.setState(prevState => ({ activeStep: prevState.activeStep - 1}));
  }

  renderContent() {
    const {
      fromAddress,
      toAddress,
      selectedOrderID,
      activeStep
    } = this.state;

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
            selectedOrderID={selectedOrderID}
            setSelectedOrderID={this.setSelectedOrderID}
            fromAddress={fromAddress}
            toAddress={toAddress}
          />
        );
      case 2:
        return (
          <Review
            fromAddress={fromAddress}
            toAddress={toAddress}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }
  render() {
    const { classes } = this.props;
    const {
      selectedOrderID,
      fromAddress,
      toAddress,
      activeStep
    } = this.state;

    let isNextButtonDisabled = false;
    switch (activeStep) {
      case 0:
        if (
          fromAddress.firstName === '' ||
          fromAddress.addressLine1 === '' ||
          fromAddress.city === '' ||
          toAddress.firstName === '' ||
          toAddress.addressLine1 === '' ||
          toAddress.city === ''
        ) {
          isNextButtonDisabled = true;
        }
        break;
      case 1:
        if (selectedOrderID === null) {
          isNextButtonDisabled = true;
        }
        break;
      default:
    }

    if (this.state.redirect) {
      return <Redirect to='/' />
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
          <Link to= "/" style={{ textDecoration: "none"}} >
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
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your tracking number is #2001539. Please use this tracking number to
                    track your package status. Thank you for using our service!
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.renderContent()}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
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
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
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

export default withStyles(useStyles)(Ship);
