import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function InputNumber(props) {
  const { trackingNumber, updateTrackingNumber } = props;
  return(
    <div style={{ marginBottom: '3rem' }}>
      <Typography variant="h6" align='center' color='textPrimary'>
        {props.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="number"
            name="Tracking Number"
            label="Tracking Number"
            fullWidth
            value={trackingNumber}
            onChange={(event) => {
              updateTrackingNumber({ trackingNumber: event.target.value });
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default function TrackForm(props) {
  const { trackingNumber, updateTrackingNumber } = props;
  return (
    <React.Fragment>
      <InputNumber
        title="Please Enter The Tracking Number "
        trackingNumber={trackingNumber}
        updateTrackingNumber={updateTrackingNumber}
      />
    </React.Fragment>
  );
}
