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
      companyName: "",
      companyAddressLine1: "",
      companyAddressLine2: "",
      customerName: "",
      List:[],
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
        res.data.forEach((invoice)=>{
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



      })
  }
  componentWillMount() {
    let invoiceNo = this.getQuery('invoiceNo');
    console.log("invoiceNo", invoiceNo);
    this.getData(invoiceNo);
  }

  render() {
    return (
      <div>
        <header class="clearfix">
          <div id="logo">
            <img src={logo} />
          </div>
          <center>
            <div><b>Company Name</b><br />
              <h4>Limitless Mobilty Solution</h4>
            </div>
          </center>
          <h1> TAX-INVOICE</h1>
          <div id="company" class="clearfix">
            <div><b>shipped To</b></div>
            <div>455 Foggy Heights,<br /> AZ 85004, US</div>
            <div>(602) 519-0450</div>
            <div><a href="mailto:company@example.com">company@example.com</a></div>
          </div>
          <div id="project">
            <div><b>Billed To</b></div>
            <div><span>PROJECT</span> Website development</div>
            <div><span>CLIENT</span> John Doe</div>
            <div><span>ADDRESS</span> 796 Silver Harbour, TX 79273, US</div>
            <div><span>EMAIL</span> <a href="mailto:john@example.com">john@example.com</a></div>
            <div><span>DATE</span> August 17, 2015</div>
            <div><span>DUE DATE</span> September 17, 2015</div>
          </div>
        </header>
        <main>
          <table style={{ fontSize: '11px' }}>

                           <Table
                                tableHeaderColor="primary"
                                tableHead={["Name", "Quantity","Rate" ,"Total", "Discount","CGST Rate","CGST Amount","SGST Rate","SGST Amount","IGST Rate","IGST Amount"]}
                                tableData={this.state.List}
                            />
            <tbody>
              <tr>
                <td colspan="9">TAXABLE VALUE BEFORE TAX</td>
                <td class="total">$5,200.00</td>
              </tr>
              <tr>
                <td colspan="9">CGST</td>
                <td class="total">$1,300.00</td>
              </tr>
              <tr>
                <td colspan="9">SGST</td>
                <td class="total">$1,300.00</td>
              </tr>
              <tr>
                <td colspan="9">IGST</td>
                <td class="total">$1,300.00</td>
              </tr>
              <tr>
                <td colspan="9" class="grand total">GRAND TOTAL</td>
                <td class="grand total">$6,500.00</td>
              </tr>
            </tbody>
          </table>
          <div id="notices">
            <div>NOTICE:</div>
            <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
          </div>
        </main>

      </div>



    )
  }



}



