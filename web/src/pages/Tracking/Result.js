import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(0, 0)
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing(2)
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

export default function Result(props) {
  const { trackResult } = props;
  const classes = useStyles();
  if (trackResult === null) {
    return <CircularProgress className={classes.progress} />;
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tracking result
      </Typography>

      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Oreder ID" />
          <Typography variant="subtitle1" className={classes.total}>
            {trackResult.order_id}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Destination" secondary="" />
          <Typography variant="subtitle1" className={classes.total}>
            {trackResult.destination}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Origin" secondary="" />
          <Typography variant="subtitle1" className={classes.total}>
            {trackResult.origin}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Order Start" secondary="" />
          <Typography variant="subtitle1" className={classes.total}>
            {trackResult.time_stamp}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Shipping Method" secondary="" />
          <Typography variant="subtitle1" className={classes.total}>
            {trackResult.vehicle}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Shipping Status" secondary="" />
          <Typography variant="subtitle1" className={classes.total}>
            {trackResult.track_status}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
