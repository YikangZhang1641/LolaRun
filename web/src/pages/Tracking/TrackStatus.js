import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Firebase from 'firebase'
import config from './config'

if (!Firebase.apps.length) {
        Firebase.initializeApp(config)
 }
 
const useStyles = theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
            width: 500,
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
    submit: {
        marginTop: theme.spacing(3),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100,
    },
});

const steps = ['Order Placed','In Transit', 'Delivered'];

class TrackStatus extends React.Component {
    state = {trackResult: 0 }

    componentDidMount() {
        let ref = Firebase.database().ref('/t1/' + this.props.trackingNumber )
            ref.on('value', snapshot => {
            
            this.setState({
                trackResult: snapshot.val().trackResult
            });
            })
    }
    
    render() {
        const classes = this.props.classes
        let activeStep = 0;
        switch (this.state.trackResult){
            case 0:
                activeStep = 0;
                break;
            case 1:
                activeStep = 1;
                break;
            case 2:
                activeStep = 2;
                break;
            default:
                activeStep = 0;
                break;
        }
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                            <Step key={label} >
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(TrackStatus);

