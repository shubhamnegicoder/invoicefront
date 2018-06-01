import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Grid, InputLabel } from "material-ui";
import swal from "sweetalert";
import Customer from "../Customer/Customer";
import axios from "axios"
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
            customerName: "",
            countryCode: "",
            stateCode: "",
            cityCode: "",
            dropDownData: "",
            dropDownData2: "",
            dropDownData3: "",
            dropDownData4: ""
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    // data = () => {
    //     axios.get("http://localhost:8080/allCustomer")
    //         .then(
    //             (result) => {

    //                 console.log(result, "customer in search")
    //                 var maindata = [];
    //                 var localdata = []
    //                 result.data.data.map((item, key) => {
    //                     maindata.push(item);

    //                 })
    //                 this.setState({ dropDownData: maindata })
    //             },
    //             (error) => {
    //                 console.log("error", error)
    //             }
    //         )
    // }
    // dd = this.data();

    data1 = () => {
        axios("http://localhost:8080/allCountry?id=5af170d60c06c02559273df1")
            .then(
                (result) => {
                    var maindata = [];
                    var localdata = []
                    result.data.data.map((item, key) => {
                        maindata.push(item);

                    })
                    this.setState({ dropDownData1: maindata })
                },
                (error) => {
                    console.log("error", error)
                }
            )
    }
    data2 = (temp) => {
        axios("http://localhost:8080/allSelectedState?countryCode=" + temp)

            .then(
                (result) => {
                    var maindata = [];
                    var localdata = []
                    result.data.data && result.data.data.map((item, key) => {
                        maindata.push(item);
                    })
                    this.setState({ dropDownData2: maindata })
                },
                (error) => {
                    console.log("error", error)
                }
            )
    }
    ddd = this.data1();
    data3 = (temp2) => {
        axios("http://localhost:8080/allSelectedCity?stateCode=" + temp2)
            .then(
                (result) => {
                    var maindata = [];
                    var localdata = []
                    result.data.data && result.data.data.map((item, key) => {
                        maindata.push(item);
                    })
                    this.setState({ dropDownData3: maindata })
                },
                (error) => {
                    console.log("error", error)
                }
            )
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
        console.log(event.target.value, "selected country")
        this.setState({ countryCode: event.target.value })
        temp = event.target.value
        this.data2(temp);
    }

    handleChange2 = (event) => {
        console.log(event.target.value, "selected state")
        this.setState({ stateCode: event.target.value })
        temp2 = event.target.value
        this.data3(temp2)
    }

    handleChange3 = (event) => {
        console.log(event.target.value, "selected city")
        this.setState({ cityCode: event.target.value })
    }
    handleCheck(event) {
        this.setState({ [event.target.name]: event.target.checked });
    }
    handleChange = (event) => {
        console.log(event.target.value, "hhhhh")
        this.setState({ customerName: event.target.value })
    }

    onCancel = () => {
        // this.props.handleClose();
        this.setState({ customerName:"",
        countryCode:"",
        stateCode:"",
        cityCode:"",})

      };

    componentWillReceiveProps(newprops) {
        this.setState({ countryCode:""})
        this.setState({ stateCode:"" })
        this.setState({ cityCode:"" })
        this.setState({
           customerCode:""
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state , "state value")
        axios.get('http://localhost:8080/searchCustomer?customerName=' + this.state.customerName + '&countryCode=' + this.state.countryCode + '&stateCode=' + this.state.stateCode + '&cityCode=' + this.state.cityCode)
            .then((result) => {
                //access the results here....
                // console.log("result =,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,llllll ", result)
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
                <Modal styles={{ width: '379px' }} open={this.props.open} onClose={this.props.onClose} center>
                    <Grid container >
                        <form onSubmit={this.handleSubmit}>
                            <ItemGrid xs={18} sm={20} md={20}>
                                <RegularCard
                                    cardoption="Search Options"
                                    cardTitle={cardoption}
                                    content={
                                        <div>
                                            <Grid container>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5>Customer Name:</h5>
                                                        <input type="text" name={this.state.customerName} value={this.state.customerName} placeholder="select customer" onChange={this.handleChange} />
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5>Country Name:</h5>
                                                        <input type="text" list="country" selected placeholder="select country" onChange={this.handleChange1} />
                                                        <datalist id="country">
                                                            {
                                                                this.state.dropDownData1 && this.state.dropDownData1.map((item, index) => {
                                                                    return <option styles={{ width: '350px' }} name={item.countryName} value={item.countryCode} key={index}>{item.countryName}</option>
                                                                })
                                                            }
                                                        </datalist>
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5>state Name:</h5>
                                                        <input type="text" list="state" placeholder="select state" onChange={this.handleChange2} />
                                                        <datalist id="state">
                                                            {/* <option  value="Select Country "style={{width:"150px"}}> Select Country Name</option> */}
                                                            {
                                                                this.state.dropDownData2 && this.state.dropDownData2.map((item, index) => {

                                                                    return <option styles={{ width: '350px' }} name={item.stateName} value={item.stateCode} key={index}>{item.stateName}</option>
                                                                })
                                                            }
                                                        </datalist>
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5>City Name:</h5>
                                                        <input type="text" list="city" placeholder="select country" onChange={this.handleChange3} />
                                                        <datalist id="city">
                                                            {/* <option  value="Select Country "style={{width:"150px"}}> Select Country Name</option> */}
                                                            {
                                                                this.state.dropDownData3 && this.state.dropDownData3.map((item, index) => {

                                                                    return <option styles={{ width: '350px' }} name={item.cityName} value={item.cityCode} key={index}>{item.cityName}</option>
                                                                })
                                                            }
                                                        </datalist>
                                                    </label>
                                                </ItemGrid>

                                            </Grid>
                                        </div>
                                    }
                                    footer={<div><Button color="primary" type="submit" round>
                                        Submit</Button>
                                         <Button color="primary" onClick={this.onCancel}round style={{ float: "right" }}>Reset</Button></div>}
                                />
                            </ItemGrid>
                        </form>
                    </Grid>
                </Modal>
            </div>
        );
    }
}


