import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";

class OptionsDialog extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  handleThemeChange = (e) => {
    this.props.setTheme(e.target.value);
  };

  handleURLChange = (e) => {
    this.props.setHomeAssistantURL(e.target.value);
  };

  handleFormatChange = (e) => {
    this.props.setFormat(e.target.value);
  };

  handleTokenChange = (e) => {
    this.props.setHomeAssistantToken(e.target.value);
  };
  handleNodeChange = (e) => {
    this.props.setHomeAssistantNode(e.target.value);
  };
  handleHomeAssistantServiceChange = (e) => {
    this.props.setHomeAssistantService(e.target.value);
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        onClose={this.props.onClose}
      >
        <DialogTitle>Options</DialogTitle>
        <DialogContent>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel>Theme</InputLabel>
            <Select value={this.props.theme} onChange={this.handleThemeChange}>
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel>Value Format</InputLabel>
            <Select
              value={this.props.format}
              onChange={this.handleFormatChange}
            >
              <MenuItem value="10">Decimal</MenuItem>
              <MenuItem value="16">Hex</MenuItem>
              <MenuItem value="2">Binary</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <Typography>Home Assistant Integration</Typography>
          <Typography variant="caption" color="textSecondary">
            Integrate this application with your Home Assistant instance by
            filling in the values below. Once configured you will be able to
            send programs (all 4 parameters) from this application directly to
            your device.
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Home Assistant URL"
            value={this.props.homeAssistantURL}
            onChange={this.handleURLChange}
            autoFocus={true}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Home Assistant Long Life Token"
            value={this.props.homeAssistantToken}
            onChange={this.handleTokenChange}
          />
          <FormControl fullWidth={true} margin="normal">
            <InputLabel>Z-Wave Integration</InputLabel>
            <Select
              value={this.props.homeAssistantService}
              onChange={this.handleHomeAssistantServiceChange}
            >
              <MenuItem value="zwave_js.bulk_set_partial_config_parameters">
                ZwaveJS (zwave_js.bulk_set_partial_config_parameters)
              </MenuItem>
              <MenuItem value="ozw.set_config_parameter">
                OpenZWave (ozw.set_config_parameter)
              </MenuItem>
              <MenuItem value="zwave.set_config_parameter">
                Legacy Z-Wave (zwave.set_config_parameter)
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label={
              this.props.homeAssistantService !==
              "zwave_js.bulk_set_partial_config_parameters"
                ? "Z-Wave Node ID (Number)"
                : "Entity ID (eg light.desktop_light_strip)"
            }
            value={this.props.homeAssistantNode}
            onChange={this.handleNodeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default OptionsDialog;
