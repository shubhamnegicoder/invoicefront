import React from "react";
import { Button} from "material-ui";
import swal from "sweetalert";

class AddCompany extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
        e.preventDefault();
        window.location.href="/company";

    }

    save=()=>{
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
        if(this.state.postalCode==""){
            return alert("Postal code is required ");       
        }
        if(isNaN(this.state.postalCode)){
            return alert("Postal code should be a numeric value");       
        }
        if(this.state.contactNo==""){
            return alert("Contact no is required");       
        }
        // if(this.state.companyCode==""){
        //     return alert("Contact no is required");       
        // }
        fetch("http://localhost:8080/addCompany",{
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
                        title: "Company Added Successfully !",
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
                console.log("error",error)
            }
        )
    }
    render(){
        return (<div>
            <table style={{width:"600px",height:"450px"}} align="center">
                <tr>            
                    <td><span style={{color:"red"}}>*</span>Company Code </td>
                    <td></td>
                    <td><input type="text" placeholder="Company Code" ref="companyCode" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Company Name </td>
                    <td></td>
                    <td><input type="text" placeholder="Company Name" ref="companyName" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Company GST No</td>
                    <td></td>
                    <td><input type="text" placeholder="Company GST No" ref="companyGSTNo" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Address Line 1</td>
                    <td></td>
                    <td><input type="text" placeholder="Address Line 1" ref="addressLine1" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Address Line 2</td>
                    <td></td>
                    <td><input type="text" placeholder="Address Line 2" ref="addressLine2" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>City</td> 
                    <td></td>
                    <td><input type="text" placeholder="City" ref="city" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>State</td><td></td>
                    <td><input type="text" placeholder="State" ref="state" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Country</td>
                    <td></td>
                <   td><input type="text" placeholder="Country" ref="country" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Postal Code</td>
                    <td></td>
                    <td><input type="text" placeholder="Postal Code" ref="postalCode" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Contact No</td>
                    <td></td>
                    <td><input type="text" placeholder="Contact No" ref="contactNo" onChange={this.handleChange}/></td>
                </tr>
                <tr>

                    <td align="right"><input type="submit" value="Save" onClick={this.save} style={{backgroundColor:"purple"}}/></td>   
                  <td></td>
                    <td align="left"><input type="button" onClick={this.handleClose} value="Close" style={{backgroundColor:"purple"}}/></td>
                </tr>
            </table>        
        </div>);
    }
}

export default AddCompany; 