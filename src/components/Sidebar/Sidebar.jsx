import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import ListSubheader from 'material-ui/List/ListSubheader';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "material-ui";

import { HeaderLinks } from "components";

import sidebarStyle from "assets/jss/material-dashboard-react/sidebarStyle.jsx";
import dashboardRoutes from "../../routes/dashboard";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes, sidebar } = props;
  var count;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        const listItemClasses = cx({
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = cx({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        if (prop.childs == null) {
          return (
            <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true} initiallyOpen={true}
                />
              </ListItem>
            </NavLink>
          );
        }
        else {
          return (
            sidebar.map((element, key) => {
              if (prop.sidebarName == Object.keys(element)) {
                return (
                  <List>
                    <ListItem button onClick={() => { props.handleClick(prop.sidebarName) }} nestedItems={[<ListItem key={1} primaryText="Drafts" leftIcon={<SendIcon />} />]}>
                      <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                        <prop.icon />
                      </ListItemIcon>
                      <ListItemText primary={prop.sidebarName}
                        className={classes.itemText + whiteFontClasses}
                        disableTypography={true} />
                      {element[prop.sidebarName] ? <ExpandLess color={"error"} /> : <ExpandMore color={"error"} />}
                    </ListItem>
                    {prop.childs.map((item, index) => {
                      return (<NavLink to={item.path} className={item} activeClassName="active" key={key}>
                        <Collapse in={element[prop.sidebarName]} timeout="auto" unmountOnExit >
                          <List component="div" disablePadding>
                            <ListItem button className={classes.itemLink + listItemClasses}>
                              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary={item.sidebarName}
                                disableTypography={true} />
                            </ListItem>
                          </List>
                        </Collapse>
                      </NavLink>)

                    })}
                  </List>)
              }
            })
          )
        }

      }
      )}
    </List>

  );
  var brand = (
    <div className={classes.logo}>
      <a href="#" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
