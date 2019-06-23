import React from 'react';
import logo from './logo.svg';
import './App.css';
import Checkout from './pages/Checkout';

function getDefaultAddress() {
  return {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  };
}

class App extends React.Component {
  state = {
    selectedOrderID: null,
    // add state for name, address
    fromAddress: getDefaultAddress(),
    toAddress: getDefaultAddress(),
  };

  setSelectedOrderID = (orderID) => {
    this.setState({
      selectedOrderID: orderID,
    });
  }

  updateAddress = (isFrom = false, update = {}) => {
    const { fromAddress, toAddress } = this.state;
    if (isFrom) {
      this.setState({
        fromAddress: {
          ...fromAddress,
          ...update,
        },
      });
    } else {
      this.setState({
        toAddress: {
          ...toAddress,
          ...update,
        },
      });
    }
  }

  render() {
    return(
      <div className="App">
        <Checkout
          selectedOrderID={this.state.selectedOrderID}
          setSelectedOrderID={this.setSelectedOrderID}
          fromAddress={this.state.fromAddress}
          toAddress={this.state.toAddress}
          updateAddress={this.updateAddress}
        />
      </div>
    );
  }
}

export default App;
