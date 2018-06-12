import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import parse from 'form-parse';
import swal from 'sweetalert';
import superagent from 'superagent';

var invoiceRow = [], deletedRows = 0, tempArray = [];

export default class CreateInvoiceStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            itemsDropdownData: [],
            invoiceRow: [],
            addRow: false,
            taxData: [],
            showCgst: false,
            showIgst: false,
            showIgst: false,
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
        if (param === "tax") {
            axios
                .get("http://localhost:8080/allTax?id=" + this.state.id)
                .then((res) => {
                    // console.log("response from /allTax", res);
                    let tempData = [];
                    res.data.data.map((item, key) => {
                        tempData.push(item);
                    });
                    this.setState({
                        taxData: tempData
                    });
                })
        }
    }
    addRow = (params) => {
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
                            // name={"itemCode" + invoiceRow.length}
                            className="form-control"
                            onChange={(e, param) => this.handleDropdown(e, "items")}
                            placeholder="type and select !"
                            required
                        // required={this.state.validate ? required : ""}
                        />
                        <datalist id="product" >
                            {
                                this.state.itemsDropdownData.map((item, index) => {
                                    return <option name={item.productName} value={item.productCode}>{item.productName}</option>
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
                    <div className="col-3">
                        {this.state.showCgst ?
                            <div className="row">
                                <div>CGST - Rate</div>
                                &nbsp;
                                <input
                                    type="text"
                                    name={"cgstRate" + this.state.invoiceRow.length}
                                    className={"form-control cgstRate" + this.state.invoiceRow.length}
                                    style={{ maxWidth: '65px' }}
                                    onChange={this.handleInvoice}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div name={"CGSTAmount" + this.state.invoiceRow.length} className={"cgstamnt" + this.state.invoiceRow.length}>0</div>
                                <input
                                    type="hidden"
                                    className={"form-control cgstAmount" + this.state.invoiceRow.length}
                                    name={"cgstAmount" + invoiceRow.length}
                                    onChange={(e) => this.handleInvoice(e)}
                                />
                            </div> : <div></div>
                        }
                        {this.state.showSgst ?
                            <div className="row">
                                <div style={{ marginLeft: '1px' }}>SGST - Rate</div>&nbsp;
                                <input
                                    type="text"
                                    name={"sgstRate" + this.state.invoiceRow.length}
                                    className={"form-control sgstRate" + this.state.invoiceRow.length}
                                    style={{ maxWidth: '65px' }}
                                    onChange={this.handleInvoice}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div name={"SGSTAmount" + this.state.invoiceRow.length} className={"sgstamnt" + this.state.invoiceRow.length}>0</div>
                                <input
                                    type="hidden"
                                    className={"form-control sgstAmount" + this.state.invoiceRow.length}
                                    name={"sgstAmount" + invoiceRow.length}
                                    onChange={(e) => this.handleInvoice(e)}
                                />
                            </div> : <div></div>
                        }
                        {this.state.showIgst ?
                            <div className="row">
                                <div>IGST - Rate</div>
                                &nbsp;
                                <input
                                    type="text"
                                    name={"igstRate" + this.state.invoiceRow.length}
                                    className={"form-control igstRate" + this.state.invoiceRow.length}
                                    onChange={this.handleInvoice}
                                    style={{ maxWidth: '65px' }}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div name={"IGSTAmount" + this.state.invoiceRow.length} className={"igstamnt" + this.state.invoiceRow.length}>0</div>
                                <input
                                    type="hidden"
                                    className={"form-control igstAmount" + this.state.invoiceRow.length}
                                    name={"igstAmount" + invoiceRow.length}
                                    onChange={(e) => this.handleInvoice(e)}
                                />
                            </div> : <div></div>
                        }
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
            if (this.props.companyState == this.props.customerState) {
                this.state.taxData.map((item, key) => {
                    if (item.taxCode == tempTaxCode) {
                        $('.cgstRate' + i).val(item.cgst);
                        $('.sgstRate' + i).val(item.sgst);
                        $('.igstRate' + i).val(0);
                    }
                })
            }
            else {
                this.state.taxData.map((item, key) => {
                    if (item.taxCode == tempTaxCode) {
                        $('.igstRate' + i).val(item.igst);
                        $('.cgstrate' + i).val(0);
                        $('.sgstrate' + i).val(0);
                        this.setState({
                            showIgst: true,
                            showCgst: false,
                            showSgst: false
                        })
                    }
                })
            }
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
            status = "Invoiced";
        }
        if (this.state.showIgst === true) {
            for (var i = 0; i < invoiceRow.length; i++) {
                item.itemCode = parsedData["itemCode" + i];
                item.itemName = parsedData["itemName" + i];
                item.itemHsn = parsedData["hsn" + i];
                item.itemQty = parsedData["qty" + i];
                item.itemRate = parsedData["itemRate" + i];
                item.itemTotal = parsedData["itemTotal" + i];
                item.itemDiscount = parsedData["discount" + i];
                item.cgstRate = 0;
                item.cgstAmount = 0;
                item.sgstRate = 0;
                item.sgstAmount = 0;
                item.igstRate = parsedData["igstRate" + i];
                item.igstAmount = (parsedData["igstAmount" + i]);
                items.push(item);
                item = {};
            }
            finalData = {
                id: this.props.id,
                invoiceDate: this.props.invoiceDate,
                invoiceNumber: this.props.invoiceNo,
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
                cgstTotal: 0,
                sgstTotal: 0,
                igstTotal: parsedData.igstTotal,
                taxTotal: parsedData.taxTotal,
                invoiceTotal: parsedData.invoiceTotal,
                status: status
            }
        }
        else {
            for (var i = 0; i < invoiceRow.length; i++) {
                item.itemCode = parsedData["itemCode" + i];
                item.itemName = parsedData["itemName" + i];
                item.itemHsn = parsedData["hsn" + i];
                item.itemQty = parsedData["qty" + i];
                item.itemRate = parsedData["itemRate" + i];
                item.itemTotal = parsedData["itemTotal" + i];
                item.itemDiscount = parsedData["discount" + i];
                item.cgstRate = parsedData["cgstRate" + i];
                item.cgstAmount = (parsedData["cgstAmount" + i]);
                item.sgstRate = parsedData["sgstRate" + i];
                item.sgstAmount = (parsedData["sgstAmount" + i]);
                item.igstRate = 0;
                item.igstAmount = 0;
                items.push(item);
                item = {};
            }
            finalData = {
                id: this.props.id,
                invoiceDate: this.props.invoiceDate,
                invoiceNumber: this.props.invoiceNo,
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
                cgstTotal: parsedData.cgstTotal,
                sgstTotal: parsedData.sgstTotal,
                igstTotal: 0,
                taxTotal: parsedData.taxTotal,
                invoiceTotal: parsedData.invoiceTotal,
                status: status
            }
        }
        console.log("final data", finalData);
        if (status === "Drafted") {
            superagent
                .post("http://localhost:8080/addInvoice")
                .send(finalData)
                .then((res) => {
                    if (res.body.success) {
                        swal({
                            text: "Saved as Draft !",
                            icon: "success"
                        }).then(() => {
                            window.location.href = "./InvoiceList";
                        })
                    }
                })
        }
        if (status === "Invoiced") {
            superagent
                .post("http://localhost:8080/addInvoice")
                .send(finalData)
                .then((res) => {
                    if (res.body.success) {
                        swal({
                            text: "Invoice Saved !",
                            icon: "success"
                        }).then(() => {
                            window.location.href = "./viewInvoice?id=" + this.state.id + "&invoiceNumber=" + this.props.invoiceNo;
                        })
                    }
                })
        }
    }
    componentWillMount() {
        if (this.props.companyState === this.props.customerState) {
            this.setState({
                showCgst: true,
                showSgst: true,
                showIgst: false
            })
        }
        else {
            this.setState({
                showCgst: false,
                showSgst: false,
                showIgst: true
            })
        }
        this.getData("items");
        this.getData("tax");
        invoiceRow = [];
    }
    componentDidUpdate() {
        for (var i = 0; i < this.state.invoiceRow.length; i++) {
            let itemsTotal = 0;
            let discountTotal = 0;
            if (this.state.showCgst === true || this.state.showSgst === true) {
                let cgstTotal = 0;
                let sgstTotal = 0;
                var qty = $('.qty' + i).val();
                var rate = parseFloat($('.rate' + i).text());
                var discount = $('.discount' + i).val();
                var total = (qty * rate);
                var cgstrate = $('.cgstRate' + i).val();
                var cgstamnt = ((total - discount) * (cgstrate / 100));
                var sgstrate = $('.sgstRate' + i).val();
                var sgstamnt = ((total - discount) * (sgstrate / 100));
                var taxTotal = cgstamnt + sgstamnt;
                $('.total' + i).text(total);
                $('.itemTotal' + i).val(total);
                $('.cgstamnt' + i).text(cgstamnt.toFixed(2));
                $('.cgstAmount' + i).val(cgstamnt.toFixed(2));
                $('.sgstamnt' + i).text(sgstamnt.toFixed(2));
                $('.sgstAmount' + i).val(sgstamnt.toFixed(2));
                $('.rowTotal' + i).text(total - discount + taxTotal);
                for (var j = 0; j <= i + deletedRows; j++) {
                    if (!(isNaN($('.total' + j).val()))) {
                        itemsTotal += parseFloat($('.itemTotal' + j).val());
                        discountTotal += parseFloat($('.discount' + j).val());
                        cgstTotal += parseFloat($('.cgstamnt' + j).text());
                        sgstTotal += parseFloat($('.sgstamnt' + j).text());
                    }
                }
                taxTotal = cgstTotal + sgstTotal;
                $('.subTotalDiv').text(itemsTotal.toFixed(2) + "\t₹");
                $('.subTotal').val(itemsTotal.toFixed(2));
                $('.discountTotalDiv').text(discountTotal.toFixed(2) + "\t₹");
                $('.discountTotal').val(discountTotal.toFixed(2));
                $('.cgstTotalDiv').text(cgstTotal.toFixed(2) + "\t₹");
                $('.cgstTotal').val(cgstTotal.toFixed(2));
                $('.sgstTotalDiv').text(sgstTotal.toFixed(2) + "\t₹");
                $('.sgstTotal').val(sgstTotal.toFixed(2));
                $('.taxTotalDiv').text(taxTotal.toFixed(2) + "\t₹");
                $('.taxTotal').val(taxTotal.toFixed(2));
                $('.invoiceTotalDiv').text((itemsTotal - discountTotal + taxTotal).toFixed(2) + "\t₹");
                $('.invoiceTotal').val((itemsTotal - discountTotal + taxTotal).toFixed(2));
            }
            else {
                let igstTotal = 0;
                var qty = $('.qty' + i).val();
                var rate = parseFloat($('.rate' + i).text());
                var discount = $('.discount' + i).val();
                var total = (qty * rate);
                var igstrate = $('.igstRate' + i).val();
                var igstamnt = ((total - discount) * (igstrate / 100));
                var taxTotal = igstamnt;
                $('.total' + i).text(total);
                $('.itemTotal' + i).val(total);
                $('.igstamnt' + i).text(igstamnt.toFixed(2));
                $('.igstAmount' + i).val(igstamnt.toFixed(2));
                $('.rowTotal' + i).text(total - discount + taxTotal);
                for (var j = 0; j <= i + deletedRows; j++) {
                    if (!(isNaN($('.total' + j).val()))) {
                        itemsTotal += parseFloat($('.itemTotal' + j).val());
                        discountTotal += parseFloat($('.discount' + j).val());
                        igstTotal += parseFloat($('.igstamnt' + j).text());
                    }
                }
                taxTotal = igstTotal;
                $('.subTotalDiv').text(itemsTotal.toFixed(2) + "\t₹");
                $('.subTotal').val(itemsTotal.toFixed(2));
                $('.discountTotalDiv').text(discountTotal.toFixed(2) + "\t₹");
                $('.discountTotal').val(discountTotal.toFixed(2));
                $('.igstTotalDiv').text(igstTotal.toFixed(2) + "\t₹");
                $('.igstTotal').val(igstTotal.toFixed(2));
                $('.taxTotalDiv').text(taxTotal.toFixed(2) + "\t₹");
                $('.taxTotal').val(taxTotal.toFixed(2));
                $('.invoiceTotalDiv').text((itemsTotal - discountTotal + taxTotal).toFixed(2) + "\t₹");
                $('.invoiceTotal').val((itemsTotal - discountTotal + taxTotal).toFixed(2));
            }
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
                        {"Invoice Date: " + this.props.invoiceDate}
                    </div>
                    <div className="col" style={{ textAlign: 'right' }}>
                        {"Invoice Number: " + this.props.invoiceNo}
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
                    <div className="col-3">Taxes</div>
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
                {this.state.showCgst ?
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-2">Total CGST</div>
                        <div className="col-1">
                            <div className="cgstTotalDiv">0</div>
                            <input type="hidden" name="cgstTotal" className="cgstTotal" onChange={this.handleInvoice} />
                        </div>
                    </div> : <div></div>
                }
                {this.state.showSgst ?
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-2">Total SGST</div>
                        <div className="col-1">
                            <div className="sgstTotalDiv">0</div>
                            <input type="hidden" name="sgstTotal" className="sgstTotal" onChange={this.handleInvoice} />
                        </div>
                    </div> : <div></div>
                }
                {this.state.showIgst ?
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-2">Total IGST</div>
                        <div className="col-1">
                            <div className="igstTotalDiv">0</div>
                            <input type="hidden" name="igstTotal" className="igstTotal" onChange={this.handleInvoice} />
                        </div>
                    </div> : <div></div>
                }
                <div className="row">
                    <div className="col-9"></div>
                    <div className="col-2">Total Tax</div>
                    <div className="col-1">
                        <div className="taxTotalDiv">0</div>
                        <input type="hidden" name="taxTotal" className="taxTotal" onChange={this.handleInvoice} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-9"></div>
                    <div className="col-2">Total Invoice Value</div>
                    <div className="col-1">
                        <div className="invoiceTotalDiv">0</div>
                        <input type="hidden" name="invoiceTotal" className="invoiceTotal" onChange={this.handleInvoice} />
                    </div>
                </div>
                <input type="submit" className="btn btn-warning" value="Save as Draft" onMouseOver={(e, param) => this.validate(e, "draft")} />
                <input type="submit" className="btn btn-success" value="Create Invoice" onMouseOver={(e, param) => this.validate(e, "invoice")} style={{ marginLeft: '5px' }} />
            </form >
        )
    }
}