import React from "react";
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Grid } from "material-ui";
import Search from '@material-ui/icons/Search';
import ViewIcon from '@material-ui/icons/ViewList';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import Download from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';
import swal from 'sweetalert2';
import axios from 'axios';
import Modal from './modal'
import { RegularCard, Table, ItemGrid } from "components";
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
import jspdf from "jspdf";


class ListInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      List: [],
      id: localStorage.getItem("id"),
      status: "",
      numPages: null,
      pageNumber: 1,
    }
  }
  pdf = new jspdf();
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }
  handleOpen = () => {
    this.setState({ load: true });
    // this.setState({taxCode:"",taxName:"",cgst:"",igst:"",sgst:"",_id:"",isActive:""});
  }
  onClose = () => {
    this.setState({ load: false });
  };
  onmodal = (data) => {
    console.log(data, "yha append krana")
    // console.log("listabc = ",result.data)
    var mainArray = [];
    data.forEach((item, index) => {
      console.log(item, "item")
      var dataArray = [];
      //  dataArray.push(tax._id)
      dataArray.push(item.invoiceNumber)
      dataArray.push(item.companyName)
      dataArray.push(item.customerName)
      dataArray.push(item.invoiceDate.split("T")[0])
      dataArray.push(item.invoiceTotal)
      dataArray.push(item.status)
      if (item.status === "Invoiced") {
        dataArray.push(<div><Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={() => { this.handleEdit(item._id) }} style={{ color: "black" }}><EditIcon /></a></Tooltip><span>&nbsp;</span>
          <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={() => { this.handleView(item._id, item.invoiceNumber) }} style={{ color: "black" }}><ViewIcon /></a></Tooltip><span>&nbsp;</span>
          <Tooltip id="tooltip-icon" title="Cancel"><a href="javascript:void(0)" class="button" onClick={() => { this.handleClose(item._id) }} style={{ color: "black" }}><CancelIcon /></a></Tooltip><span>&nbsp;</span>
          <Tooltip id="tooltip-icon" title="Download as PDF"><a href="javascript:void(0)" onClick={() => { this.handlePdf(item._id, item.invoiceNumber) }} style={{ color: "black" }}><Download /></a></Tooltip></div>);

      }
      else if (item.status === "Cancelled") {
        dataArray.push(<div><Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={() => { this.handleEdit(item._id) }} style={{ color: "black", opacity: "0.65", pointerEvents: "none" }}><EditIcon /></a></Tooltip><span>&nbsp;</span>
          <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={() => { this.handleView(item._id, item.invoiceNumber) }} style={{ color: "black" }}><ViewIcon /></a></Tooltip><span>&nbsp;</span>
          <Tooltip id="tooltip-icon" title="Cancel"><a href="javascript:void(0)" onClick={() => { this.handleClose() }} style={{ color: "black", opacity: "0.65", pointerEvents: "none" }}><CancelIcon /></a></Tooltip><span>&nbsp;</span>
          <Tooltip id="tooltip-icon" title="Download as PDF"><a href="javascript:void(0)" onClick={() => { this.handlePdf() }} style={{ color: "black", opacity: "0.65", pointerEvents: "none" }}><Download /></a></Tooltip></div>);
      }
      else if (item.status === "Drafted") {
        dataArray.push(<div><Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={() => { this.handleEdit(item._id) }} style={{ color: "black" }}><EditIcon /></a></Tooltip><span>&nbsp;</span>
          <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={() => { this.handleView(item._id, item.invoiceNumber) }} style={{ color: "black" }}><ViewIcon /></a></Tooltip><span>&nbsp;</span>
          <Tooltip id="tooltip-icon" title="Cancel"><a href="javascript:void(0)" onClick={() => { this.handleClose(item._id) }} style={{ color: "black" }}><CancelIcon /></a></Tooltip><span>&nbsp;</span>
          <Tooltip id="tooltip-icon" title="Download as PDF"><a href="javascript:void(0)" onClick={() => { this.handlePdf() }} style={{ color: "black", opacity: "0.65", pointerEvents: "none" }}><Download /></a></Tooltip></div>);

      }
      mainArray.push(dataArray)
    })
    this.setState({
      List: mainArray
    })
  }
  componentDidMount() {
    this.List();
  }
  handlePdf = (id, invoiceNumber) => {
    // window.location.href = "./viewInvoice?type=listinvoice" + "&invoiceNo=" + invoiceNumber;
    window.location.href = "./viewInvoice?id=" + id + "&invoiceNumber=" + invoiceNumber + "&type=listinvoice";
  }
  handleEdit = (id, invoiceNumber) => {
    window.location.href = "/EditInvoice?_id=" + id;
  }
  handleView = (id, invoiceNumber) => {
    window.location.href = "./viewInvoice?id=" + id + "&invoiceNumber=" + invoiceNumber;
  }
  handleClose(id) {
    swal({
      text: "Are you sure that you want to cancel this invoice?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#d9534f',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        axios
          .post("http://localhost:8080/editInvoice", { id: id, status: "Cancelled" })
          .then((res) => {
            this.List();
          })
      }
    })
  }
  componentWillMount() {
    console.log(this.state.data);
    let id = localStorage.getItem("id")
    if (id == null) {
      window.location.href = "/login"
    }
  }
  List = () => {
    fetch("http://localhost:8080/allList?id=" + this.state.id, {
      method: "GET",
      cache: 'no-cache',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': "Key@123"
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log("listabc = ", result.data)
          var mainArray = [];
          result.data.forEach((item, index) => {
            console.log(item, "item")
            var dataArray = [];
            //  dataArray.push(tax._id)
            dataArray.push(item.invoiceNumber)
            dataArray.push(item.companyName)
            dataArray.push(item.customerName)
            dataArray.push(item.invoiceDate.split("T")[0])
            dataArray.push(item.invoiceTotal)
            dataArray.push(item.status)
            if (item.status === "Invoiced") {
              dataArray.push(<div><Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={() => { this.handleEdit(item._id) }} style={{ color: "black" }}><EditIcon /></a></Tooltip><span>&nbsp;</span>
                <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={() => { this.handleView(item._id, item.invoiceNumber) }} style={{ color: "black" }}><ViewIcon /></a></Tooltip><span>&nbsp;</span>
                <Tooltip id="tooltip-icon" title="Cancel"><a href="javascript:void(0)" class="button" onClick={() => { this.handleClose(item._id) }} style={{ color: "black" }}><CancelIcon /></a></Tooltip><span>&nbsp;</span>
                <Tooltip id="tooltip-icon" title="Download as PDF"><a href="javascript:void(0)" onClick={() => { this.handlePdf(item._id, item.invoiceNumber) }} style={{ color: "black" }}><Download /></a></Tooltip></div>);

            }
            else if (item.status === "Cancelled") {
              dataArray.push(<div><Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={() => { this.handleEdit(item._id) }} style={{ color: "black", opacity: "0.65", pointerEvents: "none" }}><EditIcon /></a></Tooltip><span>&nbsp;</span>
                <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={() => { this.handleView(item._id, item.invoiceNumber) }} style={{ color: "black" }}><ViewIcon /></a></Tooltip><span>&nbsp;</span>
                <Tooltip id="tooltip-icon" title="Cancel"><a href="javascript:void(0)" onClick={() => { this.handleClose() }} style={{ color: "black", opacity: "0.65", pointerEvents: "none" }}><CancelIcon /></a></Tooltip><span>&nbsp;</span>
                <Tooltip id="tooltip-icon" title="Download as PDF"><a href="javascript:void(0)" onClick={() => { this.handlePdf() }} style={{ color: "black", opacity: "0.65", pointerEvents: "none" }}><Download /></a></Tooltip></div>);
            }
            else if (item.status === "Drafted") {
              dataArray.push(<div><Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={() => { this.handleEdit(item._id) }} style={{ color: "black" }}><EditIcon /></a></Tooltip><span>&nbsp;</span>
                <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={() => { this.handleView(item._id, item.invoiceNumber) }} style={{ color: "black" }}><ViewIcon /></a></Tooltip><span>&nbsp;</span>
                <Tooltip id="tooltip-icon" title="Cancel"><a href="javascript:void(0)" onClick={() => { this.handleClose(item._id) }} style={{ color: "black" }}><CancelIcon /></a></Tooltip><span>&nbsp;</span>
                <Tooltip id="tooltip-icon" title="Download as PDF"><a href="javascript:void(0)" onClick={() => { this.handlePdf() }} style={{ color: "black", opacity: "0.65", pointerEvents: "none" }}><Download /></a></Tooltip></div>);

            }
            mainArray.push(dataArray)
          })
          this.setState({
            List: mainArray
          })
        },
        (error) => {
          console.log("error", error)
        }
      )
  }
  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle={<div>Invoices<Tooltip id="tooltip-icon" title="Search">
       <Button style={{ float: "right", backgroundColor: "#76323f", color: "white" }} aria-label="add" variant="fab" onClick={this.handleOpen} ><Search />
                </Button></Tooltip></div>
              }
              content={
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Invoive Number", "Company", "Customer", "Date", "Amount", "Status", "Action"]}
                  tableData={this.state.List}
                />
              }
            />
          </ItemGrid>
        </Grid>
        <Modal open={this.state.load} data={this.onmodal} onClose={this.onClose} />
      </div>
    );
  }
}

export default ListInvoice;