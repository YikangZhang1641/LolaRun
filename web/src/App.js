import React from 'react';
import logo from './logo.svg';
import './App.css';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="App">
        <Checkout />
      </div>
    );
  }
}

export default App;
