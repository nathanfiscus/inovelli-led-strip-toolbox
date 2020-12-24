import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core";
import Light from "@material-ui/icons/EmojiObjects";
import MoreVert from "@material-ui/icons/MoreVert";
import { DateTime } from "luxon";
DateTime.local();

class OpenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      anchorEl: null,
    };
  }

  handleOpen = (index, item) => (e) => {
    this.props.onOpen(index, item);
  };

  handleMenuClick = (index) => (e) => {
    this.setState({
      selectedItem: index,
      anchorEl: e.currentTarget,
    });
  };

  handleMenuClose = () => {
    this.setState({
      selectedItem: null,
      anchorEl: null,
    });
  };

  handleRemoveItem = () => {
    this.setState({ deletConfirmationOpen: true });
  };

  closeConfirmationDialog = () => {
    this.setState({
      deletConfirmationOpen: false,
      selectedItem: null,
      anchorEl: null,
    });
  };

  doDelete = () => {
    let items = JSON.parse(window.localStorage.getItem("animations"));
    items.splice(this.state.selectedItem, 1);
    window.localStorage.setItem("animations", JSON.stringify(items));

    this.setState({
      deletConfirmationOpen: false,
      selectedItem: null,
      anchorEl: null,
    });
  };

  render() {
    const ITEMS = JSON.parse(window.localStorage.getItem("animations")) || [];
    return (
      <React.Fragment>
        <Dialog open={this.props.open} unmountOnClose={true} fullWidth={true}>
          <DialogTitle>Open Animation</DialogTitle>
          <DialogContent>
            <List>
              {ITEMS.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary="No Saved Custom Animations"
                    secondary="Create an animation and save it for future reference."
                  />
                </ListItem>
              )}
              {ITEMS.length > 0 &&
                ITEMS.map((item, index) => (
                  <ListItem
                    button={true}
                    onClick={this.handleOpen(index, item)}
                  >
                    <ListItemIcon>
                      <Light />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        item.date
                          ? `Last Updated: ${DateTime.fromMillis(
                              item.date
                            ).toFormat(`LLL d, yyyy`)}`
                          : "Last Updated: Unknown"
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={this.handleMenuClick(index)}>
                        <MoreVert />
                      </IconButton>
                      <Menu
                        open={
                          Boolean(this.state.anchorEl) &&
                          index === this.state.selectedItem
                        }
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleMenuClose}
                      >
                        <MenuItem onClick={this.handleRemoveItem}>
                          Delete
                        </MenuItem>
                      </Menu>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.deletConfirmationOpen} fullWidth={true}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove this animation? This action is
              irreversible.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmationDialog}>Cancel</Button>
            <Button onClick={this.doDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default OpenDialog;
