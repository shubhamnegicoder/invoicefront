import React from "react";
import { Button} from "material-ui";
import swal from "sweetalert";

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
            city:"",
            state:"",
            country:"",
            postalCode:"",
            contactNo:""
        };
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
                    this.setState({_id:result.data._id});
                    this.setState({companyCode:result.data.companyCode});
                    this.setState({companyName:result.data.companyName});
                    this.setState({companyGSTNo:result.data.companyGSTNo});
                    this.setState({addressLine1:result.data.addressLine1});
                    this.setState({addressLine2:result.data.addressLine2});
                    this.setState({city:result.data.city});
                    this.setState({state:result.data.state});
                    this.setState({country:result.data.country});
                    this.setState({postalCode:result.data.postalCode});
                    this.setState({contactNo:result.data.contactNo});
                 
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
        this.setState({city:this.refs.city.value});
        this.setState({state:this.refs.state.value});
        this.setState({country:this.refs.country.value});
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
        if(this.state.contactNo.length<10){
            return alert("Contact no should be of 10 digits");       
        }
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
                    <td><span style={{color:"red"}}>*</span>City</td> 
                    <td></td>
                    <td><input type="text" value={this.state.city} ref="city" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>State</td><td></td>
                    <td><input type="text" value={this.state.state} ref="state" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Country</td>
                    <td></td>
                    <td><input type="text" value={this.state.country} ref="country" onChange={this.handleChange}/></td>
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

export default EditCompany;