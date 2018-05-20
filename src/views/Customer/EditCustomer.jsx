import React from "react";
import { Button} from "material-ui";
import swal from "sweetalert";
var maindata = [];
var dropDownData = [];
var dd;
var temp;
var temp2;

class EditCustomer extends React.Component{
    constructor(props){
        super(props);

         this.state={
             _id:"",
            customerCode:"",
            customerName:"",
            customerGSTNo:"",
            addressLine1:"",
            addressLine:"",
            cityCode:"",
            stateCode:"",
            countryCode:"",
            cityName:"",
            stateName:"",
            countryName:"",
            postalCode:"",
            contactNo:"",
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

    handleChange1 = (event) => {
        //console.log(event.target.value, "selected country")
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

    componentDidMount(){
        this.fetchCustomerById();
           }

    fetchCustomerById=()=>{
        var val=this.props.location.search;
        var response=val.substring(val.indexOf("=")+1);
        //  console.log("result",response);
        //this.setState({res:});             
        var url="http://localhost:8080/oneCustomer?_id="+response;
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
                    console.log("result of one customer in edit",result);
                    this.setState({_id:result.data[0]._id});
                    this.setState({customerCode:result.data[0].customerCode});
                    this.setState({customerName:result.data[0].customerName});
                    this.setState({customerGSTNo:result.data[0].customerGSTNo});
                    this.setState({addressLine1:result.data[0].addressLine1});
                    this.setState({addressLine2:result.data[0].addressLine2});
                    this.setState({cityCode:result.data[0].cityCode});
                    this.setState({stateCode:result.data[0].stateCode});
                    this.setState({cityName:result.data[0].cityName});
                    this.setState({stateName:result.data[0].stateName});
                    this.setState({countryName:result.data[0].countryName});
                    this.setState({countryCode:result.data[0].countryCode});
                    this.setState({postalCode:result.data[0].postalCode});
                    this.setState({contactNo:result.data[0].contactNo});

                    console.log("this.state.dropDownData2"+this.state.dropDownData2.length);
                },
                (error) => {
                    // alert("error",error)
                    console.log("error",error)
                }
            )
    }
            

    handleChange=()=>{
        this.setState({customerCode:this.refs.customerCode.value});
        this.setState({customerName:this.refs.customerName.value});
        this.setState({customerGSTNo:this.refs.customerGSTNo.value});
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
        window.location.href="/customer";

    }

    update=()=>{
        if(this.state.customerCode==""){
            return alert("Customer code is required");
        }
        if(this.state.customerName==""){
            return alert("Customer name is required");
        }
        if(this.state.customerGSTNo==""){
            return alert("Customer gst no is required");
        }
        if(this.state.addressLine1==""){
            return alert("Address 1 is required");       
        }
        if(this.state.addressLine2==""){
            return alert("Address 2 is required");       
        }
        if(this.state.city==""){
            return alert("City is required");       
        }
        if(this.state.state==""){
            return alert("State is required");       
        }
        if(this.state.country==""){
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
        console.log(this.state,"edit customer")
        var val=this.props.location.search;
        var response=val.substring(val.indexOf("=")+1); 
        fetch("http://localhost:8080/editCustomer?_id="+response,{
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
                //console.log("result of edit is ::",result)
                if(result.success==true)
                {
                    swal({
                        title: "Customer Updated Successfully !",
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

                    <td><span style={{color:"red"}}>*</span>Customer Code </td>
                    <td></td>
                    <td><input type="hidden" value={this.state._id} ref="_id"/><input type="text"  ref="customerCode" value={this.state.customerCode} /></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Customer Name </td>
                    <td></td>
                    <td><input type="text"  value={this.state.customerName} ref="customerName" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Customer GST No</td>
                    <td></td>
                    <td><input type="text"  value={this.state.customerGSTNo} ref="customerGSTNo" onChange={this.handleChange}/></td>
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
                    <td><select placeholder="select country" onChange={this.handleChange1}>
                        <option value="Select "  style={{ width: "150px" }} >Select Country Name</option>
                        {
                            this.state.dropDownData && this.state.dropDownData.map((item, index) => {

                                return {...this.state.countryCode==item.countryCode?<option  selected styles={{ width: '350px' }} name={item.countryName} value={item.countryCode} key={index}>{item.countryName}</option>:<option styles={{ width: '350px' }} name={item.countryName} value={item.countryCode} key={index}>{item.countryName}</option>}
                            })
                        }

                    </select></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>State</td><td></td>
                    <td> <select placeholder="select State" onChange={this.handleChange2}>

                        <option value="Select  " style={{ width: "150px" }}> Select State Name</option>
                        {
                           this.state.dropDownData2.length==0?<option selected styles={{ width: '350px' }} name={this.state.stateName} value={this.state.stateCode}>{this.state.stateName}</option> :this.state.dropDownData2 && this.state.dropDownData2.map((item, index) => {

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
                            this.state.dropDownData3.length==0?<option selected styles={{ width: '350px' }} name={this.state.cityName} value={this.state.cityCode}>{this.state.cityName}</option>
                            :this.state.dropDownData3 && this.state.dropDownData3.map((item, index) => {



                                return <option styles={{ width: '350px' }} name={item.cityName} value={item.cityCode} key={index}>{item.cityName}</option>
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

                    <td align="right"><input type="submit" value="Update" onClick={this.update} style={{backgroundColor:"purple"}}/></td>   
                  <td></td>
                    <td align="left"><input type="button" onClick={this.handleClose} value="Close" style={{backgroundColor:"purple"}}/></td>
                </tr>
            </table>        
        </div>);
    }
}

export default EditCustomer;