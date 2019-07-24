import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

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
    render() {
        const { trackResult,classes } = this.props;
        let activeStep = 0;
        switch (trackResult.track_status){
            case 'Order Placed':
                activeStep = 0;
                break;
            case 'In Transit':
                activeStep = 1;
                break;
            case 'Delivered':
                activeStep = 2;
                break;
            default:
                throw new Error("Unknown step");
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

