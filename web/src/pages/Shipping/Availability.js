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

const useStyles = makeStyles(theme => {
  console.log(theme);
  return {
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
};});

const tiers = [
    {
      title: 'Drone',
      subheader:'Super-Fast',
      description: ['some description...'],
      avaiable: true
    },
    {
      title: 'Robot',
      subheader:'Fast',
      description: ['some description too'],
      avaiable: true
    },
  ];

export default function Availability(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" component="main" className={classes.main}>
        <Grid container spacing={5} >
          {tiers.map(tier => (
            <Grid item key={tier.orderId} xs={12} sm={6} md={6}>
              <Card>
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
                        <Typography
                          key={tier.orderId}
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
