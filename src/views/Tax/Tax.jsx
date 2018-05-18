import React from "react";
// import PropTypes from "prop-types";
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Modal from './Modal.jsx';
import Button from 'material-ui/Button';
import  {Grid} from "material-ui";
import AddIcon from '@material-ui/icons/Add';

import { RegularCard, Table, ItemGrid } from "components";
// import Form from "./Form.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';

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
  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "#F08080",
        }
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FFB6C1"
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
                 dataArray.push(tax.isActive ?"True" : "False")
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
            name: "CGST(%)",
            options: {
              filter: false,
              sort:true
            }
          },
          {
            name: "SGST(%)",
            options: {
              filter: true,
              sort:true
            }
          },
          {
            name: "IGST(%)",
            options: {
              filter: true
            },sort:true
            
          },
          {
            name: "IsActive",
            options: {
              filter: true,
              sort:true
            }
          },
            {
              name: "Action"
          }        
    ];
  var tableData= this.state.List;
  

     const options = {
      filter: true,
      selectableRows:false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      page: 1,
      viewColumns:false,
      print:false,
      filter:false,
      download:false,
      textLabels: {
        body: {
          noMatch: "Sorry, no matching records found",
          toolTip: "Sort",
        }
      }
}
   
        
        return(
          <div>
            
            <Grid container>
         
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle={<h2><b>Tax</b></h2>}
              cardSubtitle={<Button style={{ float: "right" }} variant="fab" color="primary" aria-label="add" onClick={this.handleOpen} >
              <AddIcon />
            </Button>

              } 
             
  
              />
              <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable title={"Tax list"} data={tableData} columns={columns} options={options} />
              </MuiThemeProvider>  
            </ItemGrid>
            </Grid> 
         
            <Modal {...this.state} handleClose={this.handleClose} List={this.List}/>
            
      
        </div>
    
        
        );
      }
}


// We need an intermediary variable for handling the recursive nesting.


export default Tax;
