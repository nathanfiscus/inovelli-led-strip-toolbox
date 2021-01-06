import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  IconButton,
  Snackbar,
  Tooltip,
  Slide
} from "@material-ui/core";
import copyToClipboard from "./ClipboardAccess";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

class ImportProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleCopy = () => {
    copyToClipboard(`https://nathanfiscus.github.io/inovelli-led-strip-toolbox/?p22=${this.props.parameter22}&p23=${this.props.parameter23}&p24=${this.props.parameter24}&p30=${this.props.parameter30}`,this.handleOnCopy);
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };


  handleOnCopy = (success) => {
    this.setState({
      snackbarOpen: true,
      copyStatusText: success
        ? "Copied to Clipboard"
        : "Unable to copy to clipboard. Check browser settings.",
    });
  };


  render() {
    return (
      <React.Fragment>

      <Dialog open={this.props.open} fullWidth size="md">
        <DialogTitle>Share Program</DialogTitle>
        <DialogContent>
          <TextField
            value={`https://nathanfiscus.github.io/inovelli-led-strip-toolbox/?p22=${this.props.parameter22}&p23=${this.props.parameter23}&p24=${this.props.parameter24}&p30=${this.props.parameter30}`}
            label="Program Share Link"
            helperText="Copy URL to share your custom program with others."
            fullWidth={true}
            InputProps={{
              endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy to Clipboard">
                      <IconButton edge="end" onClick={this.handleCopy}>
                        <SvgIcon>
                          <svg viewBox="0 0 24 24">
                            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
              </InputAdornment>
              )}}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          TransitionComponent={SlideTransition}
          open={this.state.snackbarOpen}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          message={<span id="message-id">{this.state.copyStatusText}</span>}
        />
            </React.Fragment>
    );
  }
}

export default ImportProgram;
