import React from "react";
import { withStyles, Paper } from "@material-ui/core";

const PIXEL_SIZE = 24;

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    padding: theme.spacing(1),
    "&>*": {
      backgroundColor: "white",
      flex: `0 1 ${PIXEL_SIZE / 2}px`,
      maxWidth: `${PIXEL_SIZE / 2}px`,
      "&:not(:first-child):not(:last-child)": {
        flex: "1 1 33%",
        maxWidth: `${PIXEL_SIZE}px`,
      },
    },
  },
  whiteLed: {
    padding: theme.spacing(0.5),
    "&>*": {
      backgroundColor: "rgba(255,255,0,0.3)",
      width: "100%",
      height: "100%",
    },
  },
  whiteLed2: {
    padding: theme.spacing(0.5),
    "&>*": {
      backgroundColor: "rgba(255,150,0,0.4)",
      width: "100%",
      height: "100%",
    },
  },
  colorLED: {
    padding: theme.spacing(0.5),
    position: "relative",
    "&>:first-child": {
      top: theme.spacing(0.5),
      bottom: theme.spacing(0.5),
      right: theme.spacing(0.5),
      left: theme.spacing(0.5),
      borderRadius: `${PIXEL_SIZE / 2}px`,
      position: "absolute",
      zIndex: "3",
      backgroundColor: "rgba(255,255,255,0.2)",
      background:
        "radial-gradient(farthest-side at 70% 20%,rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 30%)",
    },
    "&>:last-child": {
      backgroundColor: "#cccccc",
      top: theme.spacing(0.5),
      bottom: theme.spacing(0.5),
      right: theme.spacing(0.5),
      left: theme.spacing(0.5),
      borderRadius: `${PIXEL_SIZE / 2}px`,
      position: "absolute",
    },
  },
  ledOn: {
    boxShadow: "0px 0px 40px 6px hsl(360,100%,50%)",
  },
});

class LED extends React.Component {
  render() {
    let colorLEDStyles = {};
    if (this.props.color && this.props.color < 361) {
      colorLEDStyles = {
        backgroundColor: `hsl(${this.props.color},100%,50%)`,
        boxShadow: `0px 0px ${this.props.brightness + 1}px ${
          ((this.props.brightness + 1) / 100) * 40
        }px hsl(${this.props.color},100%,50%)`,
      };
    }
    return (
      <div className={this.props.classes.root}>
        <Paper className={this.props.classes.whiteLed}>
          <div />
        </Paper>
        <Paper className={this.props.classes.colorLED}>
          <div />
          <div style={colorLEDStyles} className={"rgb-led-light"} />
        </Paper>
        <Paper className={this.props.classes.whiteLed2}>
          <div />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(LED);
