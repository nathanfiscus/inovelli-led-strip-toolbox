import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";

class ImportProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  componentDidUpdate(lastProps) {
    if (this.props.open && this.props.open !== lastProps.open) {
      this.setState({ value: "" });
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleImport = () => {
    this.props.onImport(this.state.value);
  };

  render() {
    return (
      <Dialog open={this.props.open} fullWidth size="md">
        <DialogTitle>Import Program</DialogTitle>
        <DialogContent>
          <TextField
            value={this.state.value}
            autoFocus={true}
            onChange={this.handleChange}
            label="Program Values (CSV)"
            helperText="Enter the parameter values in the following pattern: {22},{23},{24},{30}"
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button
            onClick={this.handleImport}
            disabled={
              !this.state.value.match(
                /^[0-9]{1,10},[0-9]{1,10},[0-9]{1,10},[0-9]{1,10}$/g
              )
            }
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ImportProgram;
