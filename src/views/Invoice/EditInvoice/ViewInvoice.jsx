import React from 'react';
import './style.css';

export default class ViewInvoice extends React.Component {
  render() {
    return (
      <div id="container" class="container-fluid">
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
          <button className="printButton btn btn-primary" onClick={this.print}>Print</button>
        </div>
      </div>
    )
  }
}