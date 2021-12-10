import React from "react";
import { CssBaseline, withStyles, Tabs, Tab } from "@material-ui/core";
import Strip from "./Strip";

import AppBar from "./AppBar";
import Options from "./Options";
import CustomStripEffects from "./CustomStripEffects";

import {
  createConnection,
  callService,
  createLongLivedTokenAuth,
} from "home-assistant-js-websocket";
import AboutDialog from "./AboutDialog";

const styles = (theme) => ({
  root: {
    //height: "98vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "&>:first-child": {
      //flex: "0 0 auto",
      width: "100%",
    },
    "&>:last-child": {
      flex: "1 1 100%",
      display: "flex",
      width: "100%",
      alignItems: "stretch",
      justifyContent: "center",
    },
  },
  tabWrapper: {
    width: "100%",
  },
  areaWrapper: {
    display: "flex",
    alignItems: "stretch",
    "&>:first-child": {
      flex: "1 1 100%",
      //alignItems: "center",
      display: "flex",
      justifyContent: "center",
      maxWidth: "800px",
    },
    "&>:last-child": {
      //justifyItem: "start",
      //minWidth: "400px",
      //backgroundColor: theme.palette.background.paper,
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customStripEffects: [],
      finishBehavior: 0,
      HA_URL: window.localStorage.getItem("HA_URL"),
      HA_TOKEN: window.localStorage.getItem("HA_TOKEN"),
      HA_NODE: window.localStorage.getItem("HA_NODE"),
      HA_SERVICE: window.localStorage.getItem("HA_SERVICE"),
      valueFormat: window.localStorage.getItem("valueFormat") || 10,
      aboutDialogOpen: false,
    };

    if (this.state.HA_URL && this.state.HA_TOKEN) {
      (async () => {
        const auth = createLongLivedTokenAuth(
          this.state.HA_URL,
          this.state.HA_TOKEN
        );

        const connection = await createConnection({ auth });
        this.setState({ homeAssistant: connection }, () => {
          console.info("Home Assistant Connection Saved to State....");
        });
      })();
    }
  }

  handleChangeTab = (e, value) => {
    this.setState({ tab: value });
  };

  handleParameter10Changes = (field, value) => {
    this.setState({
      parameter10: { ...this.state.parameter10, [field]: value },
    });
  };

  handleCustomStripEffectChange = (effectArray) => {
    this.setState({
      customStripEffects: effectArray,
    });
  };

  handleTimeUnitChange = (unit) => {
    this.setState({ timeUnit: unit });
  };

  handleFinishBehaviorChange = (behavior) => {
    this.setState({ finishBehavior: behavior });
  };

  handleOnPlay = (lightShow) => {
    this.setState({ lightShow });
  };

  handleOpenOptions = () => {
    this.setState({ optionsOpen: true });
  };

  handleOptionsClosed = () => {
    this.setState({ optionsOpen: false });
    if (this.state.homeAssistant) {
      this.state.homeAssistant.close();
    }
    if (this.state.HA_URL && this.state.HA_TOKEN) {
      (async () => {
        const auth = createLongLivedTokenAuth(
          this.state.HA_URL,
          this.state.HA_TOKEN
        );

        const connection = await createConnection({ auth });
        this.setState({ homeAssistant: connection }, () => {
          console.info("Home Assistant Connection Saved to State....");
        });
      })();
    }
  };

  handleHomeAssistantURLChange = (value) => {
    this.setState({ HA_URL: value });
    window.localStorage.setItem("HA_URL", value);
  };

  handleHomeAssistantTokenChange = (value) => {
    this.setState({ HA_TOKEN: value });
    window.localStorage.setItem("HA_TOKEN", value);
  };

  handleHomeAssistantNodeChange = (value) => {
    this.setState({ HA_NODE: value });
    window.localStorage.setItem("HA_NODE", value);
  };

  handleHomeAssistantServiceChange = (value) => {
    this.setState({ HA_SERVICE: value });
    window.localStorage.setItem("HA_SERVICE", value);
  };

  handleChangeValueFormat = (value) => {
    this.setState({ valueFormat: value });
    window.localStorage.setItem("valueFormat", value);
  };

  handleChangeThemeValue = (value) => {
    this.setState({ theme: value });
    window.localStorage.setItem("theme", value);
  };

  sendProgamThroughHomeAssistant = (program) => {
    const SERVICE_PARTS = this.state.HA_SERVICE.split(".");
    console.log(SERVICE_PARTS);
    const HA_SERVICE_DOMAIN = SERVICE_PARTS[0];
    const HA_SERVICE = SERVICE_PARTS[1];
    console.log(SERVICE_PARTS[0], SERVICE_PARTS[1]);

    let deinitPayload = {
      node_id: parseInt(this.state.HA_NODE),
      parameter: 30,
      value: 0,
    };

    if (HA_SERVICE_DOMAIN === "zwavejs") {
      delete deinitPayload.node_id;
      deinitPayload.entity_id = this.state.HA_NODE;
    }

    Promise.all([
      callService(this.state.homeAssistant, HA_SERVICE_DOMAIN, HA_SERVICE, {
        node_id:
          HA_SERVICE_DOMAIN === "zwavejs"
            ? undefined
            : parseInt(this.state.HA_NODE),
        entity_id:
          HA_SERVICE_DOMAIN === "zwavejs" ? this.state.HA_NODE : undefined,
        parameter: 30,
        value: 0,
      }),
      ...program.map(async (parameter) => {
        return callService(
          this.state.homeAssistant,
          HA_SERVICE_DOMAIN,
          HA_SERVICE,
          {
            entity_id:
              HA_SERVICE_DOMAIN === "zwavejs" ? this.state.HA_NODE : undefined,
            node_id:
              HA_SERVICE_DOMAIN === "zwavejs"
                ? undefined
                : parseInt(this.state.HA_NODE),
            parameter: parseInt(parameter.number),
            value: parseInt(parameter.value),
          }
        );
      }),
    ])
      .then(() => {
        console.info("Successfully sent to Home Assistant");
      })
      .catch((ex) => {
        console.error(ex);
      });
  };

  handleCloseAboutDialog = () => {
    this.setState({ aboutDialogOpen: false });
  };

  handleOpenAboutDialog = () => {
    this.setState({ aboutDialogOpen: true });
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar
          onOpenOptions={this.handleOpenOptions}
          onOpenAbout={this.handleOpenAboutDialog}
        />
        <Options
          open={this.state.optionsOpen}
          homeAssistantURL={this.state.HA_URL}
          homeAssistantToken={this.state.HA_TOKEN}
          homeAssistantNode={this.state.HA_NODE}
          homeAssistantService={this.state.HA_SERVICE}
          theme={this.props.theme}
          format={this.state.valueFormat}
          setHomeAssistantURL={this.handleHomeAssistantURLChange}
          setHomeAssistantToken={this.handleHomeAssistantTokenChange}
          setHomeAssistantNode={this.handleHomeAssistantNodeChange}
          setHomeAssistantService={this.handleHomeAssistantServiceChange}
          setFormat={this.handleChangeValueFormat}
          setTheme={this.props.setTheme}
          onClose={this.handleOptionsClosed}
        />
        <div className={this.props.classes.root}>
          <div className={this.props.classes.tabWrapper}>
            {/* <Tabs value={this.state.tab} onChange={this.handleChangeTab}>
                  <Tab label="Parameter 10" />
                  <Tab label="Parameter 11" />
                  <Tab label="Custom Strip Effects" />
                  <Tab label="Parameter 16" />
                </Tabs> */}
            {/* <div>
                  {this.state.tab === 0 && (
                    <Parameter10
                      color={this.state.parameter10.color}
                      temperature={this.state.parameter10.temperature}
                      onChange={this.handleParameter10Changes}
                    />
                  )}
                  {this.state.tab === 2 && (
                    <CustomStripEffects
                      effects={this.state.customStripEffects}
                      onChange={this.handleCustomStripEffectChange}
                    />
                  )} 
                </div>*/}
          </div>
          <div className={this.props.classes.areaWrapper}>
            {/* <div>
              <Strip program={this.state.lightShow} />
            </div> */}
            {/*<div>*/}
            <CustomStripEffects
              onPlay={this.handleOnPlay}
              isHomeAssistantConfigured={this.state.homeAssistant !== undefined}
              onSendToHomeAssistant={this.sendProgamThroughHomeAssistant}
              valueFormat={this.state.valueFormat}
              format={this.state.valueFormat}
            />
            <AboutDialog
              open={this.state.aboutDialogOpen}
              onClose={this.handleCloseAboutDialog}
            />
            {/*</div>*/}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
