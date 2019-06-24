import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(3, 0, 10),
  },
  main: {
    padding: theme.spacing(0, 0, 10),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  cardButton: {
    display: "block",
    textAlign: "center",
    fontSize:"20px",
  },
}));

const tiers = [
  {
    orderId: "123",
    title: 'Drone',
    subheader:'Super-Fast',
    description: ['some description...', 'delivered by: 2019/07/01 15:30'],
    price:'15.32',
  },
  {
    orderId: "456",
    title: 'Robot',
    subheader:'Fast',
    description: ['some description too', 'delivered by: 2019/07/01 10:30'],
    price:'7.15',
  },
];

const infos = [
  { title: 'From', address: ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'], name: 'Lillian Wood'},
  { title: 'To', address: ['555 Palo Verde Rd', 'San Francisco', 'CA', '94402', 'USA'], name:'John Smith'},
];

export default function RateForm() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        {infos.map(info => (
          <Grid key={info.title}>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              {info.title + ': ' + info.name}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textPrimary" component="p">
              {info.address.join(', ')}
            </Typography>
          </Grid>
        ))}
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" className={classes.main}>
        <Grid container spacing={5} >
          {tiers.map(tier => (
            <Grid item key={tier.orderId} xs={12} sm={6} md={6}>
              <Card onClick={() => {
                // TODO (yulin: comeback and provide select shipping method callback)
              }}>
                <CardActionArea>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <ul>
                      {tier.description.map(line => (
                        <Typography key={tier.orderId} component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                    <Button fullWidth variant="contained" color="primary" size="large" className={classes.cardButton}>
                      ${tier.price}
                    </Button>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
