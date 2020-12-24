import React from "react";
import {
  withStyles,
  TextField,
  Slider,
  Grid,
  Typography,
} from "@material-ui/core";
import Brightness0 from "@material-ui/icons/Brightness2";
import Brightness7 from "@material-ui/icons/Brightness7";
import { byteArrayToLong } from "./Utils";

let Gradient = require("gradient2");
let gradient = new Gradient({
  colors: [
    "rgb(255,0,0)",
    "rgb(255,125,0)",
    "rgb(255,255,0)",
    "rgb(125,255,0)",
    "rgb(0,255,0)",
    "rgb(0,255,125)",
    "rgb(0,255,255)",
    "rgb(0,125,255)",
    "rgb(0,0,255)",
    "rgb(125,0,255)",
    "rgb(255,0,255)",
    "rgb(255,0,125)",
    "rgb(255,0,0)",
  ],
  steps: 360,
  model: "rgb",
});

const LED_COLORS = gradient.toArray("hex");

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>*": {
      flex: "1 1 auto",
      padding: theme.spacing(2),
    },
  },
  colorHelper: {
    height: "10px",
    width: "100%",
    background:
      "linear-gradient(to right, rgb(255,0,0), rgb(255,125,0), rgb(255,255,0), rgb(125,255,0), rgb(0,255,0), rgb(0,255,125), rgb(0,255,255), rgb(0,125,255), rgb(0,0,255), rgb(125,0,255), rgb(255,0,255), rgb(255,0,125), rgb(255,0,0))",
  },
  temperatureHelper: {
    height: "10px",
    width: "100%",
    background:
      "linear-gradient( right, rgb(166, 209, 255)  0%, white 50%, rgb(255, 160, 0) 100% )",
  },
});

class Parameter10 extends React.Component {
  setValue = (field) => (e, value) => {
    this.props.onChange(field, value);
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <div>
          <Typography gutterBottom>Color</Typography>
          <div className={this.props.classes.colorHelper}></div>
          <Slider
            defaultValue={1}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={361}
            //max={4162}
            // scale={(x) => {
            //   if (x < 362) {
            //     return x;
            //   } else {
            //     return 2338 + x;
            //   }
            // }}
            value={this.props.color}
            onChange={this.setValue("color")}
          />
        </div>
        <div>
          <Typography gutterBottom>Color Temperature</Typography>
          <div className={this.props.classes.temperatureHelper}></div>
          <Slider
            defaultValue={2700}
            valueLabelDisplay="auto"
            step={100}
            min={2700}
            max={6500}
            //max={4162}
            scale={(x) => {
              if (x > 2699) {
                return x;
              } else {
                return 0;
              }
            }}
            value={this.props.temperature}
            onChange={this.setValue("temperature")}
          />
        </div>
        <div>
          <TextField
            label={"Parameter 10 Value"}
            value={byteArrayToLong([
              this.props.color,
              0,
              this.props.temperature >= 2700 ? this.props.temperature : 0,
              0,
            ])}
            fullWidth
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Parameter10);
