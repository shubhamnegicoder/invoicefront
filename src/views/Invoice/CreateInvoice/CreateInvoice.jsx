import React from "react";
import { Grid } from "material-ui";
import $ from 'jquery';
import superagent from 'superagent';
import swal from 'sweetalert';
import './bootstrap.min.css';
import parse from 'form-parse';
import axios from 'axios';

import { RegularCard, Button, CustomInput, ItemGrid, Table } from "components";

var invoiceRow = [], itemArray = [];

class CreateInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyCode: "",
            customerCode: "",
            companyAddressLine1: "",
            companyAddressLine2: "",
            customerAddressLine1: "",
            customerAddressLine2: "",
            code: "",
            name: "",
            qty: "",
            rate: "",
            total: "",
            discount: "",
            invoiceRow: [],
            dataArray: [],
            companyDropdownData: [],
            customerDropdownData: [],
            setAddressOfCompany: false,
            setAddressOfCustomer: false
        }
    }
    handleDropdown = (e) => {
        this.setState({
            companyCode: e.target.value,
            setAddressOfCompany: false
        })
    }
    handleDropdown2 = (e) => {
        this.setState({
            customerCode: e.target.value,
            setAddressOfCustomer: false
        })
    }
    getCompanyDropdownData = () => {
        axios
            .get("http://localhost:8080/allCompany")
            .then((res) => {
                let tempData = [];
                res.data.data.map((item, key) => {
                    tempData.push(item);
                });
                this.setState({
                    companyDropdownData: tempData
                });
            })
    }
    getCustomerDropdownData = () => {
        axios
            .get("http://localhost:8080/allCustomer")
            .then((res) => {
                let tempData = [];
                res.data.data.map((item, key) => {
                    tempData.push(item);
                });
                this.setState({
                    customerDropdownData: tempData
                });
            })
    }
    handleInvoice = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        for (var i = 0; i < invoiceRow.length; i++) {
            var qty = $('.qty' + i).val();
            var rate = $('.rate' + i).val();
            $('.total' + i).val(qty * rate);
        }
    }
    pushIntoArray = () => {
        itemArray.push({
            code: this.state.code,
            name: this.state.name,
            qty: this.state.qty,
            rate: this.state.rate,
            total: this.state.total,
            discount: this.state.discount
        });
    }
    addRow = (params) => {
        if (params == 2) {
            this.pushIntoArray();
            this.setState({
                dataArray: itemArray
            })
        }
        invoiceRow.push(
            <div>
                <hr />
                <div className="row">
                    <div className="col">
                        {invoiceRow.length + 1}
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name={"itemCode " + invoiceRow.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name={"itemName " + invoiceRow.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className={"form-control qty" + invoiceRow.length} name={"qty " + invoiceRow.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className={"form-control rate" + invoiceRow.length} name={"rate " + invoiceRow.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className={"form-control total" + invoiceRow.length} name={"total " + invoiceRow.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name={"discount " + invoiceRow.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                </div>
            </div>
        )
        this.setState({ invoiceRow: invoiceRow })
    }
    submitInvoice = (e) => {
        e.preventDefault();
        // let client = {
        //     companyName: this.state.
        // }
        var data = parse(e.target);
        console.log("Form Data", data);
        var finalArray = [];
        var temp = {};
        var limit = 1;
        var finalKey = '';
        for (var key in data) {
            finalKey = key.split(" ")[0];
            temp[finalKey] = data[key];
            if (limit == 6) {
                finalArray.push(temp);
                temp = {};
                limit = 0;
            }
            limit++;
        }
        let invoiceData = {
            item: finalArray
        }
        console.log("Invoice Data", invoiceData);
        superagent
            .post("http://localhost:8080/addInvoice")
            .send(invoiceData)
            .then((res) => {
                console.log("Response from Service", res);
                if (res.body.success) {
                    swal({
                        text: "Invoice Saved !",
                        icon: "success"
                    })
                }
            })
    }
    componentWillMount() {
        this.getCompanyDropdownData();
        this.getCustomerDropdownData();
        this.addRow();
    }
    componentDidUpdate() {
        this.state.companyDropdownData.map((item, key) => {
            if (this.state.setAddressOfCompany == false) {
                if (this.state.companyCode == item.companyCode) {
                    this.setState({
                        companyAddressLine1: item.addressLine1,
                        companyAddressLine2: item.addressLine2,
                        setAddressOfCompany: true
                    })
                }
            }
        })
        this.state.customerDropdownData.map((item, key) => {
            if (this.state.setAddressOfCustomer == false) {
                if (this.state.customerCode == item.customerCode) {
                    this.setState({
                        customerAddressLine1: item.addressLine1,
                        customerAddressLine2: item.addressLine2,
                        setAddressOfCustomer: true
                    })
                }
            }
        })
    }
    render() {
        return (
            <form onSubmit={this.submitInvoice}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="row">
                        <div className="col-sm">
                            <label>Company</label>
                        </div>
                        <div className="col-sm">
                            <label>Customer</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <select
                                style={{ minWidth: '200px' }}
                                onChange={this.handleDropdown}
                            >
                                <option>Select Company</option>
                                {
                                    this.state.companyDropdownData.map((item, index) => {
                                        return <option name={item.companyName} value={item.companyCode} key={index}>{item.companyName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm">
                            <select
                                style={{ minWidth: '200px' }}
                                onChange={this.handleDropdown2}
                            >
                                <option>Select Customer</option>
                                {
                                    this.state.customerDropdownData.map((item, index) => {
                                        return <option name={item.customerName} value={item.customerCode} key={index}>{item.customerName}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm">
                            <label>Address</label>
                        </div>
                        <div className="col-sm">
                            <label>Address</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} value={this.state.companyAddressLine1} /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} value={this.state.companyAddressLine2} />
                        </div>
                        <div className="col-sm">
                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} value={this.state.customerAddressLine1} /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} value={this.state.customerAddressLine2} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm">
                            <label>Invoice Date</label>
                        </div>
                        <div className="col-sm">
                            <label>Invoice No.</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <input type="date" style={{ minWidth: '200px' }} />
                        </div>
                        <div className="col-sm">
                            <input type="text" style={{ minWidth: '200px' }} />
                        </div>
                    </div>
                </div>
                <br />
                <hr />
                <div className="row">
                    <div className="col">
                        <label color="black">Serial No.</label>
                    </div>
                    <div className="col">
                        <label color="black">Item Code</label>
                    </div>
                    <div className="col">
                        <label color="black">Item Name</label>
                    </div>
                    <div className="col">
                        <label color="black">Quantity</label>
                    </div>
                    <div className="col">
                        <label color="black">Rate</label>
                    </div>
                    <div className="col">
                        <label color="black">Total</label>
                    </div>
                    <div className="col">
                        <label color="black">Discount</label>
                    </div>
                </div>
                {
                    invoiceRow.map((item, key) => {
                        return item
                    })
                }
                <br />
                <div className="row">
                    <div className="col-8">
                        <input type="button" onClick={() => this.addRow(2)} value="Add Row" />
                    </div>
                    <div className="col-4">
                        <input type="submit" value="Create Invoice" style={{ float: 'right' }} />
                    </div>
                </div>
            </form >
        );
    }
}

export default CreateInvoice;