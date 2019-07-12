import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const companyName = "LOLARun";

const useStyles = theme => ({
    appBar: {
      position: 'relative',
    }
});
class Notfound extends React.Component {
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
      <h1>Oops! Not Found</h1>
    </React.Fragment>
  );}
};

export default withStyles(useStyles)(Notfound);