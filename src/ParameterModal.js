import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  SvgIcon,
  MenuItem,
  Menu,
  Slide,
  Snackbar,
} from "@material-ui/core";
import React from "react";
import copyToClipboard from "./utils/ClipboardAccess";
import YAML from "json-to-pretty-yaml";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

class ParameterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: null,
      parameter: 0,
    };
  }

  handleCopyNumber = () => {
    this.setState({ anchor: null });
    copyToClipboard(
      this.props[`parameter${this.state.parameter}`].toString(
        Number(this.props.format || 10)
      ),
      this.handleOnCopy
    );
  };

  handleCopyYAML = () => {
    this.setState({ anchor: null });
    copyToClipboard(
      YAML.stringify({
        parameter: this.state.parameter,
        value: this.props[`parameter${this.state.parameter}`].toString(
          Number(this.props.format || 10)
        ),
      }),
      this.handleOnCopy
    );
  };

  handleOnCopy = (success) => {
    this.setState({
      snackbarOpen: true,
      copyStatusText: success
        ? "Copied to Clipboard"
        : "Unable to copy to clipboard. Check browser settings.",
    });
  };

  copyAll = () => {
    copyToClipboard(
      `${this.props.parameter22.toString(
        Number(this.props.format || 10)
      )},${this.props.parameter23.toString(
        Number(this.props.format || 10)
      )},${this.props.parameter24.toString(
        Number(this.props.format || 10)
      )},${this.props.parameter30.toString(Number(this.props.format || 10))}`,
      this.handleOnCopy
    );
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  toggleMenu = (parameter) => (e) => {
    this.setState({ anchor: e.currentTarget, parameter });
  };

  render() {
    return (
      <React.Fragment>
        <Dialog open={this.props.open} fullWidth={true}>
          <DialogTitle>Parameters</DialogTitle>
          <DialogContent>
            <TextField
              style={{ marginTop: "30px" }}
              value={this.props.parameter22}
              readOnly={true}
              label={`Parameter ${22}`}
              fullWidth={true}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy to Clipboard">
                      <IconButton edge="end" onClick={this.toggleMenu(22)}>
                        <SvgIcon>
                          <svg viewBox="0 0 24 24">
                            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      open={
                        Boolean(this.state.anchor) &&
                        this.state.parameter === 22
                      }
                      anchorEl={this.state.anchor}
                      onClose={this.toggleMenu(null)}
                    >
                      <MenuItem onClick={this.handleCopyNumber}>
                        Copy Value
                      </MenuItem>
                      <MenuItem onClick={this.handleCopyYAML}>
                        Copy as YAML
                      </MenuItem>
                    </Menu>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ marginTop: "30px" }}
              value={this.props.parameter23}
              readOnly={true}
              label={`Parameter ${23}`}
              fullWidth={true}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy to Clipboard">
                      <IconButton edge="end" onClick={this.toggleMenu(23)}>
                        <SvgIcon>
                          <svg viewBox="0 0 24 24">
                            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      open={
                        Boolean(this.state.anchor) &&
                        this.state.parameter === 23
                      }
                      anchorEl={this.state.anchor}
                      onClose={this.toggleMenu(null)}
                    >
                      <MenuItem onClick={this.handleCopyNumber}>
                        Copy Value
                      </MenuItem>
                      <MenuItem onClick={this.handleCopyYAML}>
                        Copy as YAML
                      </MenuItem>
                    </Menu>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ marginTop: "30px" }}
              value={this.props.parameter24}
              readOnly={true}
              label={`Parameter ${24}`}
              fullWidth={true}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy to Clipboard">
                      <IconButton edge="end" onClick={this.toggleMenu(24)}>
                        <SvgIcon>
                          <svg viewBox="0 0 24 24">
                            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      open={
                        Boolean(this.state.anchor) &&
                        this.state.parameter === 24
                      }
                      anchorEl={this.state.anchor}
                      onClose={this.toggleMenu(null)}
                    >
                      <MenuItem onClick={this.handleCopyNumber}>
                        Copy Value
                      </MenuItem>
                      <MenuItem onClick={this.handleCopyYAML}>
                        Copy as YAML
                      </MenuItem>
                    </Menu>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ marginTop: "30px" }}
              value={this.props.parameter30}
              readOnly={true}
              label={`Parameter ${30}`}
              fullWidth={true}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy to Clipboard">
                      <IconButton edge="end" onClick={this.toggleMenu(30)}>
                        <SvgIcon>
                          <svg viewBox="0 0 24 24">
                            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      open={
                        Boolean(this.state.anchor) &&
                        this.state.parameter === 30
                      }
                      anchorEl={this.state.anchor}
                      onClose={this.toggleMenu(null)}
                    >
                      <MenuItem onClick={this.handleCopyNumber}>
                        Copy Value
                      </MenuItem>
                      <MenuItem onClick={this.handleCopyYAML}>
                        Copy as YAML
                      </MenuItem>
                    </Menu>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions style={{ justifyContent: "space-between" }}>
            <Button onClick={this.copyAll}>Copy All to CSV</Button>
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

export default ParameterModal;
