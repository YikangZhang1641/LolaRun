import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(0, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const { fromAddress, toAddress, selectedOptions } = props;
  const infos = [fromAddress, toAddress]
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {infos.map((info, index) => {
          return (
            <div key={index}>
              <Typography
                variant="subtitle1"
                align="left"
                color="textSecondary"
                component="p"
              >
                {(index === 0 ? 'From' : 'To') + ': ' + info.firstName + ' ' + info.lastName}
              </Typography>
              <Typography
                variant="subtitle1"
                align="left"
                color="textPrimary"
                component="p"
              >
                {info.addressLine1 + ', ' + info.city + ', ' + info.state}
              </Typography>
            </div>
          )})}
        <ListItem className={classes.listItem}>
        <ListItemText primary="Shipping Method"/>
            <Typography variant="subtitle1" className={classes.total}>
              {selectedOptions.robotType}
            </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
        <ListItemText primary="Estimated Arrival"/>
            <Typography variant="subtitle1" className={classes.total}>
              {selectedOptions.duration} later
            </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
        <ListItemText primary="Total"/>
            <Typography variant="subtitle1" className={classes.total}>
              ${selectedOptions.price}
            </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
