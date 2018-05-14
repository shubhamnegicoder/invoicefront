import React from "react";
import { Grid } from "material-ui";
import $ from 'jquery';
import superagent from 'superagent';
import swal from 'sweetalert';
import './bootstrap.min.css';
import parse from 'form-parse';

import { RegularCard, Button, CustomInput, ItemGrid, Table } from "components";

var invoiceArray = [], itemArray = [];

class CreateInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            name: '',
            qty: '',
            rate: '',
            total: '',
            discount: '',
            invoiceArray: [],
            dataArray: []
        }
    }
    handleInvoice = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
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
        invoiceArray.push(
            <div>
                <hr />
                <div className="row">
                    <div className="col">
                        {invoiceArray.length + 1}
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name={"itemCode " + invoiceArray.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name={"itemName " + invoiceArray.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name={"qty " + invoiceArray.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name={"rate " + invoiceArray.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name={"total " + invoiceArray.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" name={"discount " + invoiceArray.length} onChange={(e) => this.handleInvoice(e)} required />
                    </div>
                </div>
            </div>
        )
        this.setState({ invoiceArray: invoiceArray })
    }
    submitInvoice = (e) => {
        e.preventDefault();
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
                    // .then((willDelete) => {
                    //     if (willDelete) {
                    //         swal("Poof! Your imaginary file has been deleted!", {
                    //             icon: "success",
                    //         });
                    //     } else {
                    //         swal("Your imaginary file is safe!");
                    //     }
                    // });
                }
            })
    }
    componentWillMount() {
        this.addRow();
    }
    render() {
        return (
            <form onSubmit={this.submitInvoice}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <label>Company</label>
                            <select style={{ minWidth: '200px', marginLeft: '8%' }}>
                                <option value="limitless">Limitless</option>
                                <option value="starky">Starky</option>
                            </select>
                        </div>
                        <div className="col-sm">
                            <label>Customer</label>
                            <select style={{ minWidth: '200px', marginLeft: '8%' }}>
                                <option value="limitless">Limitless</option>
                                <option value="starky">Starky</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <label>Address</label>
                            <input style={{ border: 0, borderBottom: '1px solid silver', marginLeft: '10%', minWidth: '200px' }} /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', marginLeft: '20%', minWidth: '200px' }} /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', marginLeft: '20%', minWidth: '200px' }} /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', marginLeft: '20%', minWidth: '200px' }} />
                        </div>
                        <div className="col-sm">
                            <label>Address</label>
                            <input style={{ border: 0, borderBottom: '1px solid silver', marginLeft: '10%', minWidth: '200px' }} /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', marginLeft: '20%', minWidth: '200px' }} /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', marginLeft: '20%', minWidth: '200px' }} /><br />
                            <input style={{ border: 0, borderBottom: '1px solid silver', marginLeft: '20%', minWidth: '200px' }} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm">
                            <label>Invoice Date</label>
                            <input type="date" style={{ minWidth: '200px', marginLeft: '4.5%' }} />
                        </div>
                        <div className="col-sm">
                            <label>Invoice No.</label>
                            <input type="text" style={{ minWidth: '200px', marginLeft: '6%' }} />
                        </div>
                    </div>
                </div>
                <br />
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
                    invoiceArray.map((item, key) => {
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
            </form>
        );
    }
}

export default CreateInvoice;