import React from "react";
import { Paper, withStyles } from "@material-ui/core";
import LED from "./LED";
import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const PIXEL_SIZE = 24;

const styles = (theme) => ({
  root: {
    maxWidth: "800px",
    height: `${PIXEL_SIZE + theme.spacing(2)}px`,
    width: "100%",
    display: "flex",
    align: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    "&>*": {
      flex: "1 1 auto",
      ":not(:last-child)": {
        marginRight: theme.spacing(2),
      },
    },
  },
});

const COLOR = [0, 0, 0, 0, "red", "orange", 0, 0, 0, 0, 0, 0, "blue"];

class Strip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sheet: { classes: {} },
    };
  }
  componentDidMount() {}
  componentDidUpdate(lastProps) {
    if (
      JSON.stringify(this.props.program) !== JSON.stringify(lastProps.program)
    ) {
      if (this.state.sheet.detach) {
        this.state.sheet.detach();
      }
      //write new animation frames.
      const keyframes = this.props.program.effects
        .map((step) => ({
          opacity: (step.brightness + 1) / 100,
          backgroundColor: COLOR[step.color],
        }))
        .reduce((p, c, i, a) => {
          p[`${(i / (a.length - 1)) * 100}%`] = c;
          return p;
        }, {});

      let sheet = jss.createStyleSheet({
        "@keyframes inovelli-program": keyframes,
        strip: {
          "& .rgb-led-light": {
            animation: "$inovelli-program 3s linear",
            animationIterationCount:
              this.props.program.iterations === 255
                ? "infinite"
                : this.props.program.iterations || 10,
          },
        },
      });

      sheet.attach();

      this.setState({ sheet });
    }
  }

  render() {
    return (
      <Paper
        className={
          this.props.classes.root + " " + this.state.sheet.classes.strip
        }
      >
        <LED size={PIXEL_SIZE} />
        <LED size={PIXEL_SIZE} />
        <LED size={PIXEL_SIZE} />
        <LED size={PIXEL_SIZE} />
        <LED size={PIXEL_SIZE} />
        <LED size={PIXEL_SIZE} />
        <LED size={PIXEL_SIZE} />
        <LED size={PIXEL_SIZE} />
      </Paper>
    );
  }
}

export default withStyles(styles)(Strip);
