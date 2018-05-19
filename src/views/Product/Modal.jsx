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
// import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
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
var dropDownData=[];
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
    productCode: "",
    productName: "",
    taxCode: "",
    rate: "",
    dropDownData:[],
    isActive: false,
    _id: ""


  };
  handleChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });
  }

  handleCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleDropDown=(event)=>{
     this.setState({taxCode:event.target.value});
     //console.log(this.state.tax, "state tax")
  };
  onCancel = () => {
    this.props.handleClose();
    this.setState({ productCode: "", productName: "", taxCode: "", rate: "" ,isActive:"",_id:""})
  };

  componentWillReceiveProps(newprops) {
    // console.log(newprops, "ko")

    this.setState({
      productCode: newprops.productCode,
      productName: newprops.productName,
      taxCode: newprops.taxCode,
      rate: newprops.rate,
      _id: newprops._id,
      isActive:newprops.isActive
    })


  }
  data = () => {
    fetch("http://localhost:8080/allTax", {
        method: "GET",
        cache: 'no-cache',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': "Key@123"
        })
    }).then(res => res.json()).then(
        (result) => {
            var maindata = [];
            // console.log(result.data,"dropdown")
            result.data && result.data.map((item, key) => {
                maindata.push(item);
              
            })
            this.setState({ dropDownData: maindata })
             console.log(this.state.dropDownData, "array")
        },
        (error) => {
            console.log("error", error)
        }
    )
}
componentDidMount() {
    this.data()

}
  
  onSubmit = (e) => 
  { e.preventDefault()
    if(this.state.productCode==""){
     return alert("Please enter productcode!!")
    }
    if(this.state.productName==""){
      return alert("Please enter productname!!")
     }
     if(this.state.taxCode==""){
      return alert("Please enter tax!!")
     }
     if(this.state.rate==""){
      return alert("Please enter rate!!")
     }
     
    var url = "";
  var  data ={}
  
       if (this.state._id != "")
        { 
         
           url = "http://localhost:8080/editProduct";
           data = 
           {
              productCode: this.state.productCode,
              productName: this.state.productName,
              taxCode: this.state.taxCode,
              rate: this.state.rate,
              _id:this.state._id,
              isActive:this.state.isActive
            };
          }
      else
       { 

        url = "http://localhost:8080/addProduct";
        data = {
            productCode: this.state.productCode,
            productName: this.state.productName,
            taxCode: this.state.taxCode,
            rate: this.state.rate,
            isActive:this.state.isActive
          };
        };
      
   
    axios.post(url, data)
    .then((result) => {
      //access the results here....
      console.log("result data medha= ", result)
          if (result.data.success == true) {
            sweetalert({
              text: "Product Added",
              icon: "success"

            })
            
            this.props.handleClose();

          }
          if(result.data.success== false){
            sweetalert({
              text:"Error!!Already Exists!!",
              icon:"warning"
            })
          }
          this.props.List()
         
          
        })
  

    
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
                cardTitle="Add Product"
                content={
                  <div>
                     
                    
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label><b>Product Code*</b> </label><br></br>
                        <input
                          name="productCode"
                          type="text"
                          value={this.state.productCode}
                          onChange={this.handleChange}
                          style={{border: "2px solid black"}}
                         readOnly= {this.state._id ? "readOnly" : ""}
                          
                        /><br />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label><b>Product Name*</b> </label><br></br>
                        <input
                          name="productName"
                          type="text"
                          value={this.state.productName}
                          onChange={this.handleChange}
                        
                          style={{border: "2px solid black"}}
                        /><br />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label><b>Tax*</b> </label><br></br>
                        {/* <input
                          name="tax"
                          type="text"
                          value={this.state.tax}
                          onChange={this.handleChange}
                          style={{border: "2px solid black"}}
                          
                        /> */}
                        <select  style={{border: "2px solid black"}} onChange={this.handleDropDown}>
                        <option value="Select Tax" style={{border: "2px solid black"}} > Select Tax</option>
                        {     
                            this.state.dropDownData && this.state.dropDownData.map((item, index) => {
                            

                            // console.log(item.taxName,"tax")
                                return <option styles={{ width: '350px' }} name={item.taxName} value={item.taxCode} key={index}>{item.taxName}</option>
                            })
                        }
                       

                        </select>
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label><b>Rate*</b> </label><br></br>
                        <input
                          name="rate"
                          type="number"
                          value={this.state.rate}
                          onChange={this.handleChange}
                          style={{border: "2px solid black"}}
                          
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md={15}>
                        <label><b>IS ACTIVE</b></label>&nbsp;&nbsp;&nbsp;
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