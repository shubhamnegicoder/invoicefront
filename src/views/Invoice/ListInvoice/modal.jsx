import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Grid, InputLabel } from "material-ui";
import swal from "sweetalert";
// import Company from "../Company/Company";
import axios from "axios"
import $ from "jquery"
import {
    ProfileCard,
    RegularCard,
    Button,
    CustomInput,
    ItemGrid
} from "components";
import Checkbox from 'material-ui/Checkbox'
import avatar from "assets/img/faces/marc.jpg";
var cardoption;
var temp, temp2, dd, ddd;
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            customerName: "",
            invoiceNo: "",
            startDate: "",
            endDate: ""
           
        };
        // this.handleChange = this.handleChange.bind(this);

    }

 

    componentWillMount() {
        // console.log(this.state.data);
        let id = localStorage.getItem("id")
        if (id == null) {
            window.location.href = "/login"
           
        }
    }

    handleChange=(event)=> {
     this.setState({ companyName: event.target.value });

    }
    handleChange1=(event)=> {
        this.setState({ customerName: event.target.value });
   
       }
       handleChange2=(event)=> {
        this.setState({ invoiceNo: event.target.value });
   
       }
       handleChange3=(event)=> {
        this.setState({ startDate: event.target.value });
   
       }
       handleChange4=(event)=> {
        this.setState({ endDate: event.target.value });
   
       }

    onCancel = () => {
        // this.props.handleClose();
        this.setState({ companyName:"",
        customerName:"",
        invoiceNo:"",
        startDate:"",
        endDate:""
    })
        // $('.company').val("")
        // $('.customer').val("")
        // $('.invoiceNo').val("")
        // $('.sdate').val("")
        // $('.edate').val("")

      };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state , "state value")
        axios.get('http://localhost:8080/searchInvoice?companyName=' + this.state.companyName + '&customerName=' + this.state.customerName + '&invoiceNo=' + this.state.invoiceNo)
            .then((result) => {
                console.log("result =,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,llllll ", result)
                if (result.data.data.length!=0) {
                    this.props.data(result.data.data)
                    swal({
                        text: "Successfully Done",
                        icon: "success"

                    })
                    this.props.onClose();
                }
                else {
                    swal({
                        title: " Sorry !! Data not Found",
                        icon: "warning",
                    });
                }
                // this.props.List()

            })



    }



    // }


    render() {
        return (
            <div>
                <Modal style={{maxWidth:"400px !important" }} open={this.props.open} onClose={this.props.onClose} center>
                    <Grid container style={{maxWidth:"400px"}} >
                        <form onSubmit={this.handleSubmit}>
                            <ItemGrid >
                                <RegularCard 
                                    cardTitle="Filter"
                                    content={
                                        <div>
                                            <Grid container  style={{maxWidth:"400px !important" }}>
                                                <ItemGrid xs={8} sm={8} md={8}>
                                                    <label>
                                                        <h5>Company:</h5>
                                                        <input  type="text" defaultValue={this.state.companyName} name={this.state.companyName} value={this.state.companyName} placeholder="company" onChange={this.handleChange} />
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={8} sm={8} md={8}>
                                                    <label>
                                                        <h5>Customer:</h5>
                                                        <input type="text"  name={this.state.customerName} value={this.state.customerName} placeholder="customer" onChange={this.handleChange1} />
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={8} sm={8} md={8}>
                                                    <label>
                                                        <h5>Invoice No:</h5>
                                                        <input class="invoiceNo" type="text"  name={this.state.invoiceNo} value={this.state.invoiceNo} placeholder="InvoiceNo" onChange={this.handleChange2} />
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid >
                                                    <label><h5>Invoice Date:</h5></label>
                                               <br/>
                                                    <label>
                                                        <h6> Start:</h6>
                                                        <input class="sdate" type="date" name={this.state.startDate} value={this.state.startDate} placeholder="date" onChange={this.handleChange3} />
                                                    </label>
                                                     &nbsp;
                                                     &nbsp;
                                                    <label>
                                                        <h6> End:</h6>
                                                        <input class="edate" type="date"  name={this.state.endDate} value={this.state.endDate} placeholder="date" onChange={this.handleChange4} />
                                                    </label>
                                                </ItemGrid>
                                               
                                            </Grid>
                                        </div>
                                    }
                                    footer={<div><Button color="primary" type="submit" style={{ float: "right",backgroundColor:"#76323f", color:"white" }} round>
                                        Submit</Button>
                                         <Button color="primary" onClick={this.onCancel}round style={{ float: "right",backgroundColor:"#76323f", color:"white" }}>Reset</Button></div>}
                                />
                            </ItemGrid>
                        </form>
                    </Grid>
                </Modal>
            </div>
        );
    }
}


