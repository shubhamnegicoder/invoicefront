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
    userTotalSales:"0",
    userTotalInvoice:"0",
    userTotalCompany:"0",
    userData:[],
    data: [],
    loading: false,
    id: localStorage.getItem("id"),
    allCompany: [],
    companyCode: "",
    datafound: false,
    userDetails:false,
  };


  componentWillMount() {

    this.allCompany();
    let id = localStorage.getItem("id")
    if (id == null) {
      window.location.href = "/login"
    }
    this.setState({userDetails:true})
    this.allusertotalinvoicedata(); 
    this.allusertotalSalesdata();
    this.allusertotalCompanydata();
    this.userlist();
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
  allusertotalinvoicedata=()=>{
    
    axios.get("http://localhost:8080/userCountInvoice?userId="+this.state.id)
    .then(

    (result)=>{
      this.setState({userTotalInvoice:result.data.data})
    },
    (error)=>{

    }
    )
  }
  allusertotalSalesdata=()=>{
    axios.get("http://localhost:8080/userTotalSales?userId=" + this.state.id)
      .then(

        (result) => {
         
          this.setState({ userTotalSales: result.data.data[0].usertotalsales})
        },
        (error) => {

        }
      )
  }
  allusertotalCompanydata=()=>{
    axios.get("http://localhost:8080/userTotalCompany?userId=" + this.state.id)
      .then(

        (result) => {
          console.log(result.data.data[0],"companmy")
         
          this.setState({ userTotalCompany: result.data.data[0].usertotalcompany})
        },
        (error) => {

        }
      )
  }
  

  ticket1 = (year, month, currentdate) => {
    var companyCode = this.state.value.split("-")[0];
    axios.get("http://localhost:8080/countInvoice?id=" + this.state.id + '&companyCode=' + companyCode )
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
    axios.get("http://localhost:8080/sales?id=" + this.state.id + '&companyCode=' + companyCode )
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
    fetch("http://localhost:8080/topTenInvoice?id=" + this.state.id + '&companyCode=' + companyCode, {
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
              dataArray.push(responseData.status)
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
  userlist = (year, month, currentdate) => {
    var companyCode = this.state.value.split("-")[0];
    fetch("http://localhost:8080/userTopTenInvoice?id=" + this.state.id , {
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
              dataArray.push(responseData.status)
              mainArray.push(dataArray)
            })

            this.setState({
              userData: mainArray, datafound: true
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
    this.setState({userDetails:false})
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
  const menuStyle=  {
      borderRadius: '3px',
       borderStyle: "solid",
        borderWidth: "1px",
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 0',
        fontSize: '100%',
        position: 'absolute',
        overflow: 'auto',
        maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
     }
    // Teach Autosuggest how to calculate suggestions for any given input value.

    return (

      <div> 
        <form class="form-inline">
          <div className="container">
            <div class="row">
              <div style={{ textAlign: 'right' }}>
                <span class="input-group-text"  id="basic-addon1">Company</span>
              </div>
              <div>
                <Autocomplete
                  value={this.state.value}
                  items={items}
                  shouldItemRender={matchStateToTerm}
                  getItemValue={item => item.label}
                  onSelect={value => this.setState({ value })}
                  onChange={e => this.setState({ value: e.target.value, userDetails: true})}
                  renderItem={(item, isHighlighted) => (
                    <div
                      className={`item ${isHighlighted ? 'item-highlighted' : ''}`} style={{minWidth:"205px"}}
              >
                      {item.label}
                    </div>
                  )}
                  renderMenu={(items, value,style) => (
                    <div className="menu" style={{...menuStyle}}>
                      {value === '' ? (
                        <div className="item">Type for Company Names</div>
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

        
         
        {this.state.userDetails ? (
          <Grid container style={{ marginTop: "50px" }}>
         <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="blue"
              title="User Total Invoiced"
              description={this.state.userTotalInvoice}
              small=""
              statIcon={Warning}
              statIconColor=""

            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="User Total Sales"
              description={this.state.userTotalSales}
              statIcon={DateRange}
              statText=""
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Accessibility}
              iconColor="blue"
              title="User Total Companies"
              description={this.state.userTotalCompany}
              statIcon={Update}
              statText=""
            />
          </ItemGrid>
          <ItemGrid xs={30} sm={30} md={30}>

            <RegularCard headerColor="orange"
              plainCard
              cardTitle={<h5><b> User Recent 10 Sales</b></h5>}
              content={
                this.state.datafound ? (<Table
                  tableHeaderColor="primary"
                  tableHead={["InvoiceNo", "InvoiceDate", "Customer", "Amount", "Status"]}
                  tableData={this.state.userData}
                />) : <center><h6><b>"No Records Found"</b></h6></center>

              }
            />
            </ItemGrid></Grid>) : 
          (<Grid container style={{ marginTop: "50px" }}>
             <ItemGrid xs={12} sm={6} md={3}>
              <StatsCard
                icon={ContentCopy}
                iconColor="blue"
                title={this.state.value + " " +"Total Invoiced"}
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
                title={this.state.value + " " + "Total Sales"}
                  description={this.state.totalsales}
                  statIcon={DateRange}
                  statText=""
                />
              </ItemGrid>
              
              <ItemGrid xs={30} sm={30} md={30}>

                <RegularCard headerColor="orange"
                  plainCard
                cardTitle={<h5><b>{this.state.value +" "+ "Recent 10 Sales"}</b></h5>}
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
              )
            }
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
