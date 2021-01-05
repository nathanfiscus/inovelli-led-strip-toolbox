import React from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  TextField,
  withStyles,
  Divider,
  InputAdornment,
  Tooltip,
  SvgIcon,
  Button,
  Typography,
  Grid,
  Slider,
  FormHelperText,
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Light from "@material-ui/icons/EmojiObjects";
import MoreVert from "@material-ui/icons/MoreVert";
import CustomEffectEditor from "./CustomEffectEditor";
import Open from "@material-ui/icons/FolderOpen";
import Import from "@material-ui/icons/SaveAlt";
import PlayIcon from "@material-ui/icons/PlayArrow";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import {
  byteArrayToLong,
  longToByteArray,
  shortToByteArray,
  UNITS,
  COLORS,
  EFFECTS,
  FINISHES,
} from "./Utils";
import ParameterModal from "./ParameterModal";
import InfiniteIcon from "@material-ui/icons/AllInclusive";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import SaveDialog from "./SaveDialog";
import OpenDialog from "./OpenDialog";
import HomeAssistantIcon from "./HomeAssistantIcon";
import SaveIcon from "./SaveIcon";
import SaveAsIcon from "./SaveAsIcon";
import NewIcon from "@material-ui/icons/AddBox";
import ImportProgram from "./ImportProgram";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});

