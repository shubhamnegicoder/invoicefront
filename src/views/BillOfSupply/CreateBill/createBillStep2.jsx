import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import parse from 'form-parse';
import swal from 'sweetalert';
import superagent from 'superagent';

var invoiceRow = [], deletedRows = 0, tempArray = [];

export default class CreateBillStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            itemsDropdownData: [],
            invoiceRow: [],
            addRow: false,
            validate: false
        }
    }
    getData = (param) => {
        if (param === "items") {
            axios
                .get("http://localhost:8080/allProduct?id=" + this.state.id)
                .then((res) => {
                    // console.log("response from /allProduct", res);
                    let tempData = [];
                    res.data.data.map((item, key) => {
                        tempData.push(item);
                    });
                    this.setState({
                        itemsDropdownData: tempData,
                        addRow: true
                    });
                })
        }
    }
    addRow = () => {
        invoiceRow.push(
            <div style={{ marginTop: '5px' }}>
                <div
                    className={"row row" + invoiceRow.length}
                    id={"btn_" + this.state.invoiceRow.length}
                >
                    <div className="col-2">
                        <input
                            list="product"
                            id={"select" + invoiceRow.length}
                            name={"itemCode" + invoiceRow.length}
                            className="form-control"
                            onChange={(e, param) => this.handleDropdown(e, "items")}
                            placeholder="type and select !"
                            required
                        // required={this.state.validate ? required : ""}
                        />
                        <datalist id="product" >
                            {
                                this.state.itemsDropdownData.map((item, index) => {
                                    return <option name={item.productName} value={item.productCode}>{item.productCode + "-" + item.productName}</option>
                                })
                            }
                        </datalist>
                        <input
                            type="hidden"
                            className={"form-control name" + this.state.invoiceRow.length}
                            name={"itemName" + invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                        />
                        <input
                            type="hidden"
                            className={"form-control hsn" + this.state.invoiceRow.length}
                            name={"hsn" + invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            id="qty"
                            className={"form-control qty qty" + this.state.invoiceRow.length}
                            name={"qty" + this.state.invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                            pattern="^[0-9]*$"
                            title="Number only"
                            required
                        />
                    </div>
                    <div className={"col rate" + this.state.invoiceRow.length} style={{ textAlign: 'center' }}>0</div>
                    <input
                        type="hidden"
                        className={"form-control itemRate" + this.state.invoiceRow.length}
                        name={"itemRate" + invoiceRow.length}
                        onChange={(e) => this.handleInvoice(e)}
                    />
                    <div className={"col total" + this.state.invoiceRow.length} style={{ textAlign: 'center' }}>0</div>
                    <input
                        type="hidden"
                        className={"form-control itemTotal" + this.state.invoiceRow.length}
                        name={"itemTotal" + invoiceRow.length}
                        onChange={(e) => this.handleInvoice(e)}
                    />
                    <div className="col">
                        <input
                            type="text"
                            className={"form-control discount" + this.state.invoiceRow.length}
                            name={"discount" + this.state.invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                            defaultValue={0}
                        />
                    </div>
                    <div
                        className={"col rowTotal" + this.state.invoiceRow.length}
                        style={{ textAlign: 'center' }}
                    >0</div>
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
            addRow: false
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
    handleDropdown = (e, param) => {
        if (param == "items") {
            let eo = $(e.target).attr('id');
            let i = eo.slice(6);
            var tempTaxCode;
            // if (tempArray.includes(e.target.value) === true) {
            //     swal({
            //         text: "you have already selected this item before",
            //         icon: "warning"
            //     })
            // }
            // else {
            this.state.itemsDropdownData.map((item, key) => {
                if (e.target.value == item.productCode) {
                    tempArray.push(e.target.value);
                    tempTaxCode = item.taxCode;
                    $('.name' + i).val(item.productName);
                    $('.hsn' + i).val(item.taxCode);
                    $('.rate' + i).text(item.rate);
                    $('.itemRate' + i).val(item.rate);
                }
            })
            // }
            this.setState({
                productCode: e.target.value,
                check2: true
            })
        }
    }
    handleInvoice = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    validate = (e, param) => {
        if (param === "draft") {
            this.setState({
                validate: true
            })
        }
        if (param === "invoice") {
            this.setState({
                validate: false
            })
        }
    }
    submitInvoice = (e) => {
        e.preventDefault();
        let items = [], item = {}, finalData = {}, status;
        let parsedData = parse(e.target);
        items = items.filter(item => item.itemName != undefined);
        if (this.state.validate === true) {
            status = "Drafted";
        }
        else {
            status = "Billed";
        }
        for (var i = 0; i < invoiceRow.length; i++) {
            item.itemCode = parsedData["itemCode" + i];
            item.itemName = parsedData["itemName" + i];
            item.itemHsn = parsedData["hsn" + i];
            item.itemQty = parsedData["qty" + i];
            item.itemRate = parsedData["itemRate" + i];
            item.itemTotal = parsedData["itemTotal" + i];
            item.itemDiscount = parsedData["discount" + i];
            items.push(item);
            item = {};
        }
        finalData = {
            id: this.props.id,
            billDate: this.props.billDate,
            billNumber: this.props.billNumber,
            companyName: this.props.companyName,
            companyCode: this.props.companyCode.split("-")[0],
            companyAddressLine1: this.props.companyAddressLine1,
            companyAddressLine2: this.props.companyAddressLine2,
            customerName: this.props.customerName,
            customerCode: this.props.customerCode.split("-")[0],
            customerAddressLine1: this.props.customerAddressLine1,
            customerAddressLine2: this.props.customerAddressLine2,
            items: items,
            subTotal: parsedData.subTotal,
            discountTotal: parsedData.discountTotal,
            billTotal: parsedData.billTotal,
            status: status
        }
        console.log("final data", finalData);
        if (status === "Drafted") {
            superagent
                .post("http://localhost:8080/addBill")
                .send(finalData)
                .then((res) => {
                    if (res.body.success) {
                        swal({
                            text: "Saved as Draft !",
                            icon: "success"
                        }).then(() => {
                            window.location.href = "./BillList";
                        })
                    }
                })
        }
        if (status === "Billed"){
            superagent
                .post("http://localhost:8080/addBill")
                .send(finalData)
                .then((res) => {
                    if (res.body.success) {
                        swal({
                            text: "Bill Saved !",
                            icon: "success"
                        }).then(() => {
                            window.location.href = "./viewBill?id=" + this.state.id + "&billNumber=" + this.props.billNumber;
                        })
                    }
                })
        }
    }
    componentWillMount() {
        console.log("props", this.props);
        this.getData("items");
        invoiceRow = [];
    }
    componentDidMount() {
        console.log("props", this.props);
    }
    componentDidUpdate() {
        for (var i = 0; i < this.state.invoiceRow.length; i++) {
            let itemsTotal = 0;
            let discountTotal = 0;
            var qty = $('.qty' + i).val();
            var rate = parseFloat($('.rate' + i).text());
            var discount = $('.discount' + i).val();
            var total = (qty * rate);
            $('.total' + i).text(total);
            $('.itemTotal' + i).val(total);
            $('.rowTotal' + i).text(total - discount);
            for (var j = 0; j <= i + deletedRows; j++) {
                if (!(isNaN($('.total' + j).val()))) {
                    itemsTotal += parseFloat($('.itemTotal' + j).val());
                    discountTotal += parseFloat($('.discount' + j).val());
                }
            }
            $('.subTotalDiv').text(itemsTotal.toFixed(2) + "\t₹");
            $('.subTotal').val(itemsTotal.toFixed(2));
            $('.discountTotalDiv').text(discountTotal.toFixed(2) + "\t₹");
            $('.discountTotal').val(discountTotal.toFixed(2));
            $('.billTotalDiv').text((itemsTotal - discountTotal).toFixed(2) + "\t₹");
            $('.billTotal').val((itemsTotal - discountTotal).toFixed(2));
        }
    }
    render() {
        return (
            <form className="container invoiceForm" onSubmit={(e) => this.submitInvoice(e)} noValidate={this.state.validate}>
                {this.state.addRow ? this.addRow() : ""}
                <h3 className="text-align-center">Step 2</h3>
                <hr />
                {/* Invoice Date & Invoice Number */}
                <div className="row">
                    <div className="col" style={{ textAlign: 'left' }}>
                        {"Bill Date: " + this.props.billDate}
                    </div>
                    <div className="col" style={{ textAlign: 'right' }}>
                        {"Bill Number: " + this.props.billNumber}
                    </div>
                </div>
                <hr />
                {/* Company & Customer */}
                <div className="row" >
                    <div className="col" style={{ textAlign: 'left' }}>
                        {"Company: " + this.props.companyName}
                    </div>
                    <div className="col" style={{ textAlign: 'right' }}>
                        {"Customer: " + this.props.customerName}
                    </div>
                </div>
                <div className="row" >
                    <div className="col" style={{ textAlign: 'left' }}>
                        {"Address: " + this.props.companyAddressLine1 + " " + this.props.companyAddressLine2}
                    </div>
                    <div className="col" style={{ textAlign: 'right' }}>
                        {"Address: " + this.props.customerAddressLine1 + " " + this.props.customerAddressLine2}
                    </div>
                </div>
                <hr />
                {/* Invoice Row Headings */}
                <div className="row" style={{ textAlign: 'center' }}>
                    <div className="col-2">Item Code</div>
                    <div className="col">Qty</div>
                    <div className="col">Rate</div>
                    <div className="col">Total</div>
                    <div className="col">Disc.</div>
                    <div className="col">Row Total</div>
                    <div className="col"></div>
                </div>
                <hr />
                {/* Invoice Row Fields */}
                {
                    this.state.invoiceRow.map((item, key) => {
                        return item
                    })
                }
                <hr />
                {/* Add Row Button */}
                <div className="row">
                    <div className="col-9">
                        <input
                            type="button"
                            className="btn btn-primary"
                            onClick={this.addRow}
                            value="+ Add Row"
                        />
                    </div>
                    <div className="col-2">Subtotal</div>
                    <div className="col-1">
                        <div className="subTotalDiv">0</div>
                        <input type="hidden" name="subTotal" className="subTotal" onChange={this.handleInvoice} />
                    </div>
                </div>
                {/* Totals */}
                <div className="row">
                    <div className="col-9"></div>
                    <div className="col-2">Total Discount</div>
                    <div className="col-1">
                        <div className="discountTotalDiv">0</div>
                        <input type="hidden" name="discountTotal" className="discountTotal" onChange={this.handleInvoice} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-9"></div>
                    <div className="col-2">Total Bill Value</div>
                    <div className="col-1">
                        <div className="billTotalDiv">0</div>
                        <input type="hidden" name="billTotal" className="billTotal" onChange={this.handleInvoice} />
                    </div>
                </div>
                <input type="submit" className="btn btn-warning" value="Save as Draft" onMouseOver={(e, param) => this.validate(e, "draft")} />
                <input type="submit" className="btn btn-success" value="Create Bill" onMouseOver={(e, param) => this.validate(e, "invoice")} style={{ marginLeft: '5px' }} />
            </form >
        )
    }
}