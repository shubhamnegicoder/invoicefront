import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import parse from 'form-parse';

var invoiceRow = [], deletedRows = 0, items = [];

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
            showIgst: false
        }
    }
    getData = (param) => {
        console.log("props", this.props);
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
        var query=window.location.search.substring(window.location.search.indexOf("=")+1);
                 this.setState({query:query});
                axios.get("http://localhost:8080/editList?id="+query)
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
                    this.getCompanyDropdownData();
                    this.getCustomerDropdownData()
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
        
        invoiceRow.push(
            <div style={{ marginTop: '5px' }}>
                <div
                    className={"row row" + invoiceRow.length}
                    id={"btn_" + this.state.invoiceRow.length}
                >
                    <div className="col-2">
                        <select
                            id={"select" + invoiceRow.length}
                            name={"itemCode" + invoiceRow.length}
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
                            className={"form-control qty" + this.state.invoiceRow.length}
                            name={"qty" + invoiceRow.length}
                            onChange={(e) => this.handleInvoice(e)}
                            required
                            pattern="^[0-9]*$"
                            title="Number only"
                        />
                    </div>
                    <div
                        className={"col rate" + this.state.invoiceRow.length}
                        style={{ textAlign: 'center' }}
                    >0
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
                    <div className="col-3">
                        {this.state.showCgst ?
                            <div className="row">
                                <div>CGST - Rate</div>
                                &nbsp;
                                <input
                                    type="text"
                                    id={"CGSTRate" + this.state.invoiceRow.length}
                                    name={"CGSTRate" + this.state.invoiceRow.length}
                                    className={"form-control cgstrate" + this.state.invoiceRow.length}
                                    style={{ maxWidth: '65px' }}
                                    onChange={this.handleInvoice}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div
                                    name={"CGSTAmnt" + this.state.invoiceRow.length}
                                    className={"cgstamnt" + this.state.invoiceRow.length}
                                >0</div>
                            </div> : <div></div>
                        }
                        {this.state.showSgst ?
                            <div className="row">
                                <div style={{ marginLeft: '1px' }}>SGST - Rate</div>&nbsp;
                                <input
                                    type="text"
                                    id={"SGSTRate" + this.state.invoiceRow.length}
                                    name={"sgstrate" + this.state.invoiceRow.length}
                                    className={"form-control sgstrate" + this.state.invoiceRow.length}
                                    style={{ maxWidth: '65px' }}
                                    onChange={this.handleInvoice}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div
                                    name={"SGSTAmnt" + this.state.invoiceRow.length}
                                    className={"sgstamnt" + this.state.invoiceRow.length}
                                >0</div>
                            </div> : <div></div>
                        }
                        {this.state.showIgst ?
                            <div className="row">
                                <div>IGST - Rate</div>
                                &nbsp;
                                <input
                                    type="text"
                                    id={"IGSTRate" + this.state.invoiceRow.length}
                                    name={"IGSTRate" + this.state.invoiceRow.length}
                                    className={"form-control igstrate" + this.state.invoiceRow.length}
                                    style={{ maxWidth: '65px' }}
                                />
                                &nbsp;Amt. :&nbsp;
                                <div
                                    name={"IGSTAmnt" + this.state.invoiceRow.length}
                                    className={"igstamnt" + this.state.invoiceRow.length}>0</div>
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
            this.state.itemsDropdownData.map((item, key) => {
                if (e.target.value == item.productCode) {
                    tempTaxCode = item.taxCode;
                    $('.name' + i).val(item.productName);
                    $('.hsn' + i).val(item.taxCode);
                    $('.rate' + i).text(item.rate);
                }
            })
            this.setState({
                productCode: e.target.value,
                check2: true
            })
            if (this.props.companyState == this.props.customerState) {
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
    submitInvoice = (e) => {
        e.preventDefault();
        console.log("props", this.props);
        let parsedData = parse(e.target);
        console.log("parsed", parsedData);
        this.setState({
            invoiceNo: parsedData.invoiceNumber
        })
        let item = {};
        for (var i = 0; i < invoiceRow.length; i++) {
            item.itemCode = parsedData["itemCode" + i];
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
            companyCode: this.props.companyCode,
            companyAddressLine1: this.props.companyAddressLine1,
            companyAddressLine2: this.props.companyAddressLine2,
            companyGSTIN: this.props.companyGSTIN,
            customerCode: this.props.customerCode,
            customerAddressLine1: this.props.customerAddressLine1,
            customerAddressLine2: this.props.customerAddressLine2,
            customerGSTIN: this.props.customerGSTIN,
            invoiceDate: this.props.invoiceDate,
            invoiceNumber: this.props.invoiceNo,
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
        // if (this.validation(finalData) == true) {
        //     superagent
        //         .post("http://localhost:8080/addInvoice")
        //         .send(finalData)
        //         .then((res) => {
        //             if (res.body.success) {
        //                 swal({
        //                     text: "Invoice Saved !",
        //                     icon: "success"
        //                 }).then(() => {
        //                     window.location.href = "./viewInvoice?id=" + this.state.id + "&invoiceNo=" + this.state.invoiceNo;
        //                 })
        //             }
        //         })
        // }
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
                var cgstrate = $('.cgstrate' + i).val();
                var sgstrate = $('.sgstrate' + i).val();
                var cgstamnt = ((total - discount) * (cgstrate / 100));
                var sgstamnt = ((total - discount) * (sgstrate / 100));
                var taxTotal = cgstamnt + sgstamnt;
                $('.total' + i).val(total);
                $('.cgstamnt' + i).text(cgstamnt.toFixed(2));
                $('.sgstamnt' + i).text(sgstamnt.toFixed(2));
                $('.rowTotal' + i).text(total - discount + taxTotal);
                for (var j = 0; j <= i + deletedRows; j++) {
                    if (!(isNaN($('.total' + j).val()))) {
                        itemsTotal += parseFloat($('.total' + j).val());
                        discountTotal += parseFloat($('.discount' + j).val());
                        cgstTotal += parseFloat($('.cgstamnt' + j).text());
                        sgstTotal += parseFloat($('.sgstamnt' + j).text());
                    }
                }
                taxTotal = cgstTotal + sgstTotal;
                $('.itemTotal').text(itemsTotal.toFixed(2) + "\t₹");
                $('.discountTotal').text(discountTotal.toFixed(2) + "\t₹");
                $('.cgstTotal').text(cgstTotal.toFixed(2) + "\t₹");
                $('.sgstTotal').text(sgstTotal.toFixed(2) + "\t₹");
                $('.taxTotal').text(taxTotal.toFixed(2) + "\t₹");
                $('.invoiceTotal').text((itemsTotal - discountTotal + taxTotal).toFixed(2) + "\t₹");
            }
            else {
                let igstTotal = 0;
                var qty = $('.qty' + i).val();
                var rate = parseFloat($('.rate' + i).text());
                var discount = $('.discount' + i).val();
                var total = (qty * rate);
                var igstrate = $('.igstrate' + i).val();
                var igstamnt = ((total - discount) * (igstrate / 100));
                var taxTotal = igstamnt;
                $('.total' + i).val(total);
                $('.igstamnt' + i).text(igstamnt.toFixed(2));
                $('.rowTotal' + i).text(total - discount + taxTotal);
                for (var j = 0; j <= i + deletedRows; j++) {
                    if (!(isNaN($('.total' + j).val()))) {
                        itemsTotal += parseFloat($('.total' + j).val());
                        discountTotal += parseFloat($('.discount' + j).val());
                        igstTotal += parseFloat($('.igstamnt' + j).text());
                    }
                }
                taxTotal = igstTotal;
                $('.itemTotal').text(itemsTotal);
                $('.discountTotal').text(discountTotal);
                $('.igstTotal').text(igstTotal.toFixed(2));
                $('.taxTotal').text(taxTotal);
                $('.invoiceTotal').text(itemsTotal - discountTotal + taxTotal);
            }
        }
    }
    render() {
        return (
            <form class="container" onSubmit={this.submitInvoice}>
                {this.state.addRow ? this.addRow() : ""}
                <h2 className="text-align-center">Step 2</h2>
                <hr />
                <div className="row">
                    <div className="col" style={{ textAlign: 'left' }}>
                        {"Invoice Date: " + this.props.invoiceDate}
                    </div>
                    <div className="col" style={{ textAlign: 'right' }}>
                        {"Invoice Number: " + this.props.invoiceNo}
                    </div>
                </div>
                <hr />
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
                    <div className="col-2">
                        Item Code
                    </div>
                    <div className="col">
                        Qty
                    </div>
                    <div className="col">
                        Rate
                    </div>
                    <div className="col">
                        Total
                    </div>
                    <div className="col">
                        Disc.
                    </div>
                    <div className="col-3">
                        Taxes
                    </div>
                    <div className="col">
                        Row Total
                    </div>
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
                        <div
                            name="itemTotal"
                            className="itemTotal"
                        >0</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9"></div>
                    <div className="col-2">Total Discount</div>
                    <div className="col-1">
                        <div
                            name="discountTotal"
                            className="discountTotal"
                        >0</div>
                    </div>
                </div>
                {this.state.showCgst ?
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-2">Total CGST</div>
                        <div className="col-1">
                            <div
                                name="cgstTotal"
                                className="cgstTotal"
                            >0</div>
                        </div>
                    </div> : <div></div>
                }
                {this.state.showSgst ?
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-2">Total SGST</div>
                        <div className="col-1">
                            <div
                                name="sgstTotal"
                                className="sgstTotal"
                            >0</div>
                        </div>
                    </div> : <div></div>
                }
                {this.state.showIgst ?
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-2">Total IGST</div>
                        <div className="col-1">
                            <div
                                name="igstTotal"
                                className="igstTotal"
                            >0
                            </div>
                        </div>
                    </div> : <div></div>
                }
                <div className="row">
                    <div className="col-9"></div>
                    <div className="col-2">Total Tax</div>
                    <div className="col-1">
                        <div
                            name="taxTotal"
                            className="taxTotal"
                        >0</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9"></div>
                    <div className="col-2">Total Invoice Value</div>
                    <div className="col-1">
                        <div name="invoiceTotal" className="invoiceTotal">0</div>
                    </div>
                </div>
            </form >
        )
    }
}