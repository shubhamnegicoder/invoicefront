import React from "react";
import classNames from "classnames";
import {
  withStyles,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden
} from "material-ui";
import Button from '@material-ui/core/Button';
import swal from 'sweetalert2';
import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  
  logout=()=>{
   
    swal({
     
      text: "Are you sure that you want to leave this page?",
      type:"warning",
      title: 'Do you want to log out?',
      showCancelButton: true,
      confirmButtonColor: '#d9534f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log out' 
    }).then((result) => {
      if (result.value) {
         localStorage.removeItem("id");
         localStorage.removeItem("show");
         localStorage.setItem("log",true)
        window.location.href="/";
      }
    })
  }
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const styles={
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      }
    }
    return (
      <div>
        <Button variant="raised" style={{backgroundColor:"#76323f", color:"white"}}onClick={this.logout}>
        Logout
      </Button>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
