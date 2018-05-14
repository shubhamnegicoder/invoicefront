import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import sweetalert from 'sweetalert';
// import Button from 'material-ui/Button';
//import Grid from 'material-ui/Grid';
import { InputLabel, Grid } from "material-ui";
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import axios from "axios";
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';

import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "components";

import avatar from "assets/img/faces/marc.jpg";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },

});


class SimpleModal extends React.Component {
  state = {
    open: false,
    taxCode: "",
    taxName: "",
    cgst: "",
    igst: "",
    sgst: "",
    isActive: false,
    _id: ""


  };
  handleChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });
  }

  handleCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  onCancel = () => {
    this.props.handleClose();
    this.setState({ taxCode: "", taxName: "", cgst: "", sgst: "", igst: "" })
  };

  componentWillReceiveProps(newprops) {
    // console.log(newprops, "ko")

    this.setState({
      taxCode: newprops.taxCode,
      taxName: newprops.taxName,
      cgst: newprops.cgst,
      igst: newprops.igst,
      sgst: newprops.sgst,
      _id: newprops._id
    })


  }
  
  onSubmit = () => 
  { 
    var url = "";
  var  data ={}
  console.log(this.state.igst)

    
       if (this.state._id != "")
        {
         
           url = "http://localhost:8080/editTax";
           data = 
           {
              taxCode: this.state.taxCode,
              taxName: this.state.taxName,
              cgst: this.state.cgst,
              igst: this.state.igst,
              sgst: this.state.sgst,
              _id:this.state._id
            };
          }
      else
       { 

        url = "http://localhost:8080/addTax";
        data = {
          taxCode: this.state.taxCode,
          taxName: this.state.taxName,
          cgst: this.state.cgst,
          igst: this.state.igst,
          sgst: this.state.sgst
        }
      }
    // console.log(data)
   
    // fetch(url,{
    //   method: "Post",
    //   body: data,
    //   cache: 'no-cache',
    //   mode: 'no-cors',

    //   headers: new Headers({
    //     'Content-Type': 'application/json',
    //     'authorization': "Key@123"
    //   })
    // })
    axios.post(url, data)
    .then((result) => {
      //access the results here....
      console.log("result = ", result)
          if (result.data.success == true) {
            sweetalert({
              text: "Tax Added",
              icon: "success"

            })
            
            this.props.handleClose();

          }
          if(result.data.success== false){
            sweetalert({
              text:"Error!!",
              icon:"warning"
            })
          }
          this.props.List()
          
        })
    // });
      // .then(res => res.json())
      // .then(
      //   (result) => {
      //     console.log("result = ", result)
      //     if (result.success == true) {
      //       sweetalert({
      //         text: "Tax Added",
      //         icon: "success"

      //       })
      //       this.props.handleClose();

      //     }
      //     this.props.List()
          
      //   })
    this.setState({ taxCode: "", taxName: "", cgst: "", sgst: "", igst: "" })

    
  }
  




render() 
{
  const { classes } = this.props;

  return (
    <div>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.load}
        handleClose={this.props.close}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Grid container>
            <ItemGrid xs={30} sm={30} md={30}>
              <RegularCard
                cardTitle="Add Tax"
                content={
                  <div>
                     
                    
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label>Tax Code </label><br></br>
                        <input
                          name="taxCode"
                          type="text"
                          value={this.state.taxCode}
                          onChange={this.handleChange}
                          // readOnly {...this.state._id!="" ? true : false}
                          required
                        /><br />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label>Tax Name </label><br></br>
                        <input
                          name="taxName"
                          type="text"
                          value={this.state.taxName}
                          onChange={this.handleChange}
                          required
                        /><br />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label>CGST(%)</label><br></br>
                        <input
                          name="cgst"
                          type="number"
                          value={this.state.cgst}
                          onChange={this.handleChange}
                          max="99"
                          min="0"
                        />

                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label>IGST(%) </label><br></br>
                        <input
                          name="igst"
                          type="number"
                          value={this.state.igst}
                          onChange={this.handleChange}
                          max="99"
                          min="0"
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label>SGST(%) </label><br></br>
                        <input
                          name="sgst"
                          type="number"
                          value={this.state.sgst}
                          onChange={this.handleChange}
                          max="99"
                          min="0"
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label>IS ACTIVE</label>&nbsp;&nbsp;&nbsp;
                  <Checkbox
                          checked={this.state.isActive}
                          onChange={this.handleCheckbox('isActive')}
                          value="isActive"
                          color="primary"
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                    </Grid>
                    
                  </div>
                }
                footer={
                  <div>
                    <Button color="primary"  onClick={this.onSubmit}   style={{ flooat: "left" }}>Submit</Button>
                    <Button color="primary" onClick={this.onCancel} style={{ float: "right" }}>Cancel</Button>
                  </div>
                }
              />

            </ItemGrid>
          </Grid>
          <SimpleModalWrapped />
        </div>
      </Modal>
    </div>
  )

}
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;