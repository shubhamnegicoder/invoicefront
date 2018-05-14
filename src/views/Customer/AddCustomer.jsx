import React from "react";
import { Button} from "material-ui";
import swal from "sweetalert";

class AddCustomer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            customerCode:"",
            customerName:"",
            CustomerGSTNo:"",
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

    save=()=>{
        fetch("http://localhost:8080/addCustomer",{
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
                console.log("this is save function....",result);
                // console.log("this is save function....");
                if(result.success==true)
                {
                    swal({
                        title: "Customer Added Successfully !",
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
                //alert("error",error)
                console.log("error",error)
            }
        )
    }
    render(){
        return (<div>
            <table style={{width:"600px",height:"450px"}} align="center">
                <tr>            
                    <td>Customer Code </td>
                    <td>:</td>
                    <td><input type="text" placeholder="Customer Code" ref="customerCode" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Customer Name </td>
                    <td>:</td>
                    <td><input type="text" placeholder="Customer Name" ref="customerName" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Customer GST No</td>
                    <td>:</td>
                    <td><input type="text" placeholder="Customer GST No" ref="customerGSTNo" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Address Line 1</td>
                    <td>:</td>
                    <td><input type="text" placeholder="Address Line 1" ref="addressLine1" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Address Line 2</td>
                    <td>:</td>
                    <td><input type="text" placeholder="Address Line 2" ref="addressLine2" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>City</td> 
                    <td>:</td>
                    <td><input type="text" placeholder="City" ref="city" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>State</td><td> :</td>
                    <td><input type="text" placeholder="State" ref="state" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Country</td>
                    <td>:</td>
                <   td><input type="text" placeholder="Country" ref="country" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Postal Code</td>
                    <td>:</td>
                    <td><input type="text" placeholder="Postal Code" ref="postalCode" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Contact No</td>
                    <td>:</td>
                    <td><input type="text" placeholder="Contact No" ref="contactNo" onChange={this.handleChange}/></td>
                </tr>
                <tr>

                    <td align="right"><input type="submit" value="Save" onClick={this.save} /></td>   
                  <td></td>
                    <td align="left"><input type="button" onClick={this.handleClose} value="Close"/></td>
                </tr>
            </table>        
        </div>);
    }
}

export default AddCustomer;