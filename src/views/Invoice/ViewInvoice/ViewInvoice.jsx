import React from "react";
import { Grid } from "material-ui";
import './style.css';
import logo from './logo.png'
import axios from 'axios';
import { RegularCard, Table, ItemGrid } from "components";
import $ from 'jquery';

export default class ViewInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      invoiceNo: "",
      data: [],
      logo: "",
      companyName: "",
      companyAddress: "",
      customerName: "",
      List: [],
      customerAddress: "",
      itemTotal: "",
      cgstTotal: "",
      sgstTotal: "",
      igstTotal: "",
      discountTotal: "",
      invoiceTotal: "",
      buttonView: true
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
        console.log("response from /allInvoice", res.data.data[0]);
        var mainArray = [];
        res.data.data[0].items.forEach((invoice) => {
          var dataArray = [];
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
          mainArray.push(dataArray)
        })
        let invoiceDate = (res.data.data[0].invoiceDate).toString();
        invoiceDate = invoiceDate.split("T", 1);
        invoiceDate = invoiceDate[0];
        this.setState({
          logo: res.data.data[0].logo,
          companyName: res.data.data[0].companyName,
          companyAddress: res.data.data[0].companyAddressLine1 + " " + res.data.data[0].companyAddressLine2,
          invoiceNo: invoiceNo,
          invoiceDate: invoiceDate,
          customerName: res.data.data[0].customerName,
          customerAddress: res.data.data[0].customerAddressLine1 + " " + res.data.data[0].customerAddressLine2,
          itemTotal: res.data.data[0].itemTotal,
          cgstTotal: res.data.data[0].cgstTotal,
          sgstTotal: res.data.data[0].sgstTotal,
          igstTotal: res.data.data[0].igstTotal,
          discountTotal: res.data.data[0].discountTotal,
          invoiceTotal: res.data.data[0].invoiceTotal,
          List: mainArray
        })
        console.log("states", this.state);
      })
  }
  print = () => {
    $('.printButton').hide();
    window.print();
    $('.printButton').show();
  }
  componentWillMount() {
    let invoiceNo = this.getQuery('invoiceNo');
    this.getData(invoiceNo);
    console.log(this.state.data);
    let id=localStorage.getItem("id")
    if(id==null){
      window.location.href="/login"
    }
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
        <table style={{ backgroundColor: 'white' }}>
          <tr>
            <td style={{ width: '10%' }}>
              <div id="logo" style={{ float: 'left' }}>
                <img src={"uploads/" + this.state.logo} />
              </div>
            </td>
            <td>
              <div>
                <center>
                  <h4>{this.state.companyName}</h4>
                  {this.state.companyAddress}
                </center>
              </div>
            </td>
          </tr>
        </table>
        <header class="clearfix">
          <h1>TAX-INVOICE</h1>
        </header>
        <table>
          <tr>
            <td style={{ textAlign: 'left' }}>
              <div >
                <div>
                  <b>Invoice Date</b></div>
                <div>
                  {this.state.invoiceDate}
                </div>
              </div>
            </td>
            <td>
              <div>
                <div>
                  <b>Invoice Number</b></div>
                <div>
                  {this.state.invoiceNo}
                </div>
              </div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td style={{ textAlign: 'left' }}>
              <div >
                <div>
                  <b>Billed To</b></div>
                <div>
                  {this.state.customerName}
                </div>
                <div>
                  {this.state.customerAddress}
                </div>
                <div>GSTIN / UIN:</div>
              </div>
            </td>
            <td>
              <div>
                <div>
                  <b>Shipped To</b></div>
                <div>
                  {this.state.customerName}
                </div>
                <div>
                  {this.state.customerAddress}
                </div>
                <div>GSTIN / UIN:</div>
              </div>
            </td>
          </tr>
        </table>
        <main>
          <table style={{ fontSize: '11px' }}>
            <Table
              tableHeaderColor="gray"
              tableHead={["Name", "Quantity", "Rate", "Total", "Discount", "CGST Rate", "CGST Amount", "SGST Rate", "SGST Amount", "IGST Rate", "IGST Amount"]}
              tableData={this.state.List}
              className="table"
            />
            <tr>
              <td class="total"><b>TOTAL VALUE BEFORE TAX &nbsp;&nbsp;{"₹ " + this.state.itemTotal}</b></td>
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
          <table>
            <tr>
              <td>Signature</td>
              <td></td>
            </tr>
            <tr>
              <td>Signatory</td>
              <td></td>
            </tr>
            <tr>
              <td>Designation / Status</td>
              <td></td>
            </tr>
            <tr>
              <td>
                <center>
                  <button className="printButton btn btn-primary" onClick={this.print}>Print</button>
                </center>
              </td>
            </tr>
          </table>
        </main>
      </div>
    )
  }
}



