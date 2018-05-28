import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility
} from "@material-ui/icons";
import { withStyles, Grid } from "material-ui";

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

var cardoptions={}
class Dashboard extends React.Component {

  state = {
    value: 0,
    totalinvoice:"",
    totalsales:"",
    data:""
  };

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "",
        }
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: ""
        }
      }
    }
  })

  componentWillMount(){
    this.ticket1();
    this.ticket2();
    let id=localStorage.getItem("id")
    if(id==""&& id==undefined){
      window.location.href="/login"
    }
    
  }

  componentDidMount(){
    this.list();
  }

  ticket1=()=>{
    axios.get("http://localhost:8080/countInvoice")
      .then(
        (result) => {
          console.log("result of count invoice",result.data.data);
          this.setState({ totalinvoice: result.data.data })
          console.log("totalinvoice count", this.state.totalinvoice);
        },
        (error) => {
          // console.log("error", error)
        }
      )
  }

  ticket2 = () => {
    axios.get("http://localhost:8080/sales")
      .then(
        (result) => {
          this.setState({ totalsales: result.data.data[0].total });    
        },
        (error) => {
          // console.log("error", error)
        }
      )
  }

  list=()=>{
    fetch("http://localhost:8080/topTenInvoice", {
      method: "GET",
      cache: 'no-cache',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
        // 'authorization':"Key@123" 
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          var mainArray = [];
          result.data.forEach((responseData) => {
            var dataArray = [];
            dataArray.push(responseData.invoiceNumber)
            dataArray.push(responseData.customerName)
            dataArray.push(responseData.invoiceTotal)
            dataArray.push(responseData.invoiceDate)
            dataArray.push(responseData.isActive ? "Yes" : "No")
            mainArray.push(dataArray)
          })
          this.setState({
            data: mainArray
          })
        },
        (error) => {
          console.log("error", error)
        }
      )
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const columns = [
      {
        name: "Invoice No",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Customer Name",
        options: {
          filter: true,
          sort: true
        }
      }, {
        name: "Invoice Total",
        options: {
          filter: true
        }
      },
      {
        name: "Invoice Date",
        options: {
          filter: false,
        }
      },

      {
        name: "IsActive",
        options: {
          filter: true
        }
      }
      
      
    ];
    var tableData = this.state.data;

    const options = {
      selectableRows: false,
      filterType: 'false',
      responsive: 'stacked',
     rowsPerPage: 10,
      page: 1,
      viewColumns: true,
      print: false,
      filter: false,
      download: false,
      textLabels: {
        body: {
          noMatch: "No Records Found!!",
          toolTip: "Sort",
        }
      }
    }
    return (
      <div> 
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="Total Invoice"
              description={this.state.totalinvoice}
              small=""
             statIcon={Warning}
              statIconColor=""
            
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="Total Sales"
              description={this.state.totalsales}
              statIcon={DateRange}
              statText=""
            />
          </ItemGrid>
           <ItemGrid xs={30} sm={30} md={30}>
            {/* <RegularCard
            cardTitle="Company"
            cardSubtitle={}
                /> */}

            
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable title={"Top Ten Invoices"} data={tableData} columns={columns} options={options} />
             
              </MuiThemeProvider>  
        </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
