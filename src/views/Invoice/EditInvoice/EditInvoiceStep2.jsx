import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import parse from 'form-parse';
import swal from 'sweetalert';
import superagent from 'superagent';
import Button from 'material-ui/Button';
import {
    grayColor,
    roseColor,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,

} from "assets/jss/material-dashboard-react.jsx";
import { S_IRWXG } from 'constants';

var invoiceRow = [], deletedRows = 0, tempArray = [], count = 0;

export default class EditInvoiceStep2 extends React.Component {
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
            companyCode: "",
            companyName: "",
            companyState: "",
            customerCode: "",
            customerName: "",
            customerState: "",
            ItemQty: "",
            count: 0,
            newInvoiceRow: [],
            validate: false
        }
    }
    getData = (param) => {
        if (param === "items") {
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
    add = () => {
        var i = 0;
        var query = window.location.search.substring(window.location.search.indexOf("=") + 1);
        this.setState({ query: query });
        axios.get("http://localhost:8080/oneList?id=" + query)
            .then((result) => {

                result.data.data.map((item, index) => {
                    console.log(item, "items")

                    this.setState({ ["cgstTotal" + index]: item.cgstTotal }),
                        this.setState({ ["discount" + index]: item.discountTotal }),
                        this.setState({ ["igstTotal" + index]: item.igstTotal }),
                        this.setState({ ["invoiceTotal" + index]: item.invoiceTotal })
                    result.data.data[0].items.map((items, index) => {
                        index = index + 1;
                        this.state.invoiceRow.push(this.state.count += 1),
                            this.setState({ ["cgstRate" + index]: items.cgstRate }),
                            this.setState({ ["cgstAmount" + index]: items.cgstAmount }),
                            this.setState({ ["sgstRate" + index]: items.sgstRate }),
                            this.setState({ ["sgstAmount" + index]: items.sgstAmount }),
                            this.setState({ ["igstRate" + index]: items.igstRate }),
                            this.setState({ ["igstAmount" + index]: items.igstAmount }),
                            this.setState({ ["itemCode" + index]: items.itemCode }),
                            this.setState({ ["discount" + index]: items.itemDiscount }),
                            this.setState({ ["qty" + index]: items.itemQty }),
                            this.setState({ ["itemRate" + index]: items.itemRate }),
                            this.setState({ ["itemTotal" + index]: items.itemTotal })

                    })

                })
                this.setState({ invoiceRow: this.state.invoiceRow })
                for (let i = 1; i <= this.state.invoiceRow.length; i++) {
                    let x = $('.select' + i).attr('id');
                    console.log("x", x);
                    this.handleDropdown("", "items", x);
                }


                count = this.state.invoiceRow.length;



            })
    }
    addRow = (params) => {
       
        

        return (
            <div style={{ marginTop: '5px' }}>
                <div
                    className={"row row" + params}
                    id={"btn_" + params}
                >
                    <div className="col-2">
                    <input type="text" list="product"
                            id={"select" + params}
                            name={"itemCode" + params}
                            className={"form-control select" + params}
                            value={this.state["itemCode" + params]}
                            onChange={(e, param) => this.handleDropdown(e, "items")}
                        // required={this.state.validate ? required : ""}
                        />   
                        <datalist id="product" >
                            {
                                this.state.itemsDropdownData.map((item, index) => {
                                    return <option name={item.productName} value={item.productCode} key={index}>{item.productCode}</option>
                                })
                            }
                        </datalist>
                        <input
                            type="text" hidden={true}
                            className={"form-control name" + params}
                            name={"itemName" + params}
                            value={this.state["itemName" + params]}
                            onChange={(e) => this.handleInvoice(e)}
                        />
                        <input
                            type="text" hidden={true}
                            className={"form-control hsn" + params}
                            name={"hsn" + params}
                            value={this.state["hsn" + params]}
                            onChange={(e) => this.handleInvoice(e)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className={"form-control qty" + params}
                            name={"qty" + params}
                            onChange={(e) => this.handleInvoice(e)}
                            pattern="^[0-9]*$"
                            title="Number only"
                            value={this.state["qty" + params]}
                        />
                    </div>
                    <div className={"col rate" + params} style={{ textAlign: 'center' }}>{this.state["itemRate" + params]}</div>
                    <input
                        type="hidden"
                        className={"form-control itemRate" + params}
                        name={"itemRate" + params}
                        onChange={(e) => this.handleInvoice(e)}
                        value={this.state["itemRate" + params]}
                    />
                    <div className={"col total" + params} style={{ textAlign: 'center' }}>{this.state["itemTotal" + params]}</div>
                    <input
                        type="hidden"
                        className={"form-control itemTotal" + params}
                        name={"itemTotal" + params}
                        value={this.state["itemTotal" + params]}
                        onChange={(e) => this.handleInvoice(e)}
                    />
                    <div className="col">
                        <input
                            type="text"
                            className={"form-control discount" + params}
                            name={"discount" + params}
                            onChange={(e) => this.handleInvoice(e)}
                            value={this.state["discount" + params]}
                        />
                    </div>
                    <div className="col-3">
                        {this.state.showCgst ?
                            <div className="row">
                                <div>CGST - Rate</div>
                                &nbsp;
                                <input
                                    type="text"
                                    name={"cgstRate" + params}
                                    className={"form-control cgstRate" + params}
                                    style={{ maxWidth: '65px' }}
                                    onChange={this.handleInvoice}
                                    value={this.state["cgstRate" + params]}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div name={"CGSTAmount" + params} className={"cgstamnt" + params}>{this.state["cgstAmount" + params]}</div>
                                <input
                                    type="hidden"
                                    className={"form-control cgstAmount" + params}
                                    name={"cgstAmount" + params}
                                    onChange={(e) => this.handleInvoice(e)}
                                    value={this.state["cgstAmount" + params]}
                                />
                            </div> : <div></div>
                        }
                        {this.state.showSgst ?
                            <div className="row">
                                <div style={{ marginLeft: '1px' }}>SGST - Rate</div>&nbsp;
                                <input
                                    type="text"
                                    name={"sgstRate" + params}
                                    className={"form-control sgstRate" + params}
                                    style={{ maxWidth: '65px' }}
                                    value={this.state["sgstRate" + params]}
                                    onChange={this.handleInvoice}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div name={"SGSTAmount" + params} className={"sgstamnt" + params}>{this.state["sgstAmount" + params]}</div>
                                <input
                                    type="hidden"
                                    className={"form-control sgstAmount" + params}
                                    name={"sgstAmount" + params}
                                    onChange={(e) => this.handleInvoice(e)}
                                    value={this.state["sgstAmount" + params]}
                                />
                            </div> : <div></div>
                        }
                        {this.state.showIgst ?
                            <div className="row">
                                <div>IGST - Rate</div>
                                &nbsp;
                                <input
                                    type="text"
                                    name={"igstRate" + params}
                                    className={"form-control igstRate" + params}
                                    onChange={this.handleInvoice}
                                    value={this.state["igstRate" + params]}
                                    style={{ maxWidth: '65px' }}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div name={"IGSTAmount" + params} className={"igstamnt" + params}>{this.state["igstAmount" + params]}</div>
                                <input
                                    type="hidden"
                                    className={"form-control igstAmount" + params}
                                    name={"igstAmount" + params}
                                    onChange={(e) => this.handleInvoice(e)}
                                    value={this.state["igstAmount" + params]}
                                />
                            </div> : <div></div>
                        }
                    </div>
                    <div
                        className={"col rowTotal" + params}
                        style={{ textAlign: 'center' }}
                    >{this.state["itemTotal" + params]}</div>
                    <div className="col">
                        <button
                            className="btn btn-danger"
                            id={"btn_" + params}
                            value={"btn_" + params}
                            onClick={(e) => this.removeRow(e, "addRow", this.state.invoiceRow.length)}
                        >x
                            </button>
                    </div>
                </div>
            </div>

        )


    }
    addData = (params) => {
        invoiceRow.push(
            <div style={{ marginTop: '5px' }}>
                <div
                    className={"row row" + params}
                    id={"btn_" + params}
                >
                    <div className="col-2">
                        <input type="text" list="product"
                            id={"select" + params}
                            name={"itemCode" + params}
                            className={"form-control select" + params}
                            onChange={(e, param) => this.handleDropdown(e, "items")}
                        // required={this.state.validate ? required : ""}
                        />
                        <datalist id="product" >
                            {
                                this.state.itemsDropdownData.map((item, index) => {
                                    return <option name={item.productName} value={item.productCode} key={index}>{item.productCode}</option>
                                })
                            }
                        </datalist>
                        <input
                            type="hidden"
                            className={"form-control name" + params}
                            name={"itemName" + params}
                            onChange={(e) => this.handleInvoice(e)}
                        />
                        <input
                            type="hidden"
                            className={"form-control hsn" + params}
                            name={"hsn" + params}
                            onChange={(e) => this.handleInvoice(e)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            id="qty"
                            className={"form-control qty qty" + params}
                            name={"qty" + params}
                            onChange={(e) => this.handleInvoice(e)}
                            pattern="^[0-9]*$"
                            title="Number only"
                            required
                        />
                    </div>
                    <div className={"col rate" + params} style={{ textAlign: 'center' }}>0</div>
                    <input
                        type="hidden"
                        className={"form-control itemRate" + params}
                        name={"itemRate" + params}
                        onChange={(e) => this.handleInvoice(e)}
                    />
                    <div className={"col total" + params} style={{ textAlign: 'center' }}>0</div>
                    <input
                        type="hidden"
                        className={"form-control itemTotal" + params}
                        name={"itemTotal" + params}
                        onChange={(e) => this.handleInvoice(e)}
                    />
                    <div className="col">
                        <input
                            type="text"
                            className={"form-control discount" + params}
                            name={"discount" + params}
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
                                    name={"cgstRate" + params}
                                    className={"form-control cgstRate" + params}
                                    style={{ maxWidth: '65px' }}
                                    onChange={this.handleInvoice}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div name={"CGSTAmount" + params} className={"cgstamnt" + params}>0</div>
                                <input
                                    type="hidden"
                                    className={"form-control cgstAmount" + params}
                                    name={"cgstAmount" + params}
                                    onChange={(e) => this.handleInvoice(e)}
                                />
                            </div> : <div></div>
                        }
                        {this.state.showSgst ?
                            <div className="row">
                                <div style={{ marginLeft: '1px' }}>SGST - Rate</div>&nbsp;
                                <input
                                    type="text"
                                    name={"sgstRate" + params}
                                    className={"form-control sgstRate" + params}
                                    style={{ maxWidth: '65px' }}
                                    onChange={this.handleInvoice}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div name={"SGSTAmount" + params} className={"sgstamnt" + params}>0</div>
                                <input
                                    type="hidden"
                                    className={"form-control sgstAmount" + params}
                                    name={"sgstAmount" + params}
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
                                    name={"igstRate" + params}
                                    className={"form-control igstRate" + params}
                                    onChange={this.handleInvoice}
                                    style={{ maxWidth: '65px' }}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div name={"IGSTAmount" + params} className={"igstamnt" + params}>0</div>
                                <input
                                    type="hidden"
                                    className={"form-control igstAmount" + params}
                                    name={"igstAmount" + params}
                                    onChange={(e) => this.handleInvoice(e)}
                                />
                            </div> : <div></div>
                        }
                    </div>
                    <div
                        className={"col rowTotal" + params}
                        style={{ textAlign: 'center' }}
                    >0</div>
                    <div className="col">
                        <button
                            className="btn btn-danger"
                            id={"btn_" + params}
                            value={"btn_" + params}
                            onClick={(e) => this.removeRow(e, "addData", this.state.newInvoiceRow.length)}
                        >x
                            </button>
                    </div>
                </div>
            </div>
        )
        this.setState({
            newInvoiceRow: invoiceRow,

        })
    }
    removeRow = (e, functionname, length) => {

       
        if (functionname == "addRow") {
            alert("addRow");
            let target = e.target.value.split("_");
            let targetIndex = target[1];
            if(targetIndex<=(length+1)){
               $('.row'+ targetIndex).remove();
            }
        }
        else if(functionname=="addData"){
        
            let target = e.target.value.split("_");
            let targetIndex = target[1];
            console.log(targetIndex,"target",length,"lenthy")
            if(targetIndex<=(length+1)){
                // console.log((length +1)-targetIndex,"lengthhhhh")
                // delete this.state.newInvoiceRow[((length +1)-targetIndex)];
                this.state.newInvoiceRow.map((items,index)=>{
                    if(targetIndex==(items.props.children.props.id.split("_")[1])){
                        delete this.state.newInvoiceRow[index];
                    }

                })
            }
            this.setState({
                newInvoiceRow:this.state.newInvoiceRow
            })
            deletedRows++;
        }
        
    }

    handleDropdown = (e, param, m) => {
        if (e !== "") {
            this.setState({
                [e.target.name]: e.target.value
            })
            let eo = $(e.target).attr('id');
            let i = eo.slice(6);

            var tempTaxCode;
            // console.log("i", i, "this.state.itemsDropdownData", this.state.itemsDropdownData),
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
        else {
            if (param == "items") {
                // let eo = $(e.target).attr('id');
                let i = m.slice(6);

                var tempTaxCode;
                // if (tempArray.includes(e.target.value) === true) {
                //     swal({
                //         text: "you have already selected this item before",
                //         icon: "warning"
                //     })
                // }
                // else {

                this.state.itemsDropdownData.map((item, key) => {

                    if ($('#' + m).val() == item.productCode) {
                        console.log("item", item, i);
                        tempTaxCode = item.taxCode;
                        $('.name' + i).val(item.productName);
                        $('.hsn' + i).val(item.taxCode);
                        $('.rate' + i).text(item.rate);
                        $('.itemRate' + i).val(item.rate);
                    }
                })
                // }
                this.setState({
                    productCode: $('#' + m).val(),
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
    }
    handleInvoice = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }


    handleCancel = () => {
        window.location.href = "/ListInvoice"
    }
    validate = (e, param) => {
        e.preventDefault();
        if (param === "invoice") {

            this.setState({
                validate: false
            })
        }
        if (param === "draft") {
            this.setState({
                validate: true
            })
        }
    }
    createInvoice = (e) => {
        alert();
        let data = parse(e.target);
        console.log(e.target, "med data")
        let element = $(document.activeElement).val();
        if (element === "Save as Draft") {
            console.log(this.state.showIgst,"state igst")
            let items = [], item = {}, finalData = {};
            let parsedData = parse(e.target);
          
            if (this.state.showIgst === true) {
                for (var i = 1; i <= (this.state.invoiceRow.length + this.state.newInvoiceRow.length); i++) {
                    // console.log("parsed data", parsedData);
                    console.log("item data", items)
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
                items = items.filter(item => item.itemName != undefined);
                finalData = {
                    id: this.props.id,
                    _id: this.props.query,
                    invoiceDate: this.props.invoiceDate,
                    invoiceNumber: this.props.invoiceNo,
                    companyName: this.props.companyName,
                    companyCode: this.props.companyCode,
                    companyAddressLine1: this.props.companyAddressLine1,
                    companyAddressLine2: this.props.companyAddressLine2,
                    customerName: this.props.customerName,
                    customerCode: this.props.customerCode,
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
                    status: "Drafted"
                }
                console.log(finalData,"drafted")
            }
            else {
                for (var i = 1; i <= (this.state.invoiceRow.length + this.state.newInvoiceRow.length); i++) {
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
                items = items.filter(item => item.itemName != undefined);
                finalData = {
                    id: this.props.id,
                    _id: this.props.query,
                    invoiceDate: this.props.invoiceDate,
                    invoiceNumber: this.props.invoiceNo,
                    companyName: this.props.companyName,
                    companyCode: this.props.companyCode,
                    companyAddressLine1: this.props.companyAddressLine1,
                    companyAddressLine2: this.props.companyAddressLine2,
                    customerName: this.props.customerName,
                    customerCode: this.props.customerCode,
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
                    status: "Drafted"
                } 
            }console.log(finalData,"drafted")
            superagent
                .post("http://localhost:8080/editInvoice")
                .send(finalData)
                .then((res) => {
                    console.log(res.body, "dadtataa")
                    if (res.body.success) {
                        swal({
                            text: "Saved as Draft !",
                            icon: "success"
                        }).then(() => {
                            window.location.href = "/ListInvoice"
                        })
                    }
                })
        }
        if (element === "Create Invoice") {
            e.preventDefault();
            console.log("statu", this.state);
            console.log("e.target", e.target);
            let items = [], item = {}, finalData = {};
            let parsedData = parse(e.target);
            console.log("hey", parsedData);
            items = items.filter(item => item.itemName != undefined);
            if (this.state.showIgst === true) {
                for (var i = 1; i <= (this.state.invoiceRow.length + this.state.newInvoiceRow.length); i++) {
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
                    console.log("item", item);
                    items.push(item);
                    item = {};
                }

                items = items.filter(item => item.itemName != undefined);
                finalData = {
                    id: this.props.id,
                    _id: this.props.query,
                    invoiceDate: this.props.invoiceDate,
                    invoiceNumber: this.props.invoiceNo,
                    companyName: this.props.companyName,
                    companyCode: this.props.companyCode,
                    companyAddressLine1: this.props.companyAddressLine1,
                    companyAddressLine2: this.props.companyAddressLine2,
                    customerName: this.props.customerName,
                    customerCode: this.props.customerCode,
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
                    status: "Invoiced"
                }
            }
            else {
                console.log("rowLength", this.state.invoiceRow.length);
                for (var i = 1; i <= (this.state.invoiceRow.length + this.state.newInvoiceRow.length); i++) {
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
                    console.log("item", item);
                    items.push(item);
                    item = {};
                }
                items = items.filter(item => item.itemName != undefined);
                finalData = {
                    id: this.props.id,
                    _id: this.props.query,
                    invoiceDate: this.props.invoiceDate,
                    invoiceNumber: this.props.invoiceNo,
                    companyName: this.props.companyName,
                    companyCode: this.props.companyCode,
                    companyAddressLine1: this.props.companyAddressLine1,
                    companyAddressLine2: this.props.companyAddressLine2,
                    customerName: this.props.customerName,
                    customerCode: this.props.customerCode,
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
                    status: "Invoiced"
                }
            } console.log("final data", finalData)
            axios
                .post("http://localhost:8080/editInvoice",
                    finalData
                )

                .then((res) => {
                    console.log(res, "data  3")
                    if (res.data.success == true) {
                        swal({
                            title: "Invoice Created Successfully !",
                            icon: "success",
                        }).then(() => {
                            window.location.href = "/ListInvoice"
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
        this.add();

    }
    componentDidMount() {
        // alert();

        // console.log("this.state", this.state);
        // console.log("this.state.invoiceRow.length", this.state.invoiceRow.length);
        // 
    }
    componentDidUpdate() {


        for (var i = 1; i <= (this.state.invoiceRow.length + this.state.newInvoiceRow.length); i++) {
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
                console.log("itemtotal", $('.itemTotal' + i).val(total));
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
                console.log(itemsTotal, "totallllll")
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
        console.log("med param", this.state["itemCode" + 1])
        return (
            <div>
                <form class="container" onSubmit={this.createInvoice} noValidate={this.state.validate}>

                    <h2 className="text-align-center">Step 2</h2>
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


                            return this.addRow(item);

                        })
                    }
                    {

                        this.state.newInvoiceRow.map((item, key) => {
                            return item;

                        })

                    }
                    <hr />
                    {/* Add Row Button */}
                    <div className="row">
                        <div className="col-9">
                            <input
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {


                                    this.addData(++count)
                                }}
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
                    <input type="submit" className="btn btn-warning" name="button_1" value="Save as Draft" onMouseOver={(e, param) => this.validate(e, "draft")} />&nbsp;&nbsp;&nbsp;
                    <input type="submit" className="btn btn-success" name="button_2" value="Create Invoice" onMouseOver={(e, param) => this.validate(e, "invoice")} />
                    <Button style={{ float: "right", backgroundColor: dangerColor, fontSize: "16px" }} onClick={() => this.handleCancel()} >Cancel</Button>
                </form>
            </div>
        )
    }
}