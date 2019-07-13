import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => {
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

export default function RateForm(props) {
  const { shippingOptions, selectedOptions, setSelectedOptions, fromAddress, toAddress } = props;
  const infos = [fromAddress, toAddress];
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        {infos.map((info, index) => {
          return (
            <Grid key={info.title}>
              <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                {(index === 0 ? 'From' : 'To') + ': ' + info.firstName + ' ' + info.lastName}
              </Typography>
              <Typography variant="subtitle1" align="center" color="textPrimary" component="p">
                {info.addressLine1 + ', ' + info.city + ', ' + info.state}
              </Typography>
            </Grid>
          )})}
      </Container>
      <Container maxWidth="md" component="main" className={classes.main}>
        <Grid container spacing={5} >
          {shippingOptions.map(item => (
            <Grid item key={item.robotType} xs={12} sm={6} md={6}>
              <Card onClick={() => {
                setSelectedOptions(item);
              }}>
                <CardActionArea>
                  <CardHeader
                    title={item.robotType}
                    subheader={item.duration}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <Typography
                      component="li"
                      variant="subtitle2"
                      align="center"
                    >
                      distance {item.distance}
                    </Typography>
                  </CardContent>
                  <Button
                    fullWidth
                    variant={item === selectedOptions ? 'contained' : 'outlined'}
                    color="primary"
                    size="large"
                    className={classes.cardButton}
                  >
                      price ${item.price}
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
