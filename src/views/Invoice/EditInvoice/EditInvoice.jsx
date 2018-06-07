import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Wizard, Steps, Step } from 'react-albus';
import { WithWizard } from 'react-albus';
import { Line } from 'rc-progress';
import './animation.css';
import './bootstrap.min.css';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';
import parse from 'form-parse';
import Autocomplete from "react-autocomplete";
import EditInvoiceStep2 from './EditInvoiceStep2';

var date, invoiceRow = [], deletedRows = 0, items = [], tempArray = [];
var query;

export default class EditInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            companyDropdownData: [],
            customerDropdownData: [],
            companyAddressLine1:"",
            companyAddressLine2:"",
            customerAddressLine1:"",
            customerAddressLine2:"",
            companyCode: "",
            companyName: "",
            companyState: "",
            customerCode: "",
            customerName: "",
            customerState: "",
            invoiceDate: "",
            invoiceNo: "",
            companySelected: false,
            customerSelected: false,
            check: false,
            showCgst: false,
            showIgst: false,
            showIgst: false
        }
    }
    getData = (param) => {
        if (param === "company") {
            axios
                .get("http://localhost:8080/getOneCompany?companyCode="+this.state.companyCode)
                .then((res) => {
                    console.log("response from /allCompany", res);
                    let tempData = [];
                    res.data.data.map((item, key) => {
                        tempData.push(item);
                    });
                    this.setState({
                        companyDropdownData: tempData
                    });
                })
        }
        if (param === "customer") {
            axios
                .get("http://localhost:8080/getOneCustomer?customerCode="+this.state.customerCode)
                .then((res) => {
                    console.log("response from /allCustomer", res);
                    let tempData = [];
                    res.data.data.map((item, key) => {
                        tempData.push(item);
                    });
                    this.setState({
                        customerDropdownData: tempData
                    });
                })
        }
    }
    setInitialDate = () => {
        date = new Date();
        let year = date.getFullYear();
        year = year.toString();
        let month = date.getMonth();
        month = month.toString();
        month++;
        month = this.padDigits(month, 2);
        let today = date.getDate();
        today = this.padDigits(today, 2);
        date = year + "-" + month + "-" + today;
        this.setState({
            invoiceDate: date
        })
    }
    
    padDigits = (number, digits) => {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }
    handleDropdown = (e, param) => {
        if (param == "company") {
            this.setState({
                companyCode: e.target.value,
                setAddressOfCompany: false
            })
        }
        if (param == "customer") {
            this.setState({
                customerCode: e.target.value,
                setAddressOfCustomer: false
            })
        }
    }
    handleInvoice = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    createInvoice = (e) => {
        e.preventDefault();
    }
    componentWillMount() {
        this.setInitialDate();
        this.getData("items");
        this.add();
    }
    handleInput = (e) => {
        e.preventDefault();

        this.setState({ companyName: e.target.value })
    }
    add = () => {
        var query=window.location.search.substring(window.location.search.indexOf("=")+1);
           this.setState({query:query});
          axios.get("http://localhost:8080/oneList?id="+query)
          .then((result) => {
              console.log(result,"medhaaa")
              result.data.data.map((item)=>{
                  this.setState({companyCode:item.companyCode}),
                  this.setState({companyState:item.companyState}),
                  this.setState({ companyAddressLine1:item. companyAddressLine1}),
                  this.setState({companyAddressLine2:item.companyAddressLine2}),
                  this.setState({customerCode:item.customerCode}),
                  this.setState({customerState:item.customerState}),
                  this.setState({customerAddressLine1:item.customerAddressLine1}),
                  this.setState({ customerAddressLine2:item. customerAddressLine2}),
                  this.setState({productCode:item.productCode}),
                  this.setState({taxCode:item.taxCode}),
                  this.setState({code:item.code}),
                  this.setState({itemName:item.itemName}),
                  this.setState({qty:item.qty}),
                  this.setState({ rate:item.rate}),
                  this.setState({total:item.total}),
                  this.setState({ discount:item.discount}),
                  this.setState({ invoiceDate:item.invoiceDate}),
                  this.setState({invoiceNo:item.invoiceNumber})
              })
              this.getData("company");
              this.getData("customer");
            //access the results here....
            console.log(result.data.data[0].items.CGSTRate,"arsfyw")
            result.data.data[0].items.forEach((items)=>{
              console.log(items,"hjhjh")
                this.setState({CGSTRate:items.CGSTRate}),
                this.setState({CGSTAmount:items.CGSTAmount}),
                this.setState({SGSTRate:items.SGSTRate}),
                this.setState({SGSTAmount:items.SGSSTAmount}),
                this.setState({IGSTRate:items.IGSTRate}),
                this.setState({IGSTAmount:items.IGSTAmount})
  
            })
           
               
                
              })
}
    componentDidUpdate() {
        this.state.companyDropdownData.map((item, key) => {
            if (this.state.setAddressOfCompany == false) {
                if (this.state.companyCode == item.companyCode) {
                    this.setState({
                        companyName: item.companyName,
                        companyAddressLine1: item.addressLine1,
                        companyAddressLine2: item.addressLine2,
                        companyGSTIN: item.companyGSTNo,
                        companyState: item.stateName,
                        setAddressOfCompany: true,
                        companySelected: true
                    })
                }
            }
        })
        this.state.customerDropdownData.map((item, key) => {
            if (this.state.setAddressOfCustomer == false) {
                if (this.state.customerCode == item.customerCode) {
                    this.setState({
                        customerName: item.customerName,
                        customerAddressLine1: item.addressLine1,
                        customerAddressLine2: item.addressLine2,
                        customerGSTIN: item.customerGSTNo,
                        customerState: item.stateName,
                        setAddressOfCustomer: true,
                        customerSelected: true
                    })
                }
            }
        })
    }
    render() {
        return (

            <form onSubmit={(e) => this.createInvoice(e)}>
                <Wizard>
                    <Steps>
                        <Step id="gandalf">
                            <WithWizard
                                render={({ next, previous, step, steps }) => (
                                    <div style={{ float: 'right' }}>
                                        {steps.indexOf(step) < steps.length - 1 && (
                                            <input
                                                type="submit"
                                                className="btn"
                                                onClick={next}
                                                value="Next"
                                            />
                                        )}
                                    </div>
                                )}
                            />
                            <div class="container">
                                <h2 className="text-align-center">Step 1</h2>
                                <hr />
                                <div style={{ textAlign: 'center' }}>
                                    {/* Company & Customer Headings */}
                                    <div className="row">
                                        <div className="col-sm">Company</div>
                                        <div className="col-sm">Customer</div>
                                        <hr />
                                    </div>
                                    {/* Company & Customer Dropdowns */}
                                    <div className="row">
                                        {/* Company Dropdown */}
                                        <div className="col-sm">
                                        <select disabled
                                                style={{ minWidth: '200px' }}
                                                onChange={(e, param) => this.handleDropdown(e, "company")}
                                                name="companyCode"
                                                
                                            >
                                                <option  value="">Select Company</option>
                                                {
                                                    this.state.companyDropdownData.map((item, index) => {
                                                        return <option selected name={item.companyName} value={item.companyCode} key={index} >{item.companyName}</option>
                                                    })
                                                }
                                            </select>
                                            
                                    
                                        </div>
                                        <div className="col-sm">
                                        <select disabled
                                                style={{ minWidth: '200px' }}
                                                onChange={(e, param) => this.handleDropdown(e, "customer")}
                                                name="customerCode"
                                            >
                                                <option>Select Customer</option>
                                                {
                                                    this.state.customerDropdownData.map((item, index) => {
                                                        return <option selected name={item.customerName} value={item.customerCode} key={index}>{item.customerName}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    {/* Address Labels */}
                                    <div className="row">
                                        <div className="col-sm">Address</div>
                                        <div className="col-sm">Address</div>
                                        <hr />
                                    </div>
                                    {/* Address Fields */}
                                    <div className="row">
                                        <div className="col-sm">
                                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} name="companyAddressLine1" value={this.state.companyAddressLine1} disabled /><br />
                                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} name="companyAddressLine2" value={this.state.companyAddressLine2} disabled />
                                        </div>
                                        <div className="col-sm">
                                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} name="customerAddressLine1" value={this.state.customerAddressLine1} disabled /><br />
                                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} name="customerAddressLine2" value={this.state.customerAddressLine2} disabled />
                                        </div>
                                    </div>
                                    <br />
                                    {/* Invoice Date and Number Labels */}
                                    <div className="row">
                                        <div className="col-sm">Invoice Date</div>
                                        <div className="col-sm">Invoice No.</div>
                                        <hr />
                                    </div>
                                    {/* Invoice Date and Number Fields */}
                                    <div className="row">
                                        <div className="col-sm">
                                            <input
                                                type="date"
                                                name="invoiceDate"
                                                className="invoiceDate"
                                                style={{ minWidth: '200px' }}
                                                defaultValue={date}
                                                onChange={this.handleInvoice}
                                                
                                            />
                                            <br />
                                            <label>(mm-dd-yyyy)</label>
                                        </div>
                                        <div className="col-sm">
                                            <input type="text" style={{ minWidth: '200px' }} name="invoiceNumber" value={this.state.invoiceNo} disabled />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <hr />
                            </div>
                        </Step>
                        <Step id="dumbledore">
                            <WithWizard
                                render={({ next, previous, step, steps }) => (
                                    <div style={{ float: 'right' }}>
                                        {steps.indexOf(step) > 0 && (
                                            <button className="btn" onClick={previous} >Back</button>
                                        )}
                                    </div>
                                )}
                            />
                            <EditInvoiceStep2 {...this.state} />
                        </Step>
                        {/* <Step id="ice king">
                            <WithWizard
                                render={({ next, previous, step, steps }) => (
                                    <div style={{ float: 'right' }}>
                                        {steps.indexOf(step) > 0 && (
                                            <button className="btn" onClick={previous} style={{ marginLeft: '5px' }}>Back</button>
                                        )}
                                    </div>
                                )}
                            />
                            <div></div>
                            <ViewInvoice {...this.state} />
                        </Step> */}
                    </Steps>
                </Wizard>
            </form>
        )
    }
}