import React from "react";
// import PropTypes from "prop-types";
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Modal from './Modal.jsx';
import  {Grid} from "material-ui";

import { RegularCard,Button, Table, ItemGrid } from "components";
// import Form from "./Form.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';

// import iconsStyle from "assets/jss/material-dashboard-react/iconsStyle";


class Product extends React.Component {
   pro=({ ...this.props});
  
  constructor(props) {
    super(props);
    this.state = {
    load : false,
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
                 dataArray.push(<button onClick={(e)=>{this.handleEdit(e,product)}}>Edit</button>)
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
        const columns = [
          {
            name: "Code",
            options: {
              filter: true,
              sort:true
            }
          },      
          {
            name: "Name",
            options: {
              filter: true,
              sort:true
            }
          },
          {
            name: "Tax",
            options: {
              filter: false,
            }
          },
          {
            name: "Rate",
            options: {
              filter: true,
            }
          },
          {
            name: "IsActive",
            options: {
              filter: true
            }
          },
            {
              name: "Action"
          }        
    ];
    var tableData= this.state.List;
    // console.log(tableData,"medha")
    const options = {
      filter: true,
      selectableRows:false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      page: 1,
      viewColumns:true,
      print:false,
      filter:true,
      download:false,
      textLabels: {
        body: {
          noMatch: "No Records Found!!",
          toolTip: "Sort",
        }
      }
}
        
        return(
          <div>
            
          <Grid container>
         
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle={<div><h2 ><b>Product</b></h2><Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} variant="fab" aria-label="add" onClick={this.handleOpen} >
              <AddIcon />
            </Button></div>}
            />
             <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable title={"Product list"} data={tableData} columns={columns} options={options} />
              </MuiThemeProvider>  
            
            </ItemGrid>
            </Grid>
            <Modal {...this.state} handleClose={this.handleClose} List={this.List}/>
      
        </div>
    
        
        );
      }
}


// We need an intermediary variable for handling the recursive nesting.


export default Product;
