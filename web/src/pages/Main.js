import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Ship from './Shipping/Ship';
import Track from './Tracking/Track';
import Home from './Homepage/Home';
import Notfound from './FourOhFour/Notfound';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';

// optional cofiguration for alert
const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

const Main = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/tracking" component={Track} />
      <Route path="/shipping" component={Ship} />
      <Route component={Notfound} />
    </Switch>
  </AlertProvider>
)

export default Main;