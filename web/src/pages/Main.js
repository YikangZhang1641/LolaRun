import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Checkout from './Shipping/Checkout';
import Track from './Tracking/Track';
import Home from './Homepage/Home';
import Notfound from './FourOhFour/Notfound';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/tracking" component={Track} />
    <Route path="/shipping" component={Checkout} />
    <Route component={Notfound} />
  </Switch>
)

export default Main;