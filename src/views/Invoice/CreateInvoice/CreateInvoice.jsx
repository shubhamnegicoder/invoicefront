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
import CreateInvoiceStep2 from './CreateInvoiceStep2';
import ViewInvoice from './ViewInvoice';
import swal from 'sweetalert';
import parse from 'form-parse';

var date;
var invoiceRow = [], deletedRows = 0, items = [], tempArray = [];

export default class CreateInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            companyDropdownData: [],
            customerDropdownData: [],
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
                .get("http://localhost:8080/allCompany?id=" + this.state.id)
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
                .get("http://localhost:8080/allCustomer")
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
    setInvoiceNo = () => {
        date = new Date();
        let year = date.getFullYear();
        year = year.toString();
        let month = date.getMonth();
        month = month.toString();
        month++;
        month = this.padDigits(month, 2);
        let invoiceNoPart1 = year + month;
        axios
            .get("http://localhost:8080/countInvoice2?id=" + this.state.id)
            .then((res) => {
                console.log("response from /countInvoice2", res);
                let invoiceNoPart2 = res.data.data + 1;
                invoiceNoPart2 = this.padDigits(invoiceNoPart2, 4);
                let invoiceNo = invoiceNoPart1 + invoiceNoPart2;
                invoiceNo = parseInt(invoiceNo);
                this.setState({
                    invoiceNo: invoiceNo
                })
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
        this.getData("company");
        this.getData("customer");
        this.setInvoiceNo();
        this.setInitialDate();
        this.getData("items");
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
                                                onClick={this.state.companySelected && this.state.customerSelected ? next : ""}
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
                                            <input type="text" list="company"
                                                style={{ minWidth: '200px' }}
                                                onChange={(e, param) => this.handleDropdown(e, "company")}
                                                name="companyCode"
                                                required
                                            />
                                            <datalist id="company">
                                                {
                                                    this.state.companyDropdownData.map((item, index) => {
                                                        return <option name={item.companyName} value={item.companyCode} key={index} >{item.companyName}</option>
                                                    })
                                                }
                                            </datalist>
                                        </div>
                                        <div className="col-sm">
                                            <input type="text" list="customer"
                                                style={{ minWidth: '200px' }}
                                                onChange={(e, param) => this.handleDropdown(e, "customer")}
                                                name="customerCode"
                                                required
                                            />
                                            <datalist id="customer">
                                                {
                                                    this.state.customerDropdownData.map((item, index) => {
                                                        return <option name={item.customerName} value={item.customerCode} key={index} >{item.customerName}</option>
                                                    })
                                                }
                                            </datalist>
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
                                                required
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
                            <CreateInvoiceStep2 {...this.state} />
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