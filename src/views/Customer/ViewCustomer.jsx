import React from "react";
import { Button} from "material-ui";
import swal from "sweetalert";

class ViewCustomer extends React.Component{
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
                   
                    console.log("error",error)
                }
            )
    }
 
    handleClose=(e)=>{
        e.preventDefault();
        window.location.href="/customer";
    }

    
    render(){
        return (<div>
            <table style={{width:"600px",height:"450px"}} align="center">

                <tr>     

                    <td>Customer Code </td>
                    <td></td>
                    <td><input type="hidden" value={this.state._id} ref="_id"/><input type="text"  ref="customerCode" value={this.state.customerCode} /></td>
                </tr>
                <tr>
                    <td>Customer Name </td>
                    <td></td>
                    <td><input type="text"  value={this.state.customerName} ref="customerName"/></td>
                </tr>
                <tr>
                    <td>Customer GST No</td>
                    <td></td>
                    <td><input type="text"  value={this.state.customerGSTNo} ref="customerGSTNo"/></td>
                </tr>
                <tr>
                    <td>Address Line 1</td>
                    <td></td>
                    <td><input type="text"  value={this.state.addressLine1} ref="addressLine1" /></td>
                </tr>
                <tr>
                    <td>Address Line 2</td>
                    <td></td>
                    <td><input type="text"  value={this.state.addressLine2} ref="addressLine2"/></td>
                </tr>
                <tr>
                    <td>City</td> 
                    <td></td>
                    <td><input type="text" value={this.state.city} ref="city"/></td>
                </tr>
                <tr>
                    <td>State</td><td></td>
                    <td><input type="text" value={this.state.state} ref="state" /></td>
                </tr>
                <tr>
                    <td>Country</td>
                    <td></td>
                    <td><input type="text" value={this.state.country} ref="country" /></td>
                </tr>
                <tr>
                    <td>Postal Code</td>
                    <td></td>
                    <td><input type="text" value={this.state.postalCode} ref="postalCode"/></td>
                </tr>
                <tr>
                    <td>Contact No</td>
                    <td></td>
                    <td><input type="text" value={this.state.contactNo} ref="contactNo"/></td>
                </tr>
                <tr>

                    {/* <td align="right"><input type="submit" value="Update" onClick={this.update} style={{backgroundColor:"purple"}}/></td> */}  
                    <td></td> 
                    <td align="center"><input type="button" onClick={this.handleClose} value="Close" style={{backgroundColor:"purple"}}/></td>
                    <td></td>
                </tr>
            </table>        
        </div>);
    }
}

export default ViewCustomer;