import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import TrackStatus from './TrackStatus';
import TrackForm from './TrackForm';
import MapContainer from './Map'
import { withAlert } from "react-alert";
import Firebase from 'firebase'
import config from './config'

const companyName = 'LOLARun'
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
        let ref = Firebase.database().ref('/t1/' + this.state.trackingNumber )
            ref.once('value', snapshot => {
            
            this.setState({
                trackResult: snapshot.val().trackResult
            });

           this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }));

            })

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
                return (
                    <div>
                        <TrackStatus trackingNumber={trackingNumber} trackResult={trackResult} />,
                        <MapContainer containerElement={<div style={{ height: `600px`, width: `600px` }} />}
                mapElement={<div style={{ height: `100%` }} />}trackingNumber={trackingNumber}/>
                    </div>
                )
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
                            Tracking
                        </Typography>
                        {this.renderContent()}
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}


export default withAlert()(withStyles(useStyles)(Track));