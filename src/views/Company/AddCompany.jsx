import React from "react";
import { Button } from "material-ui";
import swal from "sweetalert";
import axios from "axios";
import Checkbox from 'material-ui/Checkbox';

var maindata = [];
var dropDownData = [];
var dd;
var temp;
var temp2;
//var localStorageId = localStorage.getItem('id');
class AddCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id:"",
            companyCode:"",
            companyName:"",
            companyGSTNo:"",
            addressLine1:"",
            addressLine2:"",
            cityCode:"",
            stateCode:"",
            countryCode:"",
            postalCode:"",
            contactNo:"",
            dropDownData:[],
            dropDownData2:[],
            dropDownData3:[],
            isActive: false,
            createAt:"",
            uploadFile:[],
            logo:""       
        };
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
        this.data2(temp);      
    }

    handleChange2 = (event) => {
        this.setState({ stateCode: event.target.value })
        temp2 = event.target.value
        this.data3(temp2)
    }

    handleChange3 = (event) => {
        this.setState({ cityCode: event.target.value })
    }



    data = () => {
        fetch("http://localhost:8080/allCountry?id=5af170d60c06c02559273df1", {
            method: "GET",
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                var maindata = [];
                var localdata = []
                result.data.map((item, key) => {
                    maindata.push(item);

                })
                this.setState({ dropDownData: maindata })
            },
            (error) => {
                console.log("error", error)
            }
        )
    }
    data2 = (temp) => {
        fetch("http://localhost:8080/allSelectedState?countryCode="+temp, {
            method: "GET",
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json()).then(
            (result) => {
                var maindata = [];
                var localdata = []
                result.data && result.data.map((item, key) => {
                    maindata.push(item);
                })
                this.setState({ dropDownData2: maindata })
            },
            (error) => {
                console.log("error", error)
            }
        )
    }
    data3 = (temp2) => {
        fetch("http://localhost:8080/allSelectedCity?stateCode=" + temp2, {
            method: "GET",
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                var maindata = [];
                var localdata = []
                result.data && result.data.map((item, key) => {
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
        this.data();
        console.log(this.state.data);
        let id=localStorage.getItem("id")
        if(id==null){
          window.location.href="/login"
        }
        this.setState({id:id});
    }
    handleClose = (e) => {
        e.preventDefault();
        window.location.href="/company";
    }
   

    save = (e) => {
    e.preventDefault();
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
        if(isNaN(this.state.contactNo)){
            return alert("Contact no should be numeric value");       
        }
        if(this.state.contactNo.length < 10 || this.state.contactNo.length > 10){
            return alert("Contact no should be of 10 digits");       
        }

        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const data = new FormData();
        data.append('file', this.state.uploadFile);
        data.append('logo', this.state.logo);
        data.append('id',this.state.id);
        data.append('companyCode', this.state.companyCode);
        data.append('companyName', this.state.companyName);
        data.append('companyGSTNo', this.state.companyGSTNo);
        data.append('addressLine1', this.state.addressLine1);
        data.append('addressLine2', this.state.addressLine2);
        data.append('countryCode', this.state.countryCode);
        data.append('stateCode', this.state.stateCode);
        data.append('cityCode', this.state.cityCode);
        data.append('postalCode', this.state.postalCode);
        data.append('contactNo', this.state.contactNo);
        data.append('isActive', this.state.isActive);
        data.append('createAt',date);
        

        fetch("http://localhost:8080/addCompany",{
             body:data,
             method: "POST",
             cache: 'no-cache',
             mode: 'cors'   
         })
         .then(
             (result) => 
             {  
                if(result.status==200)
                {
                    swal({
                        title: "Company Added Successfully !",
                        icon: "success",
                    });
                }      
                else
                {
                    swal({
                        title: "Something Went Wrong !!" ,
                        icon: "fail",
                    })
                }
             },
             (error) => 
             {
                 console.log("error",error)
             }
         )
    }

    handleCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    fileChangedHandler = (event) => {
        var file =  event.target.files[0];
        var selectedFile= file.name;
        const maxSize = 1048576;
        const size = file.size;
        if(size>maxSize){
            return alert("Image size should be less than 1 Mb!");
        }
        this.setState({logo:selectedFile});
        this.setState({uploadFile:file});
    }

    render() {
        return (<div><form onSubmit={(e)=>{this.save(e)}}>
            <table style={{ width: "600px", height: "450px" }} align="center">
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Company Code </td>
                    <td></td>
                    <td><input type="text" placeholder="Company Code" ref="companyCode" onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Company Name </td>
                    <td></td>
                    <td><input type="text" name="companyName" placeholder="Company Name" ref="companyName" onChange={this.handleChange}/></td>
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
                    <td><input type="text" list="country" placeholder="select country"   onChange={this.handleChange1}/>
                    <datalist id="country">
                    {/* <option  value="Select Country "style={{width:"150px"}}> Select Country Name</option> */}
                    {     
                        this.state.dropDownData && this.state.dropDownData.map((item, index) => {

                        return <option styles={{ width: '350px' }} name={item.countryName} value={item.countryCode} key={index}>{item.countryName}</option>
                        })
                    }
                    </datalist></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>State</td>
                    <td></td>
                    <td><select placeholder="select State" onChange={this.handleChange2}>

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
                    <td><span style={{color:"red"}}>*</span>Upload A Image</td>
                    <td></td>
                     <td>
                   <input type="file" onChange={this.fileChangedHandler}/> 
                    </td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>IsActive</td><td>
                    </td><td>
                    <Checkbox
                          checked={this.state.isActive}
                          onChange={this.handleCheckbox('isActive')}
                          value="isActive"
                          color="primary"
                        />
                    </td>
                </tr>
                <tr>
                    <td align="right"><input type="submit" value="Save" onClick={(e)=>{this.save(e)}} style={{ backgroundColor: "purple" }} /></td>
                    <td></td>
                    <td align="left"><input type="button" onClick={this.handleClose} value="Close" style={{ backgroundColor: "purple" }} /></td>
                </tr>
            </table></form>

        </div>);
    }
}

export default AddCompany; 