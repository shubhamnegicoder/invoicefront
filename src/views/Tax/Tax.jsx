import React from "react";
// import PropTypes from "prop-types";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from './Modal.jsx';
import Button from 'material-ui/Button';
import  {Grid} from "material-ui";
import AddIcon from '@material-ui/icons/Add';

import { RegularCard, Table, ItemGrid } from "components";
// import Form from "./Form.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";

// import iconsStyle from "assets/jss/material-dashboard-react/iconsStyle";


class Tax extends React.Component {
   pro=({ ...this.props});
  
  constructor(props) {
    super(props);
    this.state = {
    load : false,
      List:[],
    taxCode:"",
    taxName:"",
    cgst:"",
    igst:"",
    sgst:"",
    isActive:false,
    _id:""
    
    };
  }
  handleOpen=()=>{
    this.setState({load : true});
    this.setState({taxCode:"",taxName:"",cgst:"",igst:"",sgst:"",_id:"",isActive:""});
      
  }
  handleClose = () => {
    
    this.setState({load: false });
  };
  handleEdit = (e,tax) => {
    this.setState({load: true ,taxCode :tax.taxCode,taxName : tax.taxName,sgst : tax.sgst,cgst : tax.cgst,igst :tax.igst,isActive:tax.isActive,_id:tax._id});
    
  };
  componentDidMount(){
    this.List();
   }
   List = () => {
    
    fetch("http://localhost:8080/allTax",{
        method: "GET",
        cache: 'no-cache', 
        mode: 'cors', 
        headers:  new Headers({
        'Content-Type': 'application/json',
        'authorization':"Key@123"
        })
    })
    .then(res => res.json())
    .then(
        (result) => {
            // console.log("listabc = ",result)
             var mainArray = [];
             result.data.forEach((tax)=>{
                 var dataArray = [];
                //  dataArray.push(tax._id)
                 dataArray.push(tax.taxCode)
                 dataArray.push(tax.taxName)
                 dataArray.push(tax.cgst)
                 dataArray.push(tax.igst)
                 dataArray.push(tax.sgst)
                 dataArray.push(tax.isActive ? "Active" : "Inactive")
                 dataArray.push(<button onClick={(e)=>{this.handleEdit(e,tax)}}>Edit</button>)
                // dataArray.push(new Date(tax.createAt).toDateString());
                mainArray.push(dataArray)
                
                

             })
             this.setState({
                 List:mainArray
             })
            
            },
            (error) => {
              console.log("error",error)
        }
    )
  }
      render(){
        
        return(
          <div>
            
          <Grid container>
         
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Tax"
              cardSubtitle={
                <Button style={{ float: "right" }} variant="fab" color="primary" aria-label="add" onClick={this.handleOpen} >
                  <AddIcon />
                </Button>
              } 
              
               
              content={
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Code","Name", "CGST %", "IGST %", "SGST %","IsActive","Action"]}
                  tableData={
                   this.state.List    
                  }
                
                />}
            />
            
            </ItemGrid>
            <Modal {...this.state} handleClose={this.handleClose} List={this.List}/>
            </Grid>
      
        </div>
    
        
        );
      }
}


// We need an intermediary variable for handling the recursive nesting.


export default Tax;
