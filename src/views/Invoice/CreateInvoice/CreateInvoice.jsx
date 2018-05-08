import React from "react";
import { Grid } from "material-ui";
import $ from 'jquery';
import superagent from 'superagent';
import swal from 'sweetalert';

import {
    RegularCard,
    Button,
    CustomInput,
    ItemGrid
} from "components";

var invoiceArray = [];

class CreateInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            qty: [],
            price: [],
            invoiceArray: []
        }
        this.fxns = {
            handleInvoice: () => {
                var item = $('#item').val();
                var qty = $('#qty').val();
                var price = $('#price').val();
                var total = qty * price;
                $('#total').val("\t ₹" + total);
                this.setState({
                    item: item,
                    qty: qty,
                    price: price,
                    total: total
                })
            },
            submitInvoice: (e) => {
                e.preventDefault();
                var invoiceData = {
                    item: this.state.item,
                    qty: this.state.qty,
                    price: this.state.price,
                    total: this.state.total
                }
                if (this.state.item == "" || this.state.qty == "" || this.state.price == "") {
                    swal({
                        text: "Please input all the fields",
                        icon: "warning"
                    })
                }
                else {
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
            },
            addRow: () => {
                invoiceArray.push(
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={15} style={{ maxWidth: '235px', float: 'left' }} onChange={this.fxns.handleInvoice}>
                            <CustomInput
                                labelText="Item"
                                id="item"
                                formControlProps={{
                                    fullWidth: false
                                }}
                            />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={15} style={{ maxWidth: '235px', float: 'left' }} onChange={this.fxns.handleInvoice}>
                            <CustomInput
                                labelText="Quantity"
                                id="qty"
                                formControlProps={{
                                    fullWidth: false
                                }}
                            />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={15} style={{ maxWidth: '235px', float: 'left' }} onChange={this.fxns.handleInvoice}>
                            <CustomInput
                                labelText="Price per Qty."
                                id="price"
                                formControlProps={{
                                    fullWidth: false
                                }}
                            />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={15} style={{ maxWidth: '235px', float: 'left' }}>
                            <CustomInput
                                labelText="Total"
                                id="total"
                                formControlProps={{
                                    fullWidth: false
                                }}
                            />
                        </ItemGrid>
                    </Grid>)
                this.setState({ invoiceArray: invoiceArray })
            }
        }
    }
    componentWillMount() {
        this.fxns.addRow();
    }
    render() {
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={15} style={{ maxWidth: '235px', float: 'left' }} onChange={this.fxns.handleInvoice}>
                        <label>Company</label>
                        <select>
                            <option value="limitless">Limitless</option>
                            <option value="starky"></option>
                        </select>
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={15} style={{ maxWidth: '235px', float: 'left' }} onChange={this.fxns.handleInvoice}>
                        <label>Company</label>
                        <select></select>
                    </ItemGrid>
                </Grid>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12} style={{ maxWidth: '235px', float: 'left' }} onChange={this.fxns.handleInvoice}>
                        <label>Company</label>
                        <select></select>
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={12} style={{ maxWidth: '235px', float: 'left' }} onChange={this.fxns.handleInvoice}>
                        <label>Company</label>
                        <select></select>
                    </ItemGrid>
                </Grid>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={15}>
                        <form id="invoice_form" onSubmit={this.fxns.submitInvoice}>
                            <RegularCard
                                cardTitle="Invoice Details"
                                cardSubtitle="Please fill in the fields"
                                content={
                                    <center>
                                        <div>
                                            <Button style={{ float: 'right' }} onClick={this.fxns.addRow}>Add Row</Button>
                                            {invoiceArray.map((item, key) => {
                                                return item;
                                            })}
                                        </div>
                                    </center>
                                }
                                footer={<Button type="submit" color="primary">Create Invoice</Button>}
                            />
                        </form>
                    </ItemGrid>
                </Grid>
            </div>
        );
    }
}

export default CreateInvoice;