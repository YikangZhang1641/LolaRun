import React from "react"
import TextField from "@material-ui/core/TextField/TextField"
import Button from "@material-ui/core/Button/Button"

export default function TrackForm(props) {
    const { trackingNumber, updateTrackingNumber,submitInput } = props;
    return (
        <React.Fragment>
            <div>
                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="user_id"
                        label="Tracking Number"
                        name="track"
                        autoFocus
                        value={trackingNumber}
                        onChange={event => {
                            updateTrackingNumber({ trackingNumber: event.target.value });

                        }}
                    />
                    <Button
                        type="submit"
                        width = "100%"
                        variant="contained"
                        color="primary"
                        onClick={submitInput}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </React.Fragment>
    );
}

