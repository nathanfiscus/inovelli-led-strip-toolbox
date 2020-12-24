import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
} from "@material-ui/core";

class SaveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  onChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSave = () => {
    this.props.onSave(this.state.name);
  };

  render() {
    return (
      <Dialog open={this.props.open} fullWidth>
        <DialogTitle>Save As</DialogTitle>
        <DialogContent>
          <TextField
            label="Animation Name"
            value={this.state.name}
            onChange={this.onChange}
            autoFocus={true}
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button onClick={this.handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SaveDialog;
