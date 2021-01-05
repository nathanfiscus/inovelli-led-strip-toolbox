import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import InfoOutlined from "@material-ui/icons/InfoOutlined";

export default class ApplicationBar extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: "1" }}>
            Inovelli LED Strip Toolbox
          </Typography>
          <div style={{ flexShrink: "0", flexGrow: "0" }}>
            <Tooltip title="Options">
              <IconButton color="inherit" onClick={this.props.onOpenOptions}>
                <TuneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="About">
              <IconButton color="inherit" onClick={this.props.onOpenAbout}>
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
