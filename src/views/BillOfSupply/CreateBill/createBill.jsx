import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';
import { WithWizard } from 'react-albus';
import './animation.css';
import './bootstrap.min.css';
import axios from 'axios';
import CreateBillStep2 from './createBillStep2';
import Autocomplete from "react-autocomplete";

var date, dropdownitems = [], customerdropdownitems = [];

const menuStyle = {
    borderRadius: '3px',
    borderStyle: "solid",
    borderWidth: "1px",
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '100%',
    position: 'absolute',
    overflow: 'auto',
    minWidth: '240px',
    maxWidth: '240px',
    maxHeight: '100%'
}

export default class CreateBill extends React.Component {
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
            billDate: "",
            billNumber: "",
            companySelected: false,
            customerSelected: false,
            check: false,
            loading: false
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
                .get("http://localhost:8080/allCustomer?id=" + this.state.id)
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
            billDate: date
        })
    }
    setBillNo = () => {
        date = new Date();
        let year = date.getFullYear();
        year = year.toString();
        let month = date.getMonth();
        month = month.toString();
        month++;
        month = this.padDigits(month, 2);
        let billNoPart1 = year + month;
        axios
            .get("http://localhost:8080/countBill?id=" + this.state.id)
            .then((res) => {
                console.log("response from /countBill", res);
                let billNoPart2 = res.data.data + 1;
                billNoPart2 = this.padDigits(billNoPart2, 4);
                let billNo = billNoPart1 + billNoPart2;
                billNo = parseInt(billNo);
                this.setState({
                    billNumber: billNo
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
        this.setBillNo();
        this.setInitialDate();
        this.getData("items");
    }
    handleInput = (e) => {
        e.preventDefault();

        this.setState({ companyName: e.target.value })
    }
    componentDidUpdate() {
        this.state.companyDropdownData.map((item, key) => {
            if (this.state.setAddressOfCompany == false) {
                if (this.state.companyCode.split("-")[0] == item.companyCode) {
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
                if (this.state.customerCode.split("-")[0] == item.customerCode) {
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
        dropdownitems = [];
        customerdropdownitems = [];
        this.state.companyDropdownData.map((item, key) => {
            dropdownitems.push({ label: item.companyCode + "-" + item.companyName })
        })
        this.state.customerDropdownData.map((item, key) => {
            customerdropdownitems.push({ label: item.customerCode + "-" + item.customerName })
        })
        function matchStateToTerm(item, value) {
            return (
                item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
            )
        }
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
                                <h3 className="text-align-center">Step 1</h3>
                                <hr />
                                <div style={{ textAlign: 'center' }}>
                                    <div className="row">
                                        <div className="col-sm">Company</div>
                                        <div className="col-sm">Customer</div>
                                        <hr />
                                    </div>
                                    <div className="row">
                                        {/* Company Dropdown */}
                                        <div className="col-sm">
                                            <div>
                                                <Autocomplete
                                                    value={this.state.companyCode}
                                                    inputProps={{ required: true }}
                                                    items={dropdownitems}
                                                    shouldItemRender={matchStateToTerm}
                                                    getItemValue={item => item.label}
                                                    onSelect={value => this.setState({ companyCode: value, setAddressOfCompany: false })}
                                                    onChange={e => this.setState({ companyCode: e.target.value, setAddressOfCompany: false })}
                                                    renderItem={(item, isHighlighted) => (
                                                        <div
                                                            className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                                        >
                                                            {item.label}
                                                        </div>
                                                    )}
                                                    renderMenu={(items, value, style) => (
                                                        <div className="menu" style={{ ...menuStyle }}>
                                                            {value === '' ? (
                                                                <div className="item">Type in Company Name</div>
                                                            ) : this.state.loading ? (
                                                                <div className="item">Loading...</div>
                                                            ) : items.length === 0 ? (
                                                                <div className="item">No matches for {value}</div>
                                                            ) : items}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm">
                                            <Autocomplete
                                                value={this.state.customerCode}
                                                inputProps={{ required: true }}
                                                items={customerdropdownitems}
                                                shouldItemRender={matchStateToTerm}
                                                getItemValue={item => item.label}
                                                onSelect={value => this.setState({ customerCode: value, setAddressOfCustomer: false })}
                                                onChange={e => this.setState({ customerCode: e.target.value, setAddressOfCustomer: false })}
                                                renderItem={(item, isHighlighted) => (
                                                    <div
                                                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                                    >
                                                        {item.label}
                                                    </div>
                                                )}
                                                renderMenu={(items, value, style) => (
                                                    <div className="menu" style={{ ...menuStyle }}>
                                                        {value === '' ? (
                                                            <div className="item">Type in Customer Name</div>
                                                        ) : this.state.loading ? (
                                                            <div className="item">Loading...</div>
                                                        ) : items.length === 0 ? (
                                                            <div className="item">No matches for {value}</div>
                                                        ) : items}
                                                    </div>
                                                )}
                                            />
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
                                        <div className="col-sm">Bill Date</div>
                                        <div className="col-sm">Bill No.</div>
                                        <hr />
                                    </div>
                                    {/* Invoice Date and Number Fields */}
                                    <div className="row">
                                        <div className="col-sm">
                                            <input
                                                type="date"
                                                name="billDate"
                                                className="billDate"
                                                style={{ minWidth: '200px' }}
                                                defaultValue={date}
                                                onChange={this.handleInvoice}
                                                required
                                            />
                                            <br />
                                            <label>(mm-dd-yyyy)</label>
                                        </div>
                                        <div className="col-sm">
                                            <input type="text" style={{ minWidth: '200px' }} name="billNumber" value={this.state.billNumber} disabled />
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
                            <CreateBillStep2 {...this.state} />
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
            </form >
        )
    }
}