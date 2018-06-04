import React from "react";
// import ReactToPrint from "react-to-print";
// import PrintTemplate from 'react-print';
import { Grid } from "material-ui";
import './style.css';
import logo from './logo.png'
import axios from 'axios';
import { RegularCard, Table, ItemGrid } from "components";
import $ from 'jquery';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
class ViewInvoice extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      invoiceNo: "",
      data: [],
      logo: "",
      type:"",
      companyName: "",
      companyAddress: "",
      companyGSTIN: "",
      customerName: "",
      List:[],
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
  
  
  getData = (invoiceNo,type) => {
    axios
      .get("http://localhost:8080/allInvoice?id=" + this.state.id + "&invoiceNumber=" + invoiceNo)
      .then((res) => {
        console.log("response from /allInvoice", res.data.data[0]);
        var mainArray = [];
        res.data.data[0].items.forEach((invoice) => {
          var dataArray = [];
          dataArray.push(invoice.name)
          dataArray.push(invoice.hsn)
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
          companyGSTIN: res.data.data[0].companyGSTIN,
          invoiceNo: invoiceNo,
          invoiceDate: invoiceDate,
          customerName: res.data.data[0].customerName,
          customerAddress: res.data.data[0].customerAddressLine1 + " " + res.data.data[0].customerAddressLine2,
          customerGSTIN: res.data.data[0].customerGSTIN,
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
      // if(type=="listinvoice"){
         
           
      //  this.printDocument()

      // }
  }
  print = () => {
    $('.printButton').hide();
    window.print();
    $('.printButton').show();
  }

  
  printDocument=()=> {
    const input = document.getElementById('container');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm',[297,210]);
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }
       
  componentWillMount() {
    let invoiceNo = this.getQuery('invoiceNo');
    var type=this.getQuery('type')
    this.setState({type:type})
    // console.log(type,"kkkkkkkkkkk")
    this.getData(invoiceNo,type);
   
  }
  componentDidMount(){
    
    if( this.state.type == "listinvoice"){

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
      
      <div id="container" class="container-fluid">
       <canvas id="canvas" width="600" height="200"></canvas>
        <div class="row">
          <div class="col-4">
            <div id="logo">
              <img src={"uploads/" + this.state.logo} />
            </div>
          </div>
          <div class="col-8">
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
          <div class="col">
            <label>Item Name</label>
          </div>
          <div class="col">
            <label>HSN Code</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>Qty.</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>Rate</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>Total</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>Discount</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>CGST Rate</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>CGST Amount</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>SGST Rate</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>SGST Amount</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>IGST Rate</label>
          </div>
          <div class="col" style={{ textAlign: 'right' }}>
            <label>IGST Amount</label>
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
          <div class="col" style={{ textAlign: 'right' }}>Total value before Tax&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.itemTotal}</div>
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
          <button className="printButton btn btn-primary" onClick={this.printDocument}>Print</button>
        </div>
      </div>
      //--------
      // <div class="table-responsive">
      //   <table class="table">
      //     <tr>
      //       <td colspan="2" style={{ border: '1px solid black' }}>
      //         <div id="logo" style={{ float: 'left' }}>
      //           <img src={"uploads/" + this.state.logo} />
      //         </div>
      //       </td>
      //       <td colspan="8" style={{ border: '1px solid black' }}>
      //         <div >
      //           <center>
      //             <h4>{this.state.companyName}</h4>
      //             {"GSTIN: " + this.state.companyGSTIN}
      //           </center>
      //         </div>
      //       </td>
      //     </tr>
      //   </table>
      // </div>
      // ----------
      // <div>
      //   <table style={{ backgroundColor: 'white' }}>
      //     <tr>
      //       <td style={{ width: '10%' }}>
      //         <div id="logo" style={{ float: 'left' }}>
      //           <img src={"uploads/" + this.state.logo} />
      //         </div>
      //       </td>
      //       <td>
      //         <div>
      //           <center>
      //             <div>
      //               <h4>{this.state.companyName}</h4>
      //             </div>
      //             <div>{this.state.companyAddress}</div>
      //             <div>{"GSTIN: " + this.state.companyGSTIN}</div>
      //           </center>
      //         </div>
      //       </td>
      //     </tr>
      //   </table>
      //   <header class="clearfix">
      //     <h1>TAX-INVOICE</h1>
      //   </header>
      //   <table>
      //     <tr>
      //       <td style={{ textAlign: 'left' }}>
      //         <div >
      //           <div>
      //             <b>Invoice Date</b></div>
      //           <div>
      //             {this.state.invoiceDate}
      //           </div>
      //         </div>
      //       </td>
      //       <td>
      //         <div>
      //           <div>
      //             <b>Invoice Number</b></div>
      //           <div>
      //             {this.state.invoiceNo}
      //           </div>
      //         </div>
      //       </td>
      //     </tr>
      //   </table>
      //   <table>
      //     <tr>
      //       <td style={{ textAlign: 'left' }}>
      //         <div >
      //           <div>
      //             <b>Billed To</b></div>
      //           <div>
      //             {this.state.customerName}
      //           </div>
      //           <div>
      //             {this.state.customerAddress}
      //           </div>
      //           <div>{"GSTIN / UIN: " + this.state.customerGSTIN}</div>
      //         </div>
      //       </td>
      //       <td>
      //         <div>
      //           <div>
      //             <b>Shipped To</b></div>
      //           <div>
      //             {this.state.customerName}
      //           </div>
      //           <div>
      //             {this.state.customerAddress}
      //           </div>
      //           <div>{"GSTIN / UIN: " + this.state.customerGSTIN}</div>
      //         </div>
      //       </td>
      //     </tr>
      //   </table>
      //   <main>
      //     <table style={{ fontSize: '11px' }}>
      //       <Table
      //         tableHeaderColor="gray"
      //         tableHead={["Name", "HSN Code / Accounting Code", "Quantity", "Rate", "Total", "Discount", "CGST Rate", "CGST Amount", "SGST Rate", "SGST Amount", "IGST Rate", "IGST Amount"]}
      //         tableData={this.state.List}
      //         className="table"
      //       />
      //       <tr>
      //         <td class="total"><b>TOTAL VALUE BEFORE TAX &nbsp;&nbsp;{"₹ " + this.state.itemTotal}</b></td>
      //       </tr>
      //       <tr>
      //         <td class="total"> <b>CGST &nbsp;&nbsp;{"₹ " + this.state.cgstTotal}</b></td>
      //       </tr>
      //       <tr>
      //         <td class="total"><b>SGST&nbsp;&nbsp;{"₹ " + this.state.sgstTotal}</b></td>
      //       </tr>
      //       <tr>
      //         <td class="total"><b>IGST&nbsp;&nbsp;{"₹ " + this.state.igstTotal}</b></td>
      //       </tr>
      //       <tr>
      //         <td class="total"><b>TOTAL VALUE AFTER TAX&nbsp;&nbsp;{"₹ " + this.state.invoiceTotal}</b></td>
      //       </tr>
      //       <tr>
      //         <td class="total"><b>rounding off&nbsp;&nbsp;{"- " + (parseFloat(this.state.invoiceTotal) - parseInt(this.state.invoiceTotal)).toFixed(2)}</b></td>
      //       </tr>
      //       <tr>
      //         <td class="total"><b>TOTAL DISCOUNT&nbsp;&nbsp;{"₹ " + this.state.discountTotal}</b></td>
      //       </tr>
      //       <tr>
      //         <td class="grand total">
      //           <div style={{ textAlign: 'left', float: 'left' }}>
      //             <b>Total Amount in Words :&nbsp;&nbsp;{this.convertNumberToWords(this.state.invoiceTotal)}</b>
      //           </div>

      //           <div style={{ textAlign: 'left', float: 'right' }}>
      //             <b>GRAND TOTAL&nbsp;&nbsp;{"₹ " + parseInt(this.state.invoiceTotal)}</b>
      //           </div>
      //         </td>
      //       </tr>
      //     </table>
      //     <table>
      //       <tr>
      //         <td>Signature</td>
      //         <td></td>
      //       </tr>
      //       <tr>
      //         <td>Signatory</td>
      //         <td></td>
      //       </tr>
      //       <tr>
      //         <td>Designation / Status</td>
      //         <td></td>
      //       </tr>
      //       <tr>
      //         <td>
      //           <center>
      //             <button className="printButton btn btn-primary" onClick={this.print}>Print</button>
      //           </center>
      //         </td>
      //       </tr>
      //     </table>
      //   </main>
      // </div>
    )
  }
}

// class Example extends React.Component {
//   render() {
//     return (
//       <div>
//         <ReactToPrint
//           trigger={() => <a href="#">Print this out!</a>}
//           content={() => this.componentRef}
//         />
//         <ViewInvoice ref={el => (this.componentRef = el)} />
//       </div>
//     );
//   }
// }

export default ViewInvoice;