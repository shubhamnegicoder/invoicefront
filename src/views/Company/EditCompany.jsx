import React from "react";
import { Button} from "material-ui";
import swal from "sweetalert";
import Checkbox from 'material-ui/Checkbox';

var maindata = [];
var dropDownData = [];
var dd;
var temp;
var temp2;

class EditCompany extends React.Component{
    constructor(props){
        super(props);

         this.state={
             _id:"",
            companyCode:"",
            companyName:"",
            companyGSTNo:"",
            addressLine1:"",
            addressLine:"",
            cityCode:"",
            stateCode:"",
            countryCode:"",
            postalCode:"",
            contactNo:"",
             isActive:false,
            dropDownData: [],
            dropDownData2: [],
            dropDownData3: [],
        };
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
        console.log(temp, "data2 temp country ")
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
        console.log(temp2, "data3 temp state")
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
                console.log(result.data, "result.data city data")
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

    handleChange1 = (event) => {
        console.log(event.target.value, "selected country")
        this.setState({ countryCode: event.target.value })
        temp = event.target.value
        this.data2(temp)

    }

    handleChange2 = (event) => {

        this.setState({stateCode: event.target.value })
        console.log(this.state.stateCode, "state code")
        temp2 = event.target.value
        this.data3(temp2)

    }

    handleChange3 = (event) => {
        console.log("handle 3")
        this.setState({ cityCode: event.target.value })
        console.log(this.state.cityCode, "city code")
        console.log(this.state.stateCode, "state code")
        console.log(this.state.countryCode, "country code")
    }

    handleCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    }

    componentDidMount(){
        this.fetchCompanyById();
           }

    fetchCompanyById=()=>{
        var val=this.props.location.search;
        var response1=val.substring(val.indexOf("=")+1); 
        var url="http://localhost:8080/oneCompany?_id="+response1;
            fetch(url ,{  
                method: "GET",
                cache: 'no-cache', 
                mode: 'cors',
                headers:  new Headers({
                    'Content-Type': 'application/json'
                    // 'authorization':"Key@123"
                })
            })
            .then(res => res.json())
            .then(
                (result) => { 
                    console.log("this is one company by id in edit",result)
                    this.setState({_id:result.data[0]._id});
                    this.setState({companyCode:result.data[0].companyCode});
                    this.setState({companyName:result.data[0].companyName});
                    this.setState({companyGSTNo:result.data[0].companyGSTNo});
                    this.setState({addressLine1:result.data[0].addressLine1});
                    this.setState({addressLine2:result.data[0].addressLine2});
                    this.setState({cityCode:result.data[0].cityCode});
                    this.setState({stateCode:result.data[0].stateCode});
                    this.setState({countryCode:result.data[0].countryCode});
                    this.setState({cityName:result.data[0].cityName});
                    this.setState({stateName:result.data[0].stateName});
                    this.setState({countryName:result.data[0].countryName});
                    this.setState({postalCode:result.data[0].postalCode});
                    this.setState({contactNo:result.data[0].contactNo});
                    this.setState({ isActive: result.data[0].isActive});
                    this.data2(this.state.countryCode);
                    this.data3(this.state.stateCode);
                },
                (error) => {
                    // alert("error",error)
                    console.log("error",error)
                }
            )
    }
            

    handleChange=()=>{
        this.setState({companyCode:this.refs.companyCode.value});
        this.setState({companyName:this.refs.companyName.value});
        this.setState({companyGSTNo:this.refs.companyGSTNo.value});
        this.setState({addressLine1:this.refs.addressLine1.value});
        this.setState({addressLine2:this.refs.addressLine2.value});
        this.setState({cityCode:this.refs.cityCode.value});
        this.setState({stateCode:this.refs.stateCode.value});
        this.setState({countryCode:this.refs.countryCode.value});
        this.setState({postalCode:this.refs.postalCode.value});
        this.setState({contactNo:this.refs.contactNo.value});
    }

    handleClose=(e)=>{
       // alert('button cliked');
        e.preventDefault();
        window.location.href="/company";

    }

