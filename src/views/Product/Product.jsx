import React from "react";
// import PropTypes from "prop-types";
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Modal from './Modal.jsx';
import  {Grid} from "material-ui";
import Search from '@material-ui/icons/Search';
import Modal1 from './Modal1.jsx';

import { RegularCard,Button, Table, ItemGrid } from "components";
// import Form from "./Form.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import ViewIcon from '@material-ui/icons/ViewList';
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';

// import iconsStyle from "assets/jss/material-dashboard-react/iconsStyle";


class Product extends React.Component {
   pro=({ ...this.props});
  
  constructor(props) {
    super(props);
    this.state = {
    load : false,
    load1:false,
    List:[],
    productCode:"",
    productName:"",
    taxCode:"",
    rate:"",
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
  handleOpen1=()=>{
    this.setState({load1 : true});
  }
  handleClose1 = () => {
    
    this.setState({load1: false });
  };
  handleOpen=()=>{
    this.setState({load : true});
    this.setState({productCode:"",productName:"",taxCode:"",rate:"",sgst:"",_id:"",isActive:""});
      
  }
  handleClose = () => {
    
    this.setState({load: false });
  };
  handleEdit = (e,product) => {
    this.setState({load: true ,productCode :product.productCode,productName : product.productName,taxCode : product.taxCode,rate:product.rate,isActive:product.isActive,_id:product._id,userId:product.createdBy});
    
  };
  onmodal=(data)=>{
    console.log(data,"respond")
    var mainArray = [];
    data.forEach((product)=>{
        var dataArray = [];
       //  dataArray.push(tax._id)
        dataArray.push(product.productCode)
        dataArray.push(product.productName)
        dataArray.push(product.taxCode)
        dataArray.push(product.rate)
        dataArray.push(product.isActive ? "True" : "False")
        dataArray.push(<Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,product)}style={{color:"black"}}><EditIcon/></a></Tooltip>)
       // dataArray.push(new Date(tax.createAt).toDateString());
       mainArray.push(dataArray)

    })
    this.setState({
        List:mainArray
    })
  }

 
  componentDidMount(){
    this.List();
   }
   List = () => {
    
    fetch("http://localhost:8080/allProduct?id="+this.state.id,{
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
             result.data.forEach((product)=>{
                 var dataArray = [];
                //  dataArray.push(tax._id)
                 dataArray.push(product.productCode)
                 dataArray.push(product.productName)
                 dataArray.push(product.taxCode)
                 dataArray.push(product.rate)
                 dataArray.push(product.isActive ? "True" : "False")
                 dataArray.push(<Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,product)}style={{color:"black"}}><EditIcon/></a></Tooltip>)
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
                 cardTitle={<div>Product<Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} aria-label="add" variant="fab"onClick={this.handleOpen} >
              <AddIcon /> </Button><Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} aria-label="add" variant="fab"onClick={this.handleOpen1} ><Search/>
              </Button></div>
              }
  
              content={
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["Code", "Name","Tax" , "Rate", "IsActive","Action"]}
                      tableData={this.state.List}
                  />
              }
              />
  
              </ItemGrid>
              </Grid> 
            <Modal {...this.state} handleClose={this.handleClose} List={this.List}/>
            <Modal1 {...this.state} data={this.onmodal} handleClose={this.handleClose1} />
      
        </div>
    
        
        );
      }
}


// We need an intermediary variable for handling the recursive nesting.


export default Product;
