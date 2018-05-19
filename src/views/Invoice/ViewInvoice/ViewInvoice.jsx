import React from "react";
import { Grid } from "material-ui";
import './style.css';
import logo from './logo.png'
// import dimension from './dimension'


// import { RegularCard, Table, ItemGrid } from "components";

export default class ViewInvoice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          companyName:"",
          companyAddressLine1:"",
          companyAddressLine2:"",
          customerName:"",

        };

    }


  render(){
      return(
    <div>
   <header class="clearfix">
      <div id="logo">
        <img src={logo}/>
      </div>
     <center>
       <div><b>Company Name</b><br/>
       <h4>Limitless Mobilty Solution</h4>
       </div>
      </center>
      <h1> TAX-INVOICE</h1>
      <div id="company" class="clearfix">
        <div><b>shipped To</b></div>
        <div>455 Foggy Heights,<br/> AZ 85004, US</div>
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
      <table style={{fontSize:'11px'}}>
        <thead>
          <tr>
            <th class="service">SERVICE</th>
            <th class="desc">Accounting Code</th>
            <th>QTY</th>
            <th>PRICE</th>
            <th>TOTAL</th>
            <th>DISCOUNT</th>
            <th>TAXABLE VALUE</th>
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
            <th></th>
            <th></th>
            <th style={{Position:"fixed"}}> 
              <th style={{position:'relative',left:"12px",borderBottom:"none"}}>Rate</th>
              <th style={{position:'relative',left:"15px",borderBottom:"none"}}>Amount</th>
              </th>
              <th style={{Position:"fixed"}}> 
              <th style={{position:'relative',left:"20px",borderBottom:"none"}}>Rate</th>
              <th style={{position:'relative',left:"30px",borderBottom:"none"}}>Amount</th>
              </th>
              <th style={{Position:"fixed"}}> 
              <th style={{position:'relative',left:"12px",borderBottom:"none"}}>Rate</th>
              <th style={{position:'relative',left:"15px",borderBottom:"none"}}>Amount</th>
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