    update=()=>{
        if(this.state._id==""){
            return alert("_id is required");       
        }
        if(this.state.companyCode==""){
            return alert("Company code is required");       
        }
        if(this.state.companyName==""){
            return alert("Company name is required");       
        }
        if(this.state.companyGSTNo==""){
            return alert("Company gst no is required");       
        }
        if(this.state.addressLine1==""){
            return alert("Address 1 is required");       
        }
        if(this.state.addressLine2==""){
            return alert("Address 2 is required");       
        }
        if(this.state.cityCode==""){
            return alert("City is required");       
        }
        if(this.state.stateCode==""){
            return alert("State is required");       
        }
        if(this.state.countryCode==""){
            return alert("Country is required");       
        }
        if(this.state.postalCode=="" ){
            return alert("Postal code is required  ");       
        }
        if(isNaN(this.state.postalCode)){
            return alert("Postal code should be a numeric value");       
        }
        if(this.state.contactNo==""){
            return alert("Contact no is required");       
        }
        if(this.state.contactNo.length<10){
            return alert("Contact no should be of 10 digits");       
        }
        console.log(this.state.countryCode,"update country",this.state.stateCode,"state ",this.state.cityCode,"city")
        fetch("http://localhost:8080/editCompany",{
            body:JSON.stringify(this.state),
            method: "POST",
            cache: 'no-cache',
            mode: 'cors',
            headers:  new Headers({
                'Content-Type': 'application/json'
                // 'authorization':"Key@123"
            })
        })
        .then(res => res.json())
        .then(
            (result) => 
            {
                console.log(result,"this is update function in edit company")
                if(result.success==true)
                {
                    swal({
                        title: "Company Updated Successfully !",
                        icon: "success",
                    });
                }      
                else
                {
                    swal({
                        title: "Something went wrong !!" ,
                        icon: "fail",
                    })
                }
            },
            (error) => 
            {
                console.log("error",error);
            }
        )
    }
    render(){
        return (<div>
            <table style={{width:"600px",height:"450px"}} align="center">

                <tr>      

                    <td><span style={{color:"red"}}>*</span>Company Code </td>
                    <td></td>
                    <td><input type="hidden" value={this.state._id} ref="_id"/><input type="text"  ref="companyCode" value={this.state.companyCode} /></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Company Name </td>
                    <td></td>
                    <td><input type="text"  value={this.state.companyName} ref="companyName" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Company GST No</td>
                    <td></td>
                    <td><input type="text"  value={this.state.companyGSTNo} ref="companyGSTNo" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Address Line 1</td>
                    <td></td>
                    <td><input type="text"  value={this.state.addressLine1} ref="addressLine1" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Address Line 2</td>
                    <td></td>
                    <td><input type="text"  value={this.state.addressLine2} ref="addressLine2" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>Country</td>
                    <td></td>
                    <td><select ref="countryCode" placeholder="select country" onChange={this.handleChange1}>
                        <option value="Select Country " style={{ width: "150px" }}> Select Country Name</option>
                        {
                            this.state.dropDownData && this.state.dropDownData.map((item, index) => {

                                return this.state.countryCode==item.countryCode ?
                                <option selected styles={{ width: '350px' }} name={item.countryName} value={item.countryCode} key={index}>{item.countryName}</option>
                                :
                                <option styles={{ width: '350px' }} name={item.countryName} value={item.countryCode} key={index}>{item.countryName}</option>
                            })
                        }

                    </select></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>State</td><td></td>
                    <td> <select ref="stateCode" placeholder="select State" onChange={this.handleChange2}>

                        <option value="Select  " style={{ width: "150px" }}> Select State Name</option>
                        {
                            this.state.dropDownData2 && this.state.dropDownData2.map((item, index) => {

                                return this.state.stateCode==item.stateCode?
                                <option selected styles={{ width: '350px' }} name={item.stateName} value={item.stateCode} key={index}>{item.stateName}</option>
                                :
                                <option styles={{ width: '350px' }} name={item.stateName} value={item.stateCode} key={index}>{item.stateName}</option>
                            })
                        }

                    </select></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>City</td>
                    <td></td>
                    <td><select ref="cityCode" placeholder="select State" onChange={this.handleChange3}>

                        <option value="Select  " style={{ width: "150px" }}> Select city Name</option>
                        {
                            this.state.dropDownData3 && this.state.dropDownData3.map((item, index) => {



                                return this.state.cityCode==item.cityCode?
                                <option selected styles={{ width: '350px' }} name={item.cityName} value={item.cityCode} key={index}>{item.cityName}</option>
                                :
                                <option styles={{ width: '350px' }} name={item.cityName} value={item.cityCode} key={index}>{item.cityName}</option>
                            })
                        } 

                    </select></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Postal Code</td>
                    <td></td>
                    <td><input type="text" value={this.state.postalCode} ref="postalCode" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Contact No</td>
                    <td></td>
                    <td><input type="text" value={this.state.contactNo} ref="contactNo" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>IsActive</td><td>
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

                    <td align="right"><input type="submit" value="Update" onClick={this.update} style={{backgroundColor:"purple"}}/></td>   
                  <td></td>
                    <td align="left"><input type="button" onClick={this.handleClose} value="Close" style={{backgroundColor:"purple"}}/></td>
                </tr>
            </table>        
        </div>);
    }
}

export default EditCompany;