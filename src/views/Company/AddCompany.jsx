import React from "react";
import { Button } from "material-ui";
import swal from "sweetalert";
import axios from "axios"
var maindata = [];
var dropDownData = [];
var dd;
var temp;
var temp2;

class AddCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyCode: "",
            companyName: "",
            companyGSTNo: "",
            addressLine1: "",
            addressLine: "",
            cityCode: "",
            stateCode: "",
            countryCode: "",
            postalCode: "",
            contactNo: "",
            dropDownData: [],
            dropDownData2: [],
            dropDownData3: [],
            selectedFile: null

        };
    }


    fileChangedHandler = (e) => {
        const state = this.state;
        console.log(e.target.name,"name target")
        console.log(e.target.value,"value target")

        // switch (e.target.name) {
        //   case 'selectedFile':
        //     state.selectedFile = e.target.files[0];
        //     break;
        //   default:
        //     state[e.target.name] = e.target.value;
        // }

        this.setState({selectedFile:e.target.value});
    }


    handleChange = () => {
        this.setState({ companyCode: this.refs.companyCode.value });
        this.setState({ companyName: this.refs.companyName.value });
        this.setState({ companyGSTNo: this.refs.companyGSTNo.value });
        this.setState({ addressLine1: this.refs.addressLine1.value });
        this.setState({ addressLine2: this.refs.addressLine2.value });
        this.setState({ postalCode: this.refs.postalCode.value });
        this.setState({ contactNo: this.refs.contactNo.value });
    }
    handleChange1 = (event) => {
        console.log(event.target.value, "selected country")
        this.setState({ countryCode: event.target.value })
        temp = event.target.value
        this.data2(temp)



    }

    handleChange2 = (event) => {
        console.log(event.target.value)
        this.setState({ stateCode: event.target.value })
        console.log(this.state.stateCode, "set hui h state")
        temp2 = event.target.value
        this.data3(temp2)

    }

    handleChange3 = (event) => {
        console.log(event.target.value)
        this.setState({ cityCode: event.target.value })
        console.log(this.state.cityCode, "set hui h state")
    }


    data = () => {

        fetch("http://localhost:8080/allCountry?id=5af170d60c06c02559273df1", {
            method: "GET",
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': "Key@123"
            })
        }).then(res => res.json()).then(
            (result) => {
                var maindata = [];
                var localdata = []
                console.log(result.data, "kkk")
                result.data.map((item, key) => {
                    maindata.push(item);

                })


                this.setState({ dropDownData: maindata })
                console.log(this.state.dropDownData, "arrsy")
            },
            (error) => {
                console.log("error", error)
            }
        )
    }
    data2 = (temp) => {
        console.log(temp, "set hui in url")
        fetch("http://localhost:8080/allSelectedState?countryCode=" + temp, {
            method: "GET",
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': "Key@123"
            })
        }).then(res => res.json()).then(
            (result) => {
                var maindata = [];
                var localdata = []
                console.log(result.data, "kkkloololo")
                result.data && result.data.map((item, key) => {
                    maindata.push(item);

                })


                this.setState({ dropDownData2: maindata })
                // console.log(this.state.dropDownData, "arrsy")
            },
            (error) => {
                console.log("error", error)
            }
        )
    }
    data3 = (temp2) => {
        console.log(temp2, "set hui in url")
        fetch("http://localhost:8080/allSelectedCity?stateCode=" + temp2, {
            method: "GET",
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': "Key@123"
            })
        }).then(res => res.json()).then(
            (result) => {
                var maindata = [];
                var localdata = []
                console.log(result.data, "kkkloololo in city data")
                result.data && result.data.map((item, key) => {
                    maindata.push(item);

                })


                this.setState({ dropDownData3: maindata })
                // console.log(this.state.dropDownData, "arrsy")
            },
            (error) => {
                console.log("error", error)
            }
        )
    }

    componentWillMount() {
        this.data();
    }
    handleClose = (e) => {
        e.preventDefault();
        window.location.href = "/company";

    }

   

    save = () => {
        if (this.state.companyCode == "") {
            return alert("Company code is required");
        }
        if (this.state.companyName == "") {
            return alert("Company name is required");
        }
        if (this.state.companyGSTNo == "") {
            return alert("Company gst no is required");
        }
        if (this.state.addressLine1 == "") {
            return alert("Address 1 is required");
        }
        if (this.state.addressLine2 == "") {
            return alert("Address 2 is required");
        }
        if (this.state.cityCode == "") {
            return alert("City is required");
        }
        if (this.state.stateCode == "") {
            return alert("State is required");
        }
        if (this.state.countryCode == "") {
            return alert("Country is required");
        }
        if (this.state.postalCode == "") {
            return alert("Postal code is required ");
        }
        if (isNaN(this.state.postalCode)) {
            return alert("Postal code should be a numeric value");
        }
        if (this.state.contactNo == "") {
            return alert("Contact no is required");
        }
        // if(this.state.companyCode==""){
        //     return alert("Contact no is required");       
        // }

        console.log(this.state,"kkkkkkkkk image")
        fetch("http://localhost:8080/addCompany", {
            body: JSON.stringify(this.state),
            method: "POST",
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
                // 'authorization':"Key@123"
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.success == true) {
                        swal({
                            title: "Company Added Successfully !",
                            icon: "success",
                        });
                    }
                    else {
                        swal({
                            title: "Something went wrong !!",
                            icon: "fail",
                        })
                    }
                },
                (error) => {
                    console.log("error", error)
                }
            )
    }
    render() {
        return (<div>
            <table style={{ width: "600px", height: "450px" }} align="center">
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Company Code </td>
                    <td></td>
                    <td><input type="text" placeholder="Company Code" ref="companyCode" onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Company Name </td>
                    <td></td>
                    <td><input type="text" placeholder="Company Name" ref="companyName" onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Company GST No</td>
                    <td></td>
                    <td><input type="text" placeholder="Company GST No" ref="companyGSTNo" onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Address Line 1</td>
                    <td></td>
                    <td><input type="text" placeholder="Address Line 1" ref="addressLine1" onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Address Line 2</td>
                    <td></td>
                    <td><input type="text" placeholder="Address Line 2" ref="addressLine2" onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Country</td>
                    <td></td>
                    <td><select placeholder="select country" onChange={this.handleChange1}>
                        <option value="Select Country " style={{ width: "150px" }}> Select Country Name</option>
                        {
                            this.state.dropDownData && this.state.dropDownData.map((item, index) => {



                                return <option styles={{ width: '350px' }} name={item.countryName} value={item.countryCode} key={index}>{item.countryName}</option>
                            })
                        }

                    </select></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>State</td><td></td>
                    <td> <select placeholder="select State" onChange={this.handleChange2}>

                        <option value="Select  " style={{ width: "150px" }}> Select State Name</option>
                        {
                            this.state.dropDownData2 && this.state.dropDownData2.map((item, index) => {

                                return <option styles={{ width: '350px' }} name={item.stateName} value={item.stateCode} key={index}>{item.stateName}</option>
                            })
                        }

                    </select></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>City</td>
                    <td></td>
                    <td><select placeholder="select State" onChange={this.handleChange3}>

                        <option value="Select  " style={{ width: "150px" }}> Select city Name</option>
                        {
                            this.state.dropDownData3 && this.state.dropDownData3.map((item, index) => {



                                return <option styles={{ width: '350px' }} name={item.cityName} value={item.cityCode} key={index}>{item.cityName}</option>
                            })
                        }

                    </select></td>
                </tr>


                <tr>
                    <td><span style={{ color: "red" }}>*</span>Postal Code</td>
                    <td></td>
                    <td><input type="text" placeholder="Postal Code" ref="postalCode" onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Contact No</td>
                    <td></td>
                    <td><input type="text" placeholder="Contact No" ref="contactNo" onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Image upload</td>
                    <td></td>
                    <td>
                        <input type="file" onChange={this.fileChangedHandler} /></td>
                        {/* <button onClick={this.uploadHandler}>Upload!</button></td> */}
                </tr>
                <tr>

                    <td align="right"><input type="submit" value="Save" onClick={this.save} style={{ backgroundColor: "purple" }} /></td>
                    <td></td>
                    <td align="left"><input type="button" onClick={this.handleClose} value="Close" style={{ backgroundColor: "purple" }} /></td>
                </tr>

            </table>
        </div>);
    }
}

export default AddCompany; 