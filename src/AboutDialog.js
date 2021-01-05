import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import Twitter from "@material-ui/icons/Twitter";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";

class AboutDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            Version 1.0 (Jan 5, 2021)
          </Typography>
          <Typography variant="h6">About the Tool</Typography>
          <Typography variant="caption" gutterBottom={true}>
            This is a simple application to assist in calculating the
            configuration values to send to your Z-Wave Inovelli LED strip controller.
            <br />
            <br />
          </Typography>
          <Typography variant="h6">Compatible Controllers</Typography>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="LZW45"
                secondary="RGBTW Smart LED Strip & Controller Kits"
              />
            </ListItem>
          </List>
          <Typography variant="h6">Credits</Typography>
          <Typography>Written By @nathanfiscus</Typography>
          <IconButton
            component="a"
            href="https://www.github.com/nathanfiscus/inovelli-notification-calc"
          >
            <GitHub />
          </IconButton>
          <IconButton component="a" href="https://www.twitter.com/nathanfiscus">
            <Twitter />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/nathanfiscus"
          >
            <LinkedIn />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AboutDialog;
