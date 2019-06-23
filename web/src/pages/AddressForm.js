import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function InputAddress(props) {
  const { address, updateAddress, isFrom } = props;
  return(
    <div style={{ marginBottom: '3rem' }}>
      <Typography variant="h6" align='left'>
        {props.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={address.firstName}
            onChange={(event) => {
              updateAddress(isFrom, { firstName: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            onChange={(event) => {
              updateAddress(isFrom, { lastName: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            onChange={(event) => {
              updateAddress(isFrom, { addressLine1: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            onChange={(event) => {
              updateAddress(isFrom, { city: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            onChange={(event) => {
              updateAddress(isFrom, { state: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            onChange={(event) => {
              updateAddress(isFrom, { zipCode: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            onChange={(event) => {
              updateAddress(isFrom, { country: event.target.value });
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default function AddressForm(props) {
  const { fromAddress, toAddress, updateAddress } = props;
  return (
    <React.Fragment>
      <InputAddress title="From" address={fromAddress} updateAddress={updateAddress} isFrom={true} />
      <InputAddress title="To" address={toAddress} updateAddress={updateAddress} />
    </React.Fragment>
  );
}
