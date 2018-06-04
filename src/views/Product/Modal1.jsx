import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Grid, InputLabel } from "material-ui";
import swal from "sweetalert";
// import Customer from "../Customer/Customer";
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
            productName: "",
            taxCode: ""
            
        };

    }



    componentWillMount() {
        console.log(this.state.data);
        let id = localStorage.getItem("id")
        if (id == null) {
            window.location.href = "/login"
            this.data1()
        }
    }
    handleChange1 = (event) => {
     
        this.setState({ taxCode: event.target.value })
       
    }

   
    handleChange = (event) => {
        
        this.setState({ productName: event.target.value })
    }

    onCancel = () => {
        // this.props.handleClose();
        this.setState({ productName:"",
        taxCode:"",
       })
        // $('.country').val("")
        // $('.state').val("")
        // $('.city').val("")

      };


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state , "state value")
        axios.get('http://localhost:8080/searchProduct?productName=' + this.state.productName + '&taxCode=' + this.state.taxCode)
            .then((result) => {
                //access the results here....
                console.log("result =,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,llllll ", result)
                if (result.data.data.length!=0) {
                    // console.log(result.data.data,"props")
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
                <Modal style={{maxWidth:350}} open={this.props.load1} onClose={this.props.handleClose} center>
                    <Grid container style={{maxWidth:"400px"}} >
                        <form onSubmit={this.handleSubmit}>
                            <ItemGrid xs={18} sm={20} md={20}>
                                <RegularCard
                                    cardTitle="Search Options"
                                    content={
                                        <div>
                                            <Grid container>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5>Product:</h5>
                                                        <input type="text" defaultValue={this.state.productName} name={this.state.productName} value={this.state.productName} placeholder="select product" onChange={this.handleChange} />
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5>Tax Code:</h5>
                                                        <input type="text" defaultValue={this.state.taxCode} name={this.state.taxCode} value={this.state.taxCode} placeholder="select tax Code" onChange={this.handleChange1} />
                                                    </label>
                                                </ItemGrid>
                                            
                                            </Grid>
                                        </div>
                                    }
                                    footer={<div><Button color="primary" type="submit"style={{backgroundColor:"#76323f", color:"white" }} round>
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


