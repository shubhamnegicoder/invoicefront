import React from "react";
// import PropTypes from "prop-types";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from './Modal.jsx';
import Button from 'material-ui/Button';
import  {Grid} from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";
// import Form from "./Form.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import AddIcon from '@material-ui/icons/Add';

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
    _id:""
    
    };
  }
  handleOpen=()=>{
    this.setState({load : true});
    this.setState({productCode:"",productName:"",taxCode:"",rate:"",_id:"",isActive:""});
      
  }
  handleClose = () => {
    
    this.setState({load: false });
  };
  handleEdit = (e,product) => {
    this.setState({load: true ,productCode :product.productCode,productName : product.productName,taxCode : product.taxCode,rate :product.rate,isActive:product.isActive,_id:product._id});
    
  };
  componentDidMount(){
    this.List();
   }
   List = () => {
    
    fetch("http://localhost:8080/allProduct",{
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
                 dataArray.push(product.isActive ? "Active" : "Inactive")
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
        
        return(
          <div>
            
          <Grid container>
         
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Product"
              cardSubtitle={
                <Button style={{ float: "right" }} variant="fab" color="primary" aria-label="add" onClick={this.handleOpen} >
                  <AddIcon />
                </Button>
              } 
              
               
              content={
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Code","Name","Tax", "Rate","IsActive","Action"]}
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


export default Product;
