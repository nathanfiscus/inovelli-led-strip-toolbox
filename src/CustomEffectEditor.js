import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  withStyles,
  Typography,
  Grid,
  Slider,
} from "@material-ui/core";
import Brightness0 from "@material-ui/icons/Brightness2";
import Brightness7 from "@material-ui/icons/Brightness7";
import InfiniteIcon from "@material-ui/icons/AllInclusive";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import { COLORS, EFFECTS } from "./Utils";

const styles = (theme) => ({
  contentRoot: {
    display: "flex",
    flexWrap: "wrap",
    "&>*": {
      flex: "1 1 49%",
      padding: theme.spacing(1),
      minWidth: "300px",
    },
  },
});

class CustomEffectEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      color: 0,
      effect: 0,
      brightness: 99,
      duration: 1,
    };
  }

  componentDidUpdate(lastProps) {
    //On Open reset the effect parameters from the props to the state.
    if (this.props.open && this.props.open !== lastProps.open) {
      this.setState({
        color: this.props.effect.color,
        effect: this.props.effect.effect,
        brightness: this.props.effect.brightness,
        duration: this.props.effect.duration,
      });
    }
  }

  setValue = (key) => (e, v) => {
    this.setState({
      [key]: key !== "color" && key !== "effect" ? v : e.target.value,
    });
  };

  handleSave = () => {
    this.props.onSave({
      color: this.state.color,
      effect: this.state.effect,
      brightness: this.state.brightness,
      duration: this.state.duration,
    });
  };

  render() {
    return (
      <Dialog open={this.props.open} fullWidth={true} scroll="body">
        <DialogTitle>Effect Editor</DialogTitle>
        <DialogContent>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel>Color</InputLabel>
            <Select value={this.state.color} onChange={this.setValue("color")}>
              {COLORS.map((color, index) => (
                <MenuItem value={index} key={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <InputLabel>Effect</InputLabel>
            <Select
              value={this.state.effect}
              onChange={this.setValue("effect")}
            >
              {EFFECTS.map((effect, index) => (
                <MenuItem
                  value={index}
                  key={effect}
                  disabled={
                    this.state.color > 0 && this.state.color < 4 && index >= 3
                  }
                >
                  {effect}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <Typography gutterBottom>Brightness Level</Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Brightness0 />
            </Grid>
            <Grid item xs>
              <Slider
                value={this.state.brightness}
                valueLabelDisplay="auto"
                min={0}
                max={99}
                onChange={this.setValue("brightness")}
              />
            </Grid>
            <Grid item>
              <Brightness7 />
            </Grid>
          </Grid>
          <br />
          <Typography gutterBottom>Duration</Typography>
          <Grid container spacing={2}>
            <Grid item>
              <TimelapseIcon />
            </Grid>
            <Grid item xs>
              <Slider
                value={this.state.duration}
                valueLabelDisplay="auto"
                valueLabelFormat={this.durationFormater}
                min={1}
                max={60}
                onChange={this.setValue("duration")}
              />
            </Grid>
            <Grid item>
              <InfiniteIcon />
            </Grid>
          </Grid>
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSave}>Save</Button>
          <Button onClick={this.props.onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(CustomEffectEditor);