class CustomStripEffects extends React.Component {
  static defaultProps = {
    timeUnit: 1,
    finishBehavior: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      editorOpen: false,
      effects: [],
      selectedEffect: undefined,
      effect: {},
      anchorEl: null,
      iterations: 255,
      timeUnit: 1,
      finishBehavior: 0,
      saveDialogOpen: false,
      openDialogOpen: false,
      savedAnimation: { animation: {} },
      indexOfSavedAnimation: null,
      importProgramDialogOpen: false,
    };
  }

  openContextMenu = (selectedEffect) => (e) => {
    this.setState({ selectedEffect, anchorEl: e.currentTarget });
  };

  handleCloseContextMenu = () => {
    this.setState({ selectedEffect: undefined, anchorEl: null });
  };

  handleEditEffect = (i) => () => {
    this.setState({
      editorOpen: true,
      effect: Object.assign({}, this.state.effects[i]),
      selectedEffect: i,
    });
  };

  handleAddEffect = () => {
    this.setState({
      editorOpen: true,
      selectedEffect: undefined,
      effect: {
        color: 0,
        effect: 0,
        brightness: 99,
        duration: 1,
      },
    });
  };

  handleFinishBehaviorChange = (e) => {
    const { value } = e.target;
    this.setState({ finishBehavior: value });
  };

  onCloseEditor = () => {
    this.setState({ editorOpen: false });
  };

  onSave = (effect) => {
    this.setState((lastState) => {
      let effects = JSON.parse(JSON.stringify(lastState.effects));
      if (lastState.selectedEffect !== undefined) {
        effects[lastState.selectedEffect] = effect;
      } else {
        effects.push(effect);
      }
      return { effects, editorOpen: false, selectedEffect: undefined };
    });
  };

  handleTimeUnitChange = (e) => {
    const { value } = e.target;
    this.setState({ timeUnit: value });
  };

  handleDeleteEffect = () => {
    this.setState((lastState) => {
      let effects = JSON.parse(JSON.stringify(lastState.effects));
      effects.splice(this.state.selectedEffect, 1);
      return {
        anchorEl: null,
        effects,
        selectedEffect: undefined,
      };
    });
  };

  get parameter22() {
    return byteArrayToLong(
      Array.from(this.state.effects)
        .reverse()
        .map((effect) => effect.effect + effect.color * 8)
    ).toString(Number(this.props.format || 10));
  }

  get parameter23() {
    return byteArrayToLong(
      Array.from(this.state.effects)
        .reverse()
        .map((effect) => effect.brightness)
    ).toString(Number(this.props.format || 10));
  }

  get parameter24() {
    return byteArrayToLong(
      Array.from(this.state.effects)
        .reverse()
        .map((effect) => effect.duration)
    ).toString(Number(this.props.format || 10));
  }

  get parameter30() {
    return byteArrayToLong([
      this.state.iterations,
      this.state.finishBehavior,
      this.state.timeUnit,
    ]).toString(Number(this.props.format || 10));
  }

  toggleParameterModal = () => {
    this.setState((lastState) => ({
      parameterModalOpen: !lastState.parameterModalOpen,
    }));
  };

  setIterations = (e, value) => {
    this.setState({ iterations: value });
  };

  handleSaveDialog = () => {
    this.setState({ saveDialogOpen: true });
  };

  handleCloseSaveDialog = () => {
    this.setState({ saveDialogOpen: false });
  };

  handleSaveAnimation = (name) => {
    let animations = JSON.parse(window.localStorage.getItem("animations"));
    if (!animations) {
      animations = [];
    }

    const date = new Date();

    animations.push({
      date: date.getTime(),
      animation: {
        iterations: this.state.iterations,
        finishBehavior: this.state.finishBehavior || 0,
        timeUnit: this.state.timeUnit,
        effects: this.state.effects,
      },
      name,
    });

    window.localStorage.setItem("animations", JSON.stringify(animations));

    this.setState({
      saveDialogOpen: false,
      savedAnimation: {
        date: date.getTime(),
        animation: {
          iterations: this.state.iterations,
          finishBehavior: this.state.finishBehavior || 0,
          timeUnit: this.state.timeUnit,
          effects: this.state.effects,
        },
        name,
      },
      indexOfSavedAnimation: animations.length - 1,
    });
  };

  handleSaveToCurrentProgram = () => {
    let animations = JSON.parse(window.localStorage.getItem("animations"));
    if (!animations) {
      animations = [];
    }

    const date = new Date();

    animations[this.state.indexOfSavedAnimation] = {
      date: date.getTime(),
      animation: {
        iterations: this.state.iterations,
        finishBehavior: this.state.finishBehavior || 0,
        timeUnit: this.state.timeUnit,
        effects: this.state.effects,
      },
      name: this.state.savedAnimation.name,
    };

    this.setState({
      savedAnimation: {
        date: date.getTime(),
        animation: {
          iterations: this.state.iterations,
          finishBehavior: this.state.finishBehavior || 0,
          timeUnit: this.state.timeUnit,
          effects: this.state.effects,
        },
        name: this.state.savedAnimation.name,
      },
    });

    window.localStorage.setItem("animations", JSON.stringify(animations));
  };

  handleOpenDialog = () => {
    this.setState({ openDialogOpen: true });
  };

  handleCloseOpenDialog = () => {
    this.setState({ openDialogOpen: false });
  };

  handleOpenSavedAnimation = (index, entry) => {
    this.setState({
      openDialogOpen: false,
      indexOfSavedAnimation: index,
      savedAnimation: entry,
      iterations: entry.animation.iterations,
      timeUnit: entry.animation.timeUnit,
      effects: entry.animation.effects,
      finishBehavior: entry.animation.finishBehavior,
    });
  };

  handlePlayAnimationClick = () => {
    this.props.onPlay(
      JSON.parse(
        JSON.stringify({
          effects: this.state.effects,
          iterations: this.state.iterations,
          timeUnit: this.state.timeUnit,
        })
      )
    );
  };

  sendProgramToHomeAssistant = () => {
    this.props.onSendToHomeAssistant([
      { number: 22, value: this.parameter22 },
      { number: 23, value: this.parameter23 },
      { number: 24, value: this.parameter24 },
      { number: 30, value: this.parameter30 },
    ]);
  };

  handleStartNew = () => {
    this.setState({
      effects: [],
      selectedEffect: undefined,
      effect: {},
      anchorEl: null,
      iterations: 255,
      timeUnit: 1,
      finishBehavior: 0,
      savedAnimation: { animation: {} },
      indexOfSavedAnimation: null,
    });
  };

  handleOpenImportProgramDialog = () => {
    this.setState({
      importProgramDialogOpen: true,
    });
  };

  handleCloseImportProgramDialog = () => {
    this.setState({ importProgramDialogOpen: false });
  };

  handleImportProgram = (program) => {
    const PARAMETERS = program.split(",");
    console.log(longToByteArray(PARAMETERS[0]));
    let COLORS = longToByteArray(PARAMETERS[0]).map(
      (colorEffect) => shortToByteArray(colorEffect)[1]
    );
    let EFFECTS = longToByteArray(PARAMETERS[0]).map(
      (colorEffect) => shortToByteArray(colorEffect)[0]
    );
    let BRIGHTNESS = longToByteArray(PARAMETERS[1]);
    let DURATIONS = longToByteArray(PARAMETERS[2]);
    let SETTINGS = longToByteArray(PARAMETERS[3]);
    //console.log(COLORS, EFFECTS, BRIGHTNESS, DURATIONS);
    //Drop Empty Effects
    for (let i = COLORS.length - 1; i >= 0; i--) {
      if (DURATIONS[i] !== 0) {
        break;
      }
      COLORS.pop();
      EFFECTS.pop();
      BRIGHTNESS.pop();
      DURATIONS.pop();
    }
    COLORS.reverse();
    EFFECTS.reverse();
    BRIGHTNESS.reverse();
    DURATIONS.reverse();
    //console.log(COLORS, EFFECTS, BRIGHTNESS, DURATIONS);
    const IMPORTED_EFFECTS = COLORS.map((color, index) => ({
      color: color,
      effect: EFFECTS[index],
      brightness: BRIGHTNESS[index],
      duration: DURATIONS[index],
    }));

    this.setState({
      importProgramDialogOpen: false,
      effects: IMPORTED_EFFECTS,
      iterations: SETTINGS[0],
      finishBehavior: SETTINGS[1],
      timeUnit: SETTINGS[2],
    });
  };

  render() {
    const IS_SAVED_PROGRAM_CHANGED =
      JSON.stringify(this.state.savedAnimation.animation.effects) !==
        JSON.stringify(this.state.effects) ||
      this.state.timeUnit !== this.state.savedAnimation.animation.timeUnit ||
      this.state.iterations !==
        this.state.savedAnimation.animation.iterations ||
      this.state.finishBehavior !==
        this.state.savedAnimation.animation.finishBehavior;
    return (
      <div className={this.props.classes.root}>
        <List style={{ width: "100%" }}>
          <ListItem>
            <Tooltip title="Clear and Start New">
              <IconButton onClick={this.handleStartNew}>
                <NewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open Saved Programs">
              <IconButton onClick={this.handleOpenDialog}>
                <Open />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <span>
                <IconButton
                  onClick={this.handleSaveToCurrentProgram}
                  disabled={
                    !IS_SAVED_PROGRAM_CHANGED ||
                    this.state.effects.length === 0 ||
                    !this.state.savedAnimation.name
                  }
                >
                  <SaveIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Save As">
              <span>
                <IconButton
                  onClick={this.handleSaveDialog}
                  disabled={this.state.effects.length === 0}
                >
                  <SaveAsIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Import a Program">
              <IconButton onClick={this.handleOpenImportProgramDialog}>
                <Import />
              </IconButton>
            </Tooltip>
          </ListItem>
          {this.state.savedAnimation.name && (
            <ListItem>
              <Typography variant="body2" color="primary">
                {this.state.savedAnimation.name}{" "}
                {IS_SAVED_PROGRAM_CHANGED && (
                  <Typography variant="caption" color="textSecondary">
                    (Modified)
                  </Typography>
                )}
              </Typography>
            </ListItem>
          )}
          <Divider />
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Time Unit</InputLabel>
              <Select
                value={this.state.timeUnit}
                onChange={this.handleTimeUnitChange}
              >
                {UNITS.map((unit, index) => (
                  <MenuItem value={index}>{unit}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          <Divider />
          {this.state.effects.map((effect, i) => (
            <ListItem
              key={
                effect.color.toString() +
                effect.duration.toString() +
                effect.brightness.toString() +
                effect.effect.toString() +
                i
              }
              onClick={this.handleEditEffect(i)}
              button={true}
            >
              <ListItemIcon>
                <Light />
              </ListItemIcon>
              <ListItemText
                primary={`${EFFECTS[effect.effect]} to ${COLORS[effect.color]}`}
                secondary={`For ${
                  this.state.timeUnit !== 0
                    ? effect.duration
                    : effect.duration * 100
                } ${
                  this.state.timeUnit !== 0 ? UNITS[this.state.timeUnit] : "ms"
                } at ${Math.round(
                  (effect.brightness / 99) * 100
                )}% brightness.`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={this.openContextMenu(i)}>
                  <MoreVert />
                </IconButton>
                <Menu
                  open={
                    Boolean(this.state.anchorEl) &&
                    this.state.selectedEffect === i
                  }
                  anchorEl={this.state.anchorEl}
                  onClose={this.handleCloseContextMenu}
                >
                  <MenuItem onClick={this.handleDeleteEffect}>Delete</MenuItem>
                </Menu>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {this.state.effects.length < 4 && (
            <ListItem button onClick={this.handleAddEffect}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText
                primary="Add New Effect"
                secondary="Add up to 4 steps to your custom effect!"
              />
            </ListItem>
          )}
          {this.state.effects.length > 0 && (
            <React.Fragment>
              <Divider />
              <ListItem>
                <div style={{ width: "100%" }}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="div"
                    gutterBottom
                  >
                    Iterations
                  </Typography>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item>
                        <TimelapseIcon />
                      </Grid>
                      <Grid item xs>
                        <Slider
                          value={this.state.iterations}
                          valueLabelDisplay="auto"
                          min={1}
                          max={255}
                          onChange={this.setIterations}
                        />
                      </Grid>
                      <Grid item>
                        <InfiniteIcon />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </ListItem>
              <ListItem>
                <FormControl fullWidth disabled={this.state.iterations === 255}>
                  <InputLabel>Finish Behavior</InputLabel>
                  <Select
                    value={this.state.finishBehavior}
                    onChange={this.handleFinishBehaviorChange}
                    disabled={this.state.iterations === 255}
                  >
                    <MenuItem value={0}>Off</MenuItem>
                    <MenuItem value={1}>Previous Color</MenuItem>
                    <MenuItem value={2}>Last Color In Sequence</MenuItem>
                  </Select>
                  {this.state.iterations === 255 && (
                    <FormHelperText>
                      No Finish Behavior for Infinite Iterations
                    </FormHelperText>
                  )}
                </FormControl>
              </ListItem>
              <Divider />
              {/* <ListItem button onClick={this.handlePlayAnimationClick}>
                <ListItemIcon>
                  <PlayIcon />
                </ListItemIcon>
                <ListItemText primary="Play Animation" />
              </ListItem> */}
              <ListItem button onClick={this.toggleParameterModal}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="Show Parameter Values" />
              </ListItem>
              {this.props.isHomeAssistantConfigured && <ListItem button onClick={this.sendProgramToHomeAssistant}>
                <ListItemIcon>
                  <HomeAssistantIcon />
                </ListItemIcon>
                <ListItemText primary="Send to Home Assistant Device" />
              </ListItem>} 
            </React.Fragment>
          )}
        </List>
        <CustomEffectEditor
          open={this.state.editorOpen}
          onClose={this.onCloseEditor}
          onSave={this.onSave}
          effect={this.state.effect}
        />
        <ParameterModal
          parameter22={this.parameter22}
          parameter23={this.parameter23}
          parameter24={this.parameter24}
          parameter30={this.parameter30}
          open={this.state.parameterModalOpen}
          onClose={this.toggleParameterModal}
        />
        <SaveDialog
          open={this.state.saveDialogOpen}
          onClose={this.handleCloseSaveDialog}
          onSave={this.handleSaveAnimation}
        />
        <OpenDialog
          open={this.state.openDialogOpen}
          onClose={this.handleCloseOpenDialog}
          onOpen={this.handleOpenSavedAnimation}
        />
        <ImportProgram
          open={this.state.importProgramDialogOpen}
          onClose={this.handleCloseImportProgramDialog}
          onImport={this.handleImportProgram}
        />
      </div>
    );
  }
}

export default withStyles(styles)(CustomStripEffects);
