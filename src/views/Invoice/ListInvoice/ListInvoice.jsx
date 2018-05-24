import React from "react";
// import PropTypes from "prop-types";
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import  {Grid} from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";
// import Form from "./Form.jsx";
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';

class ListInvoice extends React.Component {
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
      componentDidMount(){
        this.List();
       }
       List = () => {
    
        fetch("http://localhost:8080/allInvoice",{
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
                 result.data.forEach((invoice)=>{
                     var dataArray = [];
                    //  dataArray.push(tax._id)
                     dataArray.push(invoice.customerName)
                     dataArray.push(invoice.companyName)
                     dataArray.push(invoice.invoiceNumbe)
                     dataArray.push(invoice.invoiceDate)
                     dataArray.push(invoice.invoiceTotal)
                     dataArray.push(invoice.isActive ? "True" : "False")
                     dataArray.push(<button onClick={(e)=>{this.handleEdit(e,invoice)}}>Edit</button>)
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
          name: "Company",
          options: {
            filter: true,
            sort:true
          }
        },      
        {
          name: "Customer",
          options: {
            filter: true,
            sort:true
          }
        },
        {
          name: "Invoice Number",
          options: {
            filter: false,
            sort:true
          }
        },
        {
          name: "Date",
          options: {
            filter: true,
            sort:true
          }
        },
        {
            name: "Amount",
            options: {
              filter: true,
              sort:true
            }
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
//   var tableData= this.state.List;
 // console.log(tableData,"medha")
  const options = {
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
            cardTitle={<h2><b>Invoice</b></h2>}
            
          />
           <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable title={"Invoice list"}  columns={columns} options={options} />
            </MuiThemeProvider>  
          
          </ItemGrid>
          </Grid>
         
    
      </div>
  
      
      );
    }
}


// We need an intermediary variable for handling the recursive nesting.


export default ListInvoice;
