import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Autocomplete from "react-autocomplete";
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
var cardoptions = {}, items = []

class Dashboard extends React.Component {

  state = {
    value: '',
    totalinvoice: "0",
    totalsales: "0",
    data: [],
    loading: false,
    id: localStorage.getItem("id"),
    allCompany: [],
    companyCode: "",
    datafound: false
  };


  componentWillMount() {

    this.allCompany();
    let id = localStorage.getItem("id")
    if (id == null) {
      window.location.href = "/login"
    }

  }


  allCompany = () => {
    axios.get("http://localhost:8080/allCompany?id=" + this.state.id)
      .then(
        (result) => {
          console.log("result company", result.data.data);
          result.data.data.map((item, key) => {
            this.state.allCompany.push({ "companyCode": item.companyCode, "companyName": item.companyName })
          })
          this.setState({ allCompany: this.state.allCompany });
        },
        (error) => {
          // console.log("error", error)
        }
      )
  }
  ticket1 = (year, month, currentdate) => {
    var companyCode = this.state.value.split("-")[0];
    axios.get("http://localhost:8080/countInvoice?id=" + this.state.id + '&companyCode=' + companyCode + '&year=' + year + '&month=' + month + '&currentDate=' + currentdate)
      .then(
        (result) => {
          console.log("result of count invoice", result.data.data);
          this.setState({ totalinvoice: result.data.data })
          console.log("totalinvoice count", this.state.totalinvoice);
        },
        (error) => {
          // console.log("error", error)
        }
      )
  }

  ticket2 = (year, month, currentdate) => {
    var companyCode = this.state.value.split("-")[0];
    axios.get("http://localhost:8080/sales?id=" + this.state.id + '&companyCode=' + companyCode + '&year=' + year + '&month=' + month + '&currentDate=' + currentdate)
      .then(
        (result) => {
          this.setState({ totalsales: result.data.data[0].total });
        },
        (error) => {
          // console.log("error", error)
        }
      )
  }



  list = (year, month, currentdate) => {
    var companyCode = this.state.value.split("-")[0];
    fetch("http://localhost:8080/topTenInvoice?id=" + this.state.id + '&companyCode=' + companyCode + '&year=' + year + '&month=' + month + '&currentDate=' + currentdate, {
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
          console.log(result.data, "data")
          if (result.data.length != 0) {
            var mainArray = [];
            result.data.forEach((responseData) => {
              var dataArray = [];
              dataArray.push(responseData.invoiceNumber)
              dataArray.push(responseData.invoiceDate.split("T")[0])
              dataArray.push(responseData.customerName)
              dataArray.push(responseData.invoiceTotal)
              dataArray.push(responseData.isActive ? "Yes" : "No")
              mainArray.push(dataArray)
            })

            this.setState({
              data: mainArray, datafound: true
            })
          }
          else {
            this.setState({
              datafound: false
            })
          }
        },
        (error) => {
          console.log("error", error)
        }
      )
  }


 
  handleGo = (e) => {
    e.preventDefault();
    var date = new Date();
    var currentdate = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    this.ticket1(year, ++month, currentdate);
    this.ticket2(year, month, currentdate)
    this.list(year, month, currentdate)
    //  axios.get("http://localhost:8080/countInvoice?id="+this.state.id+'& customerName='+this.state.customerName+'& date='+year+'-'+month)
    //  .then((result)=>{
    //    console.log(result,"res")
    //  })
  }
  render() {

    items = [];
    this.state.allCompany.map((item, key) => {
      items.push({ label: item.companyCode + "-" + item.companyName })
    })
   
    function matchStateToTerm(item, value) {
      return (
        item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
      )
    }
    // Teach Autosuggest how to calculate suggestions for any given input value.

    return (

      <div> {console.log(this.state.value, "name")}
        <form class="form-inline">
          <div className="container">
            <div class="row">
              <div style={{ textAlign: 'right' }}>
                <span class="input-group-text" htmlFor="company" id="basic-addon1">Company</span>
              </div>
              <div>
                <Autocomplete
                  value={this.state.value}
                  inputProps={{ id: 'comapny' }}
                  items={items}
                  shouldItemRender={matchStateToTerm}
                  getItemValue={item => item.label}
                  onSelect={value => this.setState({ value })}
                  onChange={e => this.setState({ value: e.target.value })}
                  renderItem={(item, isHighlighted) => (
                    <div
                      className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                    >
                      {item.label}
                    </div>
                  )}
                  renderMenu={(items, value) => (
                    <div className="menu">
                      {value === '' ? (
                        <div className="item">Company Names</div>
                      ) : this.state.loading ? (
                        <div className="item">Loading...</div>
                      ) : items.length === 0 ? (
                        <div className="item">No matches for {value}</div>
                      ) : items}
                    </div>
                  )}
                      />
              </div>
              <div className="col" style={{ textAlign: 'left' }}>
                <button class="btn btn-success" onClick={this.handleGo}>Go</button>
              </div>
            </div>
          </div >
        </form>

        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="blue"
              title="Current Month Total Invoice"
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
              title="Current Month Total Sales"
              description={this.state.totalsales}
              statIcon={DateRange}
              statText=""
            />
          </ItemGrid>
          <ItemGrid xs={30} sm={30} md={30}>

            <RegularCard headerColor="orange"
              plainCard
              cardTitle={<h5><b>Current Month Top 10 Sales</b></h5>}
              content={
                this.state.datafound ? (<Table
                  tableHeaderColor="primary"
                  tableHead={["InvoiceNo", "InvoiceDate", "Customer", "Amount", "Status"]}
                  tableData={this.state.data}
                />) : <center><h6><b>"No Records Found"</b></h6></center>

              }
            />
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
