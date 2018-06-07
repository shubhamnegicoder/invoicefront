import React from "react";
// import PropTypes from "prop-types";
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Modal from './Modal.jsx';
import Button from 'material-ui/Button';
import  {Grid} from "material-ui";
import AddIcon from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import ViewIcon from '@material-ui/icons/ViewList';

import { RegularCard, Table, ItemGrid } from "components";
// import Form from "./Form.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';



// import iconsStyle from "assets/jss/material-dashboard-react/iconsStyle";
var localStorageId=localStorage.getItem('id')
console.log(localStorageId,"local");

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
    userId:"",
    id :localStorage.getItem("id"),
    _id:""
    
    };
  }
  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "#F08080",
        }
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#d5f5e3"
        }
      }
    }
  })
  handleOpen=()=>{
    this.setState({load : true});
    this.setState({taxCode:"",taxName:"",cgst:"",igst:"",sgst:"",_id:"",isActive:""});
      
  }
  handleClose = () => {
    
    this.setState({load: false });
  };
  handleEdit = (e,tax) => {
    this.setState({load: true ,taxCode :tax.taxCode,taxName : tax.taxName,sgst : tax.sgst,cgst : tax.cgst,igst :tax.igst,isActive:tax.isActive,_id:tax._id,userId:tax.createdBy});
    
  };
  componentDidMount(){
    this.List();
   }
   List = () => {
    
    fetch("http://localhost:8080/allTax?id="+this.state.id,{
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
             console.log("listabc = ",result)
             var mainArray = [];
             result.data.forEach((tax)=>{
                 var dataArray = [];
                //  dataArray.push(tax._id)
                 dataArray.push(tax.taxCode)
                 dataArray.push(tax.taxName)
                 dataArray.push(tax.cgst)
                 dataArray.push(tax.igst)
                 dataArray.push(tax.sgst)
                 dataArray.push(tax.isActive ?"True" : "False")
                 dataArray.push(<Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,tax)}style={{color:"black"}}><EditIcon/></a></Tooltip>)
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
               cardTitle={<div>Tax<Tooltip id="tooltip-icon" title="Add Tax"><Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} aria-label="add" variant="fab"onClick={this.handleOpen} >
              <AddIcon /> 

            </Button></Tooltip></div>}
              content={
                <Table
                    tableHeaderColor="primary"
                    tableHead={["Code", "Name","CGST" , "SGST","IGST" ,"IsActive","Action"]}
                    tableData={this.state.List}
                />
            }

  
              />
             
             
            </ItemGrid>
            </Grid> 
         
            <Modal {...this.state} handleClose={this.handleClose} List={this.List}/>
            
      
        </div>
    
        
        );
      }
}


// We need an intermediary variable for handling the recursive nesting.


export default Tax;
