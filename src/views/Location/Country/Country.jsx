import React from "react";
import { Grid } from "material-ui";
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from './modal'
import Pagination from 'react-js-pagination'
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
// import  'bootstrap/less/bootstrap.less'
// import Modal from 'react-responsive-modal';

import { RegularCard, Table, ItemGrid } from "components";
var data = [];
class Country extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            load: false,
            mydata: [],
            countryName: "",
            countryCode: "",
            _id: "",
            userId: "",
            iActive:false
             
         }
     };
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

        }
    };

    clickaction = () => {
        this.setState({ countryName: "", countryCode: "", _id: "" })
        this.setState({ load: true, options: "add" })
    }

    handleEdit = (e, item) => {
        console.log(item.isActive,"activa")
        this.setState({ load: true })
        this.setState({
            countryName: item.countryName, countryCode: item.countryCode, _id: item._id, userId: item.createdBy
        })
       
    }


onClose = () => {
 this.setState({load:false });
 this.data();

};
     handlePageChange=(pageNumber)=> 
     {
         console.log(pageNumber,)
         this.setState({ activePage:pageNumber});
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
    return (
        <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
                
                <RegularCard
                    plainCard
                    cardTitle="Country List"
                    cardSubtitle={
                        <Button style={{float:"right"}}variant="fab" color="primary" aria-label="add" onClick={this.clickaction} >
                            <AddIcon />
                        </Button>
                    }
                    content={
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["CountryCode", "Country","Operation"]}
                            tableData={this.state.mydata}
                        />
                        }
                        content={
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["CountryCode", "Country", "Is Active","Operation"]}
                                tableData={this.state.mydata}
                            />
                        }

                    />

                </ItemGrid>

                <Modal open={this.state.load} data={{ "_id": this.state._id, "countryName": this.state.countryName, "countryCode": this.state.countryCode, "userId": this.state.userId }} onClose={this.onClose} />
            </Grid>

        );

    }
}

export default Country;
