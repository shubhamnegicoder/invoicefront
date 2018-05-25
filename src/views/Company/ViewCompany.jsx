import React from "react";
import { Button} from "material-ui";
import swal from "sweetalert";
import Checkbox from 'material-ui/Checkbox';

class ViewCompany extends React.Component{
    constructor(props){
        super(props);

         this.state={
             _id:"",
            companyCode:"",
            companyName:"",
            logo:"",
            companyGSTNo:"",
            addressLine1:"",
            addressLine:"",
            cityCode:"",
            stateCode:"",
            countryCode:"",
            postalCode:"",
            contactNo:"",
            countryName:"",
            stateName:"",
            isActive:"",
            cityName:""
        };
    }

    componentDidMount(){
        this.fetchCompanyById();
           }

    fetchCompanyById=()=>{
        var val=this.props.location.search;
        var response=val.substring(val.indexOf("=")+1); 
        var url="http://localhost:8080/oneCompany?_id="+response;
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
                   console.log("result============++++",result);
                    this.setState({_id:result.data[0]._id});
                    this.setState({companyCode:result.data[0].companyCode});
                    this.setState({companyName:result.data[0].companyName});
                    this.setState({logo:result.data[0].logo});
                    this.setState({companyGSTNo:result.data[0].companyGSTNo});
                    this.setState({addressLine1:result.data[0].addressLine1});
                    this.setState({addressLine2:result.data[0].addressLine2});
                    this.setState({cityCode:result.data[0].cityCode});
                    this.setState({stateCode:result.data[0].stateCode});
                    this.setState({countryCode:result.data[0].countryCode});
                    this.setState({postalCode:result.data[0].postalCode});
                    this.setState({contactNo:result.data[0].contactNo});
                    this.setState({cityName:result.data[0].cityName});
                    this.setState({stateName:result.data[0].stateName});
                    this.setState({ isActive: result.data[0].isActive });
                    this.setState({countryName:result.data[0].countryName});
                 
                },
                (error) => {
                   
                    console.log("error",error)
                }
            )
    }
 
    handleClose=(e)=>{
        e.preventDefault();
        window.location.href="/company";
    }

    
    render(){
        return (<div>
            <table style={{width:"600px",height:"450px"}} align="center">

                <tr>     

                    <td>Company Code </td>
                    <td></td>
                    <td><input type="hidden" value={this.state._id} ref="_id"/><input type="text"  ref="companyCode" value={this.state.companyCode} /></td>
                </tr>
                <tr>
                    <td>Company Name </td>
                    <td></td>
                    <td><input type="text"  value={this.state.companyName} ref="companyName"/></td>
                </tr>
                <tr>
                    <td>Company Logo </td>
                    <td></td>
                   {/* { url = "../../../invoicenode/public'/uploads/"+this.state.logo} */}
                    <td><img src={"uploads/"+this.state.logo} width="75" height="50"/></td>
                </tr>
                <tr>
                    <td>Company GST No</td>
                    <td></td>
                    <td><input type="text"  value={this.state.companyGSTNo} ref="companyGSTNo"/></td>
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
                    <td><input type="text" value={this.state.cityName} ref="cityCode"/></td>
                </tr>
                <tr>
                    <td>State</td>
                    <td></td>
                    <td><input type="text" value={this.state.stateName} ref="stateCode" /></td>
                </tr>
                <tr>
                    <td>Country</td>
                    <td></td>
                    <td><input type="text" value={this.state.countryName} ref="countryCode" /></td>
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
                    <td>IsActive</td><td>
                    </td><td>
                        
                        <input type="text" value={this.state.isActive ? "Yes" : "No"} ref="isActive"/>
                    </td>
                </tr>
                <tr>

                     
                    <td></td> 
                    <td align="center"><input type="button" onClick={this.handleClose} value="Close" style={{backgroundColor:"purple"}}/></td>
                    <td></td>
                </tr>
            </table>        
        </div>);
    }
}

export default ViewCompany;