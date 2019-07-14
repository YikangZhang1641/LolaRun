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
import TrackForm from './TrackForm';
import Result from './Result';
import { SERVER_URL } from "../utils";
import { Redirect, Link } from "react-router-dom";
import axios from "axios"; 

const companyName = 'LOLARun';
const TRACK_ENDPOINT = `${SERVER_URL}/track`;

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

function getTrackingNumber() {
  return {
    trackingNumber: ''
  };
}

const steps = ['Tracking number', 'Shipping status'];

class Track extends React.Component {
  state = {
    trackingNumber: getTrackingNumber(),
    trackResult: null,
    activeStep: 0,
  };

  updateTrackingNumber = (update = {}) => {
    const { trackingNumber } = this.state;
      this.setState({
        trackingNumber: {
          ...trackingNumber,
          ...update,
        },
      });
  }

  handleNext = () => {
    switch (this.state.activeStep) {
      case 0:
          axios.get(TRACK_ENDPOINT, {
            params: {
              order_id: this.state.trackingNumber.trackingNumber
            }
          })
          .then((response) => {
            this.setState({trackResult: response.data});
          })               
          .catch((error)=>{
            console.log(error);
          });
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
      trackingNumber,
      trackResult,
      activeStep
    } = this.state;

    switch (activeStep) {
      case 0:
        return (
          <TrackForm
            trackingNumber={trackingNumber}
            updateTrackingNumber={this.updateTrackingNumber}
          />
        );
      case 1:
        return (
          <Result
            trackResult={trackResult}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  render() {
    const { classes } = this.props;
    const {
      trackingNumber,
      activeStep
    } = this.state;

    let isNextButtonDisabled = false;
    switch (activeStep) {
      case 0:
        if (
          trackingNumber.trackingNumber === ''
        ) {
          isNextButtonDisabled = true;
        }
        break;
      default:
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
              Track
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? 
              (<React.Fragment>
                  <Redirect to = '/' />
                </React.Fragment>) : 
              (
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
                      {activeStep === steps.length - 1 ? 'Done' : 'Next'}
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

export default withStyles(useStyles)(Track);
