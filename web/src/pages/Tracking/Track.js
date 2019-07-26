import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { SERVER_URL } from "../utils";
import TrackStatus from './TrackStatus';
import TrackForm from './TrackForm';
import { withAlert } from "react-alert";

const TRACK_ENDPOINT = `${SERVER_URL}/track`;
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
    submit: {
        marginTop: theme.spacing(3),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100,
    },
});

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Built with love by the '}
            <Link color="inherit" href="https://material-ui.com/">
                {companyName}
            </Link>
            {' team.'}
        </Typography>
    );
}

class Track extends React.Component {
    state = {
        trackingNumber: null,
        trackResult: null,
        activeStep: 0,
    }
    updateTrackingNumber = (update = {}) => {
        this.setState({
            trackingNumber: update.trackingNumber
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.trackingNumber == null){
            this.props.alert.error(
                "Please input the Tracking Number"
            );
            return;
        }
        fetch(TRACK_ENDPOINT + '?order_id='+ this.state.trackingNumber)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error("this is error");
            })
            .then(response =>  {
                    this.setState({trackResult: response});
                    this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }));
                }
            )
            .catch(err =>{
                    console.error(err);
                    this.props.alert.error(
                        "Oops,No Tracking Number in not in record"
                    );
            }
            );

    }

    renderContent() {
        const { trackingNumber, trackResult, activeStep } = this.state;
        switch (activeStep) {
            case 0:
                return (
                    <TrackForm
                        trackingNumber={trackingNumber}
                        updateTrackingNumber={this.updateTrackingNumber}
                        submitInput ={this.handleSubmit}
                    />
                );
            case 1:
                return <TrackStatus trackResult={trackResult} />;
            default:
                throw new Error("Unknown step");
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h5" color="inherit" noWrap>
                            {companyName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Tracking
                        </Typography>
                        {this.renderContent()}
                    </Paper>
                    <MadeWithLove />
                </main>
            </React.Fragment>
        );
    }
}

export default withAlert()(withStyles(useStyles)(Track));


