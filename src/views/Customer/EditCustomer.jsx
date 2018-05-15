import React from "react";
import { Button} from "material-ui";
import swal from "sweetalert";

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
            city:"",
            state:"",
            country:"",
            postalCode:"",
            contactNo:""
        };
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
                    this.setState({_id:result.data._id});
                    this.setState({customerCode:result.data.customerCode});
                    this.setState({customerName:result.data.customerName});
                    this.setState({customerGSTNo:result.data.customerGSTNo});
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
        this.setState({customerCode:this.refs.customerCode.value});
        this.setState({customerName:this.refs.customerName.value});
        this.setState({customerGSTNo:this.refs.customerGSTNo.value});
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
        fetch("http://localhost:8080/editCustomer",{
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

export default EditCustomer;