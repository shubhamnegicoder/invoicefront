import React from "react";
import { Grid } from "material-ui";
import './style.css';
import logo from './logo.png'
import axios from 'axios';
import { RegularCard, Table, ItemGrid } from "components";
import $ from 'jquery';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


var type;
var base64Img = null;
var margins = {
  top: 70,
  bottom: 40,
  left: 30,
  width: 550
};

class ViewInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      invoiceNo: "",
      data: [],
      logo: "",
      type: "",
      companyName: "",
      companyAddress: "",
      companyGSTIN: "",
      customerName: "",
      List: [],
      customerAddress: "",
      customerGSTIN: "",
      List: [],
      itemTotal: "",
      cgstTotal: "",
      sgstTotal: "",
      igstTotal: "",
      discountTotal: "",
      invoiceTotal: "",
      buttonView: true
    };
  }
  convertNumberToWords = (amount) => {
    var words = new Array();
    var value;
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++ , j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + parseInt(n_array[j]);
            n_array[i] = 0;
          }
        }
      }
      value = "";
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          value = n_array[i] * 10;
        } else {
          value = n_array[i];
        }
        if (value != 0) {
          words_string += words[value] + " ";
        }
        if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Crores ";
        }
        if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Lakhs ";
        }
        if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Thousand ";
        }
        if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
          words_string += "Hundred and ";
        } else if (i == 6 && value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    return words_string;
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
  getData = (invoiceNo, type) => {
    axios
      .get("http://localhost:8080/allInvoice?id=" + this.state.id + "&invoiceNumber=" + invoiceNo)
      .then((res) => {
        console.log("response from /allInvoice", res.data.data[0]);
        var mainArray = [];
        res.data.data[0].items.forEach((invoice) => {
          var dataArray = [];
          dataArray.push(invoice.itemName)
          dataArray.push(invoice.itemHsn)
          dataArray.push(invoice.itemQty)
          dataArray.push(invoice.itemRate)
          dataArray.push(invoice.itemTotal)
          dataArray.push(invoice.itemDiscount)
          dataArray.push(invoice.cgstRate)
          dataArray.push(invoice.cgstAmount)
          dataArray.push(invoice.sgstRate)
          dataArray.push(invoice.sgstAmount)
          dataArray.push(invoice.igstRate)
          dataArray.push(invoice.igstAmount)
          mainArray.push(dataArray)
        })
        console.log("mainArray", mainArray);
        let invoiceDate = (res.data.data[0].invoiceDate).toString();
        invoiceDate = invoiceDate.split("T", 1);
        invoiceDate = invoiceDate[0];
        this.setState({
          logo: res.data.data[0].logo,
          companyName: res.data.data[0].companyName,
          companyAddress: res.data.data[0].companyAddressLine1 + " " + res.data.data[0].companyAddressLine2,
          companyGSTIN: res.data.data[0].companyGSTIN,
          invoiceNo: invoiceNo,
          invoiceDate: invoiceDate,
          customerName: res.data.data[0].customerName,
          customerAddress: res.data.data[0].customerAddressLine1 + " " + res.data.data[0].customerAddressLine2,
          customerGSTIN: res.data.data[0].customerGSTIN,
          subTotal: res.data.data[0].subTotal,
          cgstTotal: res.data.data[0].cgstTotal,
          sgstTotal: res.data.data[0].sgstTotal,
          igstTotal: res.data.data[0].igstTotal,
          discountTotal: res.data.data[0].discountTotal,
          invoiceTotal: res.data.data[0].invoiceTotal,
          List: mainArray
        })
        console.log("states", this.state);
      })
    type = this.getQuery('type')
    this.setState({ type: type })
  }
  print = () => {
    $('.printButton').hide();
    window.print();
    $('.printButton').show();
  }
  printDocument = () => {

    const input = document.getElementById('container');
    html2canvas(input)
      .then((canvas) => {
        var imgWidth = 190;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        var position = 0;
        const imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('p', 'mm', 'a4');
        var options = {
          pagesplit: true
        };
        doc.addImage(imgData, 'JPEG', 10, 0, imgWidth, pageHeight);
     

        doc.save(this.state.invoiceNo);

      })
  }



  componentWillMount() {
    let invoiceNo = this.getQuery('invoiceNumber');
    // console.log(type,"kkkkkkkkkkk")
    this.getData(invoiceNo, type);
  }
  componentDidUpdate() {
    if (this.state.type == "listinvoice") {
      this.printDocument()
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
        <div id="container" class="container-fluid" style={{ padding: '20px', border: '1px solid black' }}>
          <div class="row">
            <div class="col-5">
              <div id="logo" style={{ marginRight: '210px' }}>
                <img src={"uploads/" + this.state.logo} />
              </div>
            </div>
            <div class="col-7">
              {/* <center> */}
              <h3>{this.state.companyName}</h3>
              {this.state.companyAddress}<br />
              <div>
                <label style={{ color: 'black' }}>GSTIN : </label>
                {this.state.companyGSTIN}
              </div>
              {/* </center> */}
            </div>
          </div>
          <br />
          <div class="row">
            <hr />
            <div style={{ width: '100%' }}>
              <h1>TAX-INVOICE</h1>
            </div>
            <hr />
          </div>
          <br />
          <div class="row">
            <div class="col-6">
              <b>Invoice Date</b>
              <div>
                {this.state.invoiceDate}
              </div>
            </div>
            <div class="col-6" style={{ textAlign: 'right' }}>
              <b>Invoice No.</b>
              <div>
                {this.state.invoiceNo}
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-6">
              <b>Billed To</b>
              <div>
                {this.state.customerName}
              </div>
              <div>
                {this.state.customerAddress}
              </div>
              <div>
                GSTIN : {this.state.customerGSTIN}
              </div>
            </div>
            <div class="col-6" style={{ textAlign: 'right' }}>
              <b>Shipped To</b>
              <div>
                {this.state.customerName}
              </div>
              <div>
                {this.state.customerAddress}
              </div>
              <div>
                GSTIN : {this.state.customerGSTIN}
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col"><b>Item Name</b></div>
            <div class="col"><b>HSN Code</b></div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>Qty.</b>
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>Rate</b>
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>Total</b>
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>Discount</b>
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>CGST Rate</b>
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>CGST Amount</b>
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>SGST Rate</b>
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>SGST Amount</b>
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>IGST Rate</b>
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              <b>IGST Amount</b>
            </div>
          </div >
          <hr />
          {this.state.List.map((item, key) => {
            return (
              <div>
                <div class="row">
                  <div class="col">{item[0]}</div>
                  <div class="col">{item[1]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[2]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[3]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[4]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[5]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[6]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[7]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[8]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[9]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[10]}</div>
                  <div class="col" style={{ textAlign: 'right' }}>{item[11]}</div>
                </div>
                <hr />
              </div>
            )
          })}
          <div class="row">
            <div class="col-12"></div>
            <div class="col" style={{ textAlign: 'right' }}>Total value before Tax&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.subTotal}</div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12"></div>
            <div class="col" style={{ textAlign: 'right' }}>Total discount&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.discountTotal}</div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12"></div>
            <div class="col" style={{ textAlign: 'right' }}>CGST&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.cgstTotal}</div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12"></div>
            <div class="col" style={{ textAlign: 'right' }}>SGST&nbsp;&nbsp;:&nbsp;&nbsp;{parseFloat(this.state.sgstTotal).toFixed(2)}</div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12"></div>
            <div class="col" style={{ textAlign: 'right' }}>IGST&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.igstTotal}</div>
          </div>
          <hr />
          <div class="row">
            <div class="col" style={{ textAlign: 'left' }}>
              Total amount in words&nbsp;&nbsp;:&nbsp;&nbsp;{this.convertNumberToWords(this.state.invoiceTotal)}
            </div>
            <div class="col" style={{ textAlign: 'right' }}>
              Total Invoice Value&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.invoiceTotal}
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-8" style={{ textAlign: 'right' }}>Signature</div>
            <div class="col-4">:</div>
          </div>
          <br />
          <div class="row">
            <div class="col-8" style={{ textAlign: 'right' }}>Name of the Signatory</div>
            <div class="col-4" >:</div>
          </div>
          <br />
          <div class="row">
            <div class="col-8" style={{ textAlign: 'right' }}>Designation / Status</div>
            <div class="col-4">:</div>
          </div>
          <hr />
          <div class="row">

          </div>

        </div>
        <button className="printButton btn btn-primary" style={{backgroundColor: "#76323f", color: "white"}} onClick={this.printDocument}>Save as PDF</button>
      </div >
    )
  }
}

export default ViewInvoice;