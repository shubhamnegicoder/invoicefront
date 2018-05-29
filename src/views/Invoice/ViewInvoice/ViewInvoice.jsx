import React from "react";
import { Grid } from "material-ui";
import './style.css';
import logo from './logo.png'
import axios from 'axios';
import { RegularCard, Table, ItemGrid } from "components";
// var invoiceNo

export default class ViewInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      invoiceNo: "",
      data: [],
      logo: "",
      customerName: "",
      List:[],
      customerAddress: "",
      itemTotal: "",
      cgstTotal: "",
      sgstTotal: "",
      igstTotal: "",
      discountTotal: "",
      invoiceTotal: ""
    };
  }
  getQuery = (sParam) => {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  }
  getData = (invoiceNo) => {
    axios
      .get("http://localhost:8080/allInvoice?id=" + this.state.id + "&invoiceNumber=" + invoiceNo)
      .then((res) => {
        console.log("listabc11 = ",res)
       
        var mainArray = [];
        res.data.data[0].items.forEach((invoice)=>{
            var dataArray = [];
           //  dataArray.push(tax._id)
            dataArray.push(invoice.name)
            dataArray.push(invoice.qty)
            dataArray.push(invoice.rate)
            dataArray.push(invoice.total)
            dataArray.push(invoice.discount)
            dataArray.push(invoice.CGSTRate)
            dataArray.push(invoice.CGSTAmount)
            dataArray.push(invoice.SGSTRate)
            dataArray.push(invoice.SGSTAmount)
            dataArray.push(invoice.IGSTRate)
            dataArray.push(invoice.IGSTAmount)
            
           // dataArray.push(new Date(tax.createAt).toDateString());
           mainArray.push(dataArray)
           
          

        })
       



        console.log("response from /allInvoice", res);
        console.log("logo", res.data.data[0].logo);
        this.setState({
          logo: res.data.data[0].logo,
          companyName: res.data.data[0].companyName,
          customerName: res.data.data[0].customerName,
          customerAddress: res.data.data[0].customerAddressLine1 + " " + res.data.data[0].customerAddressLine2,
          itemTotal: res.data.data[0].itemTotal,
          cgstTotal: res.data.data[0].cgstTotal,
          sgstTotal: res.data.data[0].sgstTotal,
          igstTotal: res.data.data[0].igstTotal,
          discountTotal: res.data.data[0].discountTotal,
          invoiceTotal: res.data.data[0].invoiceTotal,
          List:mainArray
        })
      })
  }
  componentWillMount() {
    let invoiceNo = this.getQuery('invoiceNo');
    this.getData(invoiceNo);
  }
  
  render() {
    const styles = theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
      row: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
        },
      },
    });
    return (
      <div>
        <header class="clearfix">
          <div id="logo">
            <img src={"uploads/" + this.state.logo} />
          </div>
          <center>
            {/* <div><b>Company Name</b><br /> */}
            <h4>{this.state.companyName}</h4>
            {/* </div> */}
          </center>
          <h1> TAX-INVOICE</h1>
          <div id="project">
            <div><b>Billed To</b></div>
            <div>
              <span>CLIENT</span>
              {this.state.customerName}
            </div>
            <div>
              <span>ADDRESS</span>
              {this.state.customerAddress}
            </div>
            <div>
              <span>DATE</span>
              August 17, 2015
              </div>
          </div>
        </header>
        <main>
          <table style={{ fontSize: '11px' }}>
          

                           <Table
                                tableHeaderColor="primary"
                                tableHead={["Name", "Quantity","Rate" ,"Total", "Discount","CGST Rate","CGST Amount","SGST Rate","SGST Amount","IGST Rate","IGST Amount"]}
                                tableData={this.state.List}
                                className="table"
                            />
            
             
              <tr>
              </tr>
              <tr>
              </tr>
              <tr>
               
                <td class="total"><b>TAXABLE VALUE BEFORE TAX &nbsp;&nbsp;{"₹ " + this.state.itemTotal}</b></td>
              </tr>
              <tr>
               
                <td class="total"> <b>CGST &nbsp;&nbsp;{"₹ " + this.state.cgstTotal}</b></td>
              </tr>
              <tr>
               
                <td class="total"><b>SGST&nbsp;&nbsp;{"₹ " + this.state.sgstTotal}</b></td>
              </tr>
              <tr>
              
                <td class="total"><b>IGST&nbsp;&nbsp;{"₹ " + this.state.igstTotal}</b></td>
              </tr>
              <tr>
               
                <td class="total"><b>TOTAL DISCOUNT&nbsp;&nbsp;{"₹ " + this.state.discountTotal}</b></td>
              </tr>
              <tr>
               
                <td class="grand total"><b>GRAND TOTAL&nbsp;&nbsp;{"₹ " + this.state.invoiceTotal}</b></td>
              </tr>
            
          </table>
        </main>
      </div>
    )
  }
}



