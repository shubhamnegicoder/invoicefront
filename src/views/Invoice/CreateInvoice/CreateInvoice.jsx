import React from "react";
import { Grid } from "material-ui";
import $ from 'jquery';
import superagent from 'superagent';
import swal from 'sweetalert';
import './bootstrap.min.css';
import parse from 'form-parse';
import axios from 'axios';

import { RegularCard, Button, CustomInput, ItemGrid, Table } from "components";

var invoiceRow = [], parsedData = {}, items = [];
var invoiceNoPart1, invoiceNoPart2, invoiceNo, deletedRows = 0;

class CreateInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            companyCode: "",
            companyState: "",
            companyAddressLine1: "",
            companyAddressLine2: "",
            companyGSTIN: "",
            customerCode: "",
            customerState: "",
            customerAddressLine1: "",
            customerAddressLine2: "",
            customerGSTIN: "",
            productCode: "",
            taxCode: "",
            code: "",
            itemName: "",
            qty: "",
            rate: "",
            total: "",
            discount: "",
            cgst: "",
            invoiceRow: [],
            companyDropdownData: [],
            customerDropdownData: [],
            itemsDropdownData: [],
            taxData: [],
            setAddressOfCompany: false,
            setAddressOfCustomer: false,
            check: false,
            check2: false,
            check3: false,
            invoiceNo: 0
        }
    }
    padDigits = (number, digits) => {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }
    getCount = () => {
        var date = new Date();
        var year = date.getFullYear();
        year = year.toString();
        var month = date.getMonth();
        month = month.toString();
        month++;
        month = this.padDigits(month, 2);
        invoiceNoPart1 = year + month;
        axios
            .get("http://localhost:8080/countInvoice?id=5af170d60c06c02559273df1")
            .then((res) => {
                // console.log("response from /countInvoice", res);
                invoiceNoPart2 = res.data.data + 1;
                invoiceNoPart2 = this.padDigits(invoiceNoPart2, 4);
                invoiceNo = invoiceNoPart1 + invoiceNoPart2;
                invoiceNo = parseInt(invoiceNo);
                this.setState({
                    invoiceNo: invoiceNo
                })
            })
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
        if (param == "items") {
            let eo = $(e.target).attr('id');
            let i = eo.slice(6);
            var tempTaxCode;
            this.state.itemsDropdownData.map((item, key) => {
                if (e.target.value == item.productCode) {
                    tempTaxCode = item.taxCode;
                    $('.name' + i).val(item.productName);
                    $('.hsn' + i).val(item.taxCode);
                    $('.rate' + i).val(item.rate);
                    this.setState({
                        taxCode: item.taxCode
                    })
                }
            })
            this.setState({
                productCode: e.target.value,
                check2: true
            })
            if (this.state.companyState == this.state.customerState) {
                this.state.taxData.map((item, key) => {
                    if (item.taxCode == tempTaxCode) {
                        $('.cgstrate' + i).val(item.cgst);
                        $('.sgstrate' + i).val(item.sgst);
                        $('.igstrate' + i).val(0);
                    }
                })
            }
            else {
                this.state.taxData.map((item, key) => {
                    if (item.taxCode == tempTaxCode) {
                        $('.igstrate' + i).val(item.igst);
                        $('.cgstrate' + i).val(0);
                        $('.sgstrate' + i).val(0);
                    }
                })
            }
        }
    }
    getCompanyDropdownData = () => {
        axios
            .get("http://localhost:8080/allCompany?id="+this.state.id)
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
    getCustomerDropdownData = () => {
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
    getItemDropdownData = () => {
        axios
            .get("http://localhost:8080/allProduct?id=" + this.state.id)
            .then((res) => {
                console.log("response from /allProduct", res);
                let tempData = [];
                res.data.data.map((item, key) => {
                    tempData.push(item);
                });
                this.setState({
                    itemsDropdownData: tempData,
                    check: true
                });
            })
    }
    getTaxData = () => {
        axios
            .get("http://localhost:8080/allTax?id=" + this.state.id)
            .then((res) => {
                console.log("response from /allTax", res);
                let tempData = [];
                res.data.data.map((item, key) => {
                    tempData.push(item);
                });
                this.setState({
                    taxData: tempData
                });
            })
    }
    handleInvoice = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addRow = (params) => {
        invoiceRow.push(
            <div style={{ marginTop: '5px' }}>
                <div
                    className={"row row" + invoiceRow.length}
                    id={"btn_" + this.state.invoiceRow.length}
                >
                    {/* <div className="col">
                        {tempLength}
                    </div> */}
                    <div className="col">
                        <select
                            id={"select" + invoiceRow.length}
                            name={"itemCode"+invoiceRow.length}
                            className="form-control"
                            onChange={(e, param) => this.handleDropdown(e, "items")}
                            required
                        >
                            <option>---</option>
                            {
                                this.state.itemsDropdownData.map((item, index) => {
                                    return <option name={item.productName} value={item.productCode} key={index}>{item.productCode}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className={"form-control name" + this.state.invoiceRow.length}
                            name={"itemName" + invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                            readOnly
                        />
                    </div>
                    <div className="col" style={{ marginLeft: '7px' }}>
                        <input
                            type="text"
                            className={"form-control hsn" + this.state.invoiceRow.length}
                            name={"hsn" + invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                            readOnly
                        />
                    </div>
                    <div className="col" style={{ marginLeft: '15px' }}>
                        <input
                            type="text"
                            className={"form-control qty" + this.state.invoiceRow.length}
                            name={"qty" + invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                            required
                            pattern="^[0-9]*$"
                            title="Number only"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className={"form-control rate" + this.state.invoiceRow.length}
                            name={"rate" + invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                            readOnly
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className={"form-control total" + this.state.invoiceRow.length}
                            name={"total" + invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                            readOnly
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className={"form-control discount" + this.state.invoiceRow.length}
                            name={"discount" + this.state.invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                            defaultValue={0}
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name={"CGSTRate" + this.state.invoiceRow.length}
                            className={"form-control cgstrate" + invoiceRow.length}
                            readOnly
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name={"CGSTAmount" + this.state.invoiceRow.length}
                            className={"form-control cgstamnt" + invoiceRow.length}
                            readOnly
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name={"SGSTRate" + this.state.invoiceRow.length}
                            className={"form-control sgstrate" + invoiceRow.length}
                            readOnly
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name={"SGSTAmount" + this.state.invoiceRow.length}
                            className={"form-control sgstamnt" + invoiceRow.length}
                            readOnly
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name={"IGSTRate" + this.state.invoiceRow.length}
                            className={"form-control igstrate" + invoiceRow.length}
                            readOnly
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name={"IGSTAmount" + this.state.invoiceRow.length}
                            className={"form-control igstamnt" + invoiceRow.length}
                            readOnly
                            required
                        />
                    </div>
                    <div className="col">
                        <button
                            className="btn btn-danger"
                            id={"btn_" + this.state.invoiceRow.length}
                            value={"btn_" + this.state.invoiceRow.length}
                            onClick={this.removeRow}
                        >x
                    </button>
                    </div>
                </div>
            </div>
        )
        this.setState({
            invoiceRow: invoiceRow,
            check: false
        })
    }
    removeRow = (e) => {
        let target = e.target.value.split("_");
        let targetIndex = target[1];
        delete invoiceRow[targetIndex];
        this.setState({
            invoiceRow: invoiceRow
        })
        deletedRows++;
    }
    submitInvoice = (e) => {
        e.preventDefault();
        parsedData = parse(e.target);
        console.log(parsedData,"parsed")
        this.setState({
            invoiceNo: parsedData.invoiceNumber
        })
        let item = {};
        for (var i = 0; i < invoiceRow.length; i++) {
            item.itemCode=parsedData["itemCode"+i];
            item.name = parsedData["itemName" + i];
            item.hsn = parsedData["hsn" + i];
            item.qty = parsedData["qty" + i];
            item.rate = parsedData["rate" + i];
            item.total = parsedData["total" + i];
            item.discount = parsedData["discount" + i];
            item.CGSTRate = parsedData["CGSTRate" + i];
            item.CGSTAmount = parsedData["CGSTAmount" + i];
            item.SGSTRate = parsedData["SGSTRate" + i];
            item.SGSTAmount = parsedData["SGSTAmount" + i];
            item.IGSTRate = parsedData["IGSTRate" + i];
            item.IGSTAmount = parsedData["IGSTAmount" + i];
            items.push(item);
            item = {};
        }
        items = items.filter(item => item.name != undefined);
        var finalData = {
            id: this.state.id,
            companyCode: parsedData.companyCode,
            companyAddressLine1: parsedData.companyAddressLine1,
            companyAddressLine2: parsedData.companyAddressLine2,
            companyGSTIN: this.state.companyGSTIN,
            customerCode: parsedData.customerCode,
            customerAddressLine1: parsedData.customerAddressLine1,
            customerAddressLine2: parsedData.customerAddressLine2,
            customerGSTIN: this.state.customerGSTIN,
            invoiceDate: parsedData.invoiceDate,
            invoiceNumber: parsedData.invoiceNumber,
            items: items,
            itemTotal: parsedData.itemTotal,
            discountTotal: parsedData.discountTotal,
            cgstTotal: parsedData.cgstTotal,
            sgstTotal: parsedData.sgstTotal,
            igstTotal: parsedData.igstTotal,
            taxTotal: parsedData.taxTotal,
            invoiceTotal: parsedData.invoiceTotal
        }
        console.log("Data sent", finalData);
        if (this.validation(finalData) == true) {
            superagent
                .post("http://localhost:8080/addInvoice")
                .send(finalData)
                .then((res) => {
                    if (res.body.success) {
                        swal({
                            text: "Invoice Saved !",
                            icon: "success"
                        }).then(() => {
                            window.location.href = "./viewInvoice?id=" + this.state.id + "&invoiceNo=" + this.state.invoiceNo;
                        })
                    }
                })
        }
    }
    validation = (data) => {
        if (data.companyAddressLine1 == "" || data.companyAddressLine2 == "") {
            alert("Please select Company from dropdown !");
            return false;
        }
        if (data.customerAddressLine1 == "" || data.customerAddressLine2 == "") {
            alert("Please select Customer from dropdown !");
            return false;
        }
        else {
            return true;
        }
    }
    componentWillMount() {
        this.getCompanyDropdownData();
        this.getCustomerDropdownData();
        this.getItemDropdownData();
        this.getTaxData();
        this.getCount();
         
    }
    componentWillUnmount() {
        window.location.reload();
    }
    componentDidUpdate() {
        this.state.companyDropdownData.map((item, key) => {
            if (this.state.setAddressOfCompany == false) {
                if (this.state.companyCode == item.companyCode) {
                    this.setState({
                        companyAddressLine1: item.addressLine1,
                        companyAddressLine2: item.addressLine2,
                        companyGSTIN: item.companyGSTNo,
                        companyState: item.stateName,
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
                        customerGSTIN: item.customerGSTNo,
                        customerState: item.stateName,
                        setAddressOfCustomer: true
                    })
                }
            }
        })
        for (var i = 0; i < invoiceRow.length; i++) {
            let itemTotal = 0;
            let discountTotal = 0;
            let cgstTotal = 0;
            let sgstTotal = 0;
            let igstTotal = 0;
            var qty = $('.qty' + i).val();
            var rate = $('.rate' + i).val();
            var total = qty * rate;
            var cgstrate = $('.cgstrate' + i).val();
            var sgstrate = $('.sgstrate' + i).val();
            var igstrate = $('.igstrate' + i).val();
            var cgstamnt = (total * (cgstrate / 100));
            var sgstamnt = (total * (sgstrate / 100));
            var igstamnt = (total * (igstrate / 100));
            $('.total' + i).val(total);
            $('.cgstamnt' + i).val(cgstamnt);
            $('.sgstamnt' + i).val(sgstamnt);
            $('.igstamnt' + i).val(igstamnt);
            for (var j = 0; j <= i + deletedRows; j++) {
                if (!(isNaN($('.total' + j).val()))) {
                    itemTotal += parseFloat($('.total' + j).val());
                    discountTotal += parseFloat($('.discount' + j).val());
                    cgstTotal += parseFloat($('.cgstamnt' + j).val());
                    sgstTotal += parseFloat($('.sgstamnt' + j).val());
                    igstTotal += parseFloat($('.igstamnt' + j).val());
                }
            }
            $('.itemTotal').val(itemTotal);
            $('.discountTotal').val(discountTotal);
            $('.cgstTotal').val(cgstTotal);
            $('.sgstTotal').val(sgstTotal);
            $('.igstTotal').val(igstTotal);
            $('.taxTotal').val(cgstTotal + sgstTotal + igstTotal);
            let itemsTotal = parseFloat($('.itemTotal').val());
            let taxTotal = parseFloat($('.taxTotal').val());
            $('.invoiceTotal').val(itemsTotal - discountTotal + taxTotal);
        }
    }
    render() {
        return (
            <form onSubmit={this.submitInvoice}>
                {this.state.check ? this.addRow() : ""}
                <hr />
                <div style={{ textAlign: 'center' }}>
                    {/* Company & Customer Headings */}
                    <div className="row">
                        <div className="col-sm">
                            <label>Company</label>
                        </div>
                        <div className="col-sm">
                            <label>Customer</label>
                        </div>
                    </div>
                    {/* Company & Customer Dropdowns */}
                    <div className="row">
                        {/* Company Dropdown */}
                        <div className="col-sm">
                            <select
                                style={{ minWidth: '200px' }}
                                onChange={(e, param) => this.handleDropdown(e, "company")}
                                name="companyCode"
                            >
                                <option>Select Company</option>
                                {
                                    this.state.companyDropdownData.map((item, index) => {
                                        return <option name={item.companyName} value={item.companyCode} key={index}>{item.companyName}</option>
                                    })
                                }
                            </select>
                        </div>
                        {/* Customer Dropdown */}
                        <div className="col-sm">
                            <select
                                style={{ minWidth: '200px' }}
                                onChange={(e, param) => this.handleDropdown(e, "customer")}
                                name="customerCode"
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
                    {/* Address Labels */}
                    <div className="row">
                        <div className="col-sm">
                            <label>Address</label>
                        </div>
                        <div className="col-sm">
                            <label>Address</label>
                        </div>
                    </div>
                    {/* Address Fields */}
                    <div className="row">
                        <div className="col-sm">
                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} name="companyAddressLine1" value={this.state.companyAddressLine1} readOnly /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} name="companyAddressLine2" value={this.state.companyAddressLine2} readOnly />
                        </div>
                        <div className="col-sm">
                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} name="customerAddressLine1" value={this.state.customerAddressLine1} readOnly /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', minWidth: '200px' }} name="customerAddressLine2" value={this.state.customerAddressLine2} readOnly />
                        </div>
                    </div>
                    <br />
                    {/* Invoice Date and Number Labels */}
                    <div className="row">
                        <div className="col-sm">
                            <label>Invoice Date</label>
                        </div>
                        <div className="col-sm">
                            <label>Invoice No.</label>
                        </div>
                    </div>
                    {/* Invoice Date and Number Fields */}
                    <div className="row">
                        <div className="col-sm">
                            <input type="date" style={{ minWidth: '200px' }} name="invoiceDate" required />
                        </div>
                        <div className="col-sm">
                            <input type="text" style={{ minWidth: '200px' }} name="invoiceNumber" value={this.state.invoiceNo} />
                        </div>
                    </div>
                </div>
                <br />
                <hr />
                {/* Invoice Row Headings */}
                <div className="row" style={{ textAlign: 'center' }}>
                    {/* <div className="col">
                        <label color="black">Serial No.</label>
                    </div> */}
                    <div className="col">
                        <label color="black">Item Code</label>
                    </div>
                    <div className="col">
                        <label color="black">Item Name</label>
                    </div>
                    <div className="col">
                        <label color="black">HSN Code / Accounting Code</label>
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
                    <div className="col">
                        <label color="black">CGST Rate</label>
                    </div>
                    <div className="col">
                        <label color="black">CGST Amount</label>
                    </div>
                    <div className="col">
                        <label color="black">SGST Rate</label>
                    </div>
                    <div className="col">
                        <label color="black">SGST Amount</label>
                    </div>
                    <div className="col">
                        <label color="black">IGST Rate</label>
                    </div>
                    <div className="col">
                        <label color="black">IGST Amount</label>
                    </div>
                    <div className="col"></div>
                </div>
                <hr />
                {/* Invoice Row Fields */}
                {
                    invoiceRow.map((item, key) => {
                        return item
                    })
                }
                <hr />
                <div className="row" style={{ textAlign: 'center' }}>
                    <div className="col">
                        <input
                            type="button"
                            className="btn btn-primary"
                            onClick={this.addRow}
                            value="+ Add Row"
                        /></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col" style={{ marginLeft: '50px' }}>
                        <label color="black">Grand Total</label>
                        <input
                            type="text"
                            name="itemTotal"
                            className="form-control itemTotal"
                            readOnly
                        />
                    </div>
                    <div className="col">
                        <label>Total Discount</label>
                        <input
                            type="text"
                            name="discountTotal"
                            className="form-control discountTotal"
                            readOnly
                        /></div>
                    <div className="col"></div>
                    <div className="col">
                        <label>Total CGST</label>
                        <input
                            type="text"
                            name="cgstTotal"
                            className="form-control cgstTotal"
                            readOnly
                        />
                    </div>
                    <div className="col"></div>
                    <div className="col">
                        <label>Total SGST</label>
                        <input
                            type="text"
                            name="sgstTotal"
                            className="form-control sgstTotal"
                            readOnly
                        />
                    </div>
                    <div className="col"></div>
                    <div className="col">
                        <label>Total IGST</label>
                        <input
                            type="text"
                            name="igstTotal"
                            className="form-control igstTotal"
                            readOnly
                        />
                    </div>
                    <div className="col">
                        <label color="black">Total Tax</label>
                        <input
                            type="text"
                            name="taxTotal"
                            className="form-control taxTotal"
                            readOnly
                        />
                    </div>
                </div>
                <div className="row" style={{ textAlign: 'center' }}>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div>
                        <hr />
                        <label color="black">Total Invoice value</label>
                        <input
                            type="text"
                            name={"invoiceTotal"}
                            className="form-control invoiceTotal"
                            readOnly
                        />
                        <hr />
                        <input
                            type="submit"
                            className="btn btn-success"
                            value="Create Invoice"
                            style={{ float: 'right' }}
                        />
                    </div>
                </div>
                <hr />
            </form >
        );
    }
}

export default CreateInvoice;