import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const infos = [
  { title: 'From', address: ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'], name: 'Lillian Wood'},
  { title: 'To', address: ['555 Palo Verde Rd', 'San Francisco', 'CA', '94402', 'USA'], name:'John Smith'},
];

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

export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {infos.map(info => (
          <Grid key={info.title}>
            <Typography variant="subtitle1" align="left" color="textSecondary" component="p">
              {info.title + ': ' + info.name}
            </Typography>
            <Typography variant="subtitle1" align="left" color="textPrimary" component="p">
              {info.address.join(', ')}
            </Typography>
          </Grid>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" secondary="Estimated Arrival: 2019/06/30 15:00"/>
          <Typography variant="subtitle1" className={classes.total}>
            $15.00
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
