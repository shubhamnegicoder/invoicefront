import React from "react";
import { Grid } from "material-ui";
import './style.css';
import logo from './logo.png'
import axios from 'axios';

export default class ViewInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      invoiceNo: "",
      data: [],
      logo: "",
      customerName: "",
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
        console.log("response from /allInvoice", res.data.data);
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
          invoiceTotal: res.data.data[0].invoiceTotal
        })
      })
  }
  componentWillMount() {
    let invoiceNo = this.getQuery('invoiceNo');
    this.getData(invoiceNo);
  }
  render() {
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
            <thead>
              <tr>
                <th>NAME</th>
                <th>QTY</th>
                <th>RATE</th>
                <th>TOTAL</th>
                <th>DISCOUNT</th>
                <th>CGST</th>
                <th>SGST</th>
                <th>IGST</th>
              </tr>
              <tr>
                <th class="service"></th>
                <th class="desc"></th>
                <th></th>
                <th></th>
                <th></th>
                <th style={{ Position: "fixed" }}>
                  <th style={{ position: 'relative', left: "12px", borderBottom: "none" }}>Rate</th>
                  <th style={{ position: 'relative', left: "15px", borderBottom: "none" }}>Amount</th>
                </th>
                <th style={{ Position: "fixed" }}>
                  <th style={{ position: 'relative', left: "20px", borderBottom: "none" }}>Rate</th>
                  <th style={{ position: 'relative', left: "30px", borderBottom: "none" }}>Amount</th>
                </th>
                <th style={{ Position: "fixed" }}>
                  <th style={{ position: 'relative', left: "12px", borderBottom: "none" }}>Rate</th>
                  <th style={{ position: 'relative', left: "15px", borderBottom: "none" }}>Amount</th>
                </th>
                {/* <th><th>Rate</th>
            <th>Amount</th></th>
           <th><th>Rate</th>
            <th>Amount</th></th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="service">Design</td>
                <td class="code">67545</td>
                <td class="code">$40.00</td>
                <td class="code">26</td>
                <td class="code">$1,040.00</td>
                <td class="code">Design</td>
                <td class="code">56</td>
                <td><td class="rate">$40.00</td>
                  <td class="amount">26</td></td>
                <td><td class="rate">$1,040.00</td>
                  <td class="amount">$40.00</td></td>
                <td>  <td class="rate">26</td>
                  <td class="amount">$1,040.00</td></td>
              </tr>
              <tr>
                <td class="service">Design</td>
                <td class="code">67545</td>
                <td class="code">$40.00</td>
                <td class="code">26</td>
                <td class="code">$1,040.00</td>
                <td class="code">Design</td>
                <td class="code">56</td>
                <td><td class="rate">$40.00</td>
                  <td class="amount">26</td></td>
                <td><td class="rate">$1,040.00</td>
                  <td class="amount">$40.00</td></td>
                <td>  <td class="rate">26</td>
                  <td class="amount">$1,040.00</td></td>
              </tr>
              <tr>
                <td class="service">Design</td>
                <td class="code">67545</td>
                <td class="code">$40.00</td>
                <td class="code">26</td>
                <td class="code">$1,040.00</td>
                <td class="code">Design</td>
                <td class="code">56</td>
                <td><td class="rate">$40.00</td>
                  <td class="amount">26</td></td>
                <td><td class="rate">$1,040.00</td>
                  <td class="amount">$40.00</td></td>
                <td>  <td class="rate">26</td>
                  <td class="amount">$1,040.00</td></td>
              </tr>
              <tr>
              </tr>
              <tr>
                <td colspan="4"><b>Total</b></td>
                <td class="code">-</td>
                <td class="code">-</td>
                <td class="code">-</td>
                <td class="code">-</td>
                <td class="code">-</td>
                <td class="code">-</td>
              </tr>
              <tr>
                <td colspan="9">TAXABLE VALUE BEFORE TAX</td>
                <td class="total">{"₹ " + this.state.itemTotal}</td>
              </tr>
              <tr>
                <td colspan="9">CGST</td>
                <td class="total">{"₹ " + this.state.cgstTotal}</td>
              </tr>
              <tr>
                <td colspan="9">SGST</td>
                <td class="total">{"₹ " + this.state.sgstTotal}</td>
              </tr>
              <tr>
                <td colspan="9">IGST</td>
                <td class="total">{"₹ " + this.state.igstTotal}</td>
              </tr>
              <tr>
                <td colspan="9">TOTAL DISCOUNT</td>
                <td class="total">{"₹ " + this.state.discountTotal}</td>
              </tr>
              <tr>
                <td colspan="9" class="grand total">GRAND TOTAL</td>
                <td class="grand total">{"₹ " + this.state.invoiceTotal}</td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    )
  }
}



