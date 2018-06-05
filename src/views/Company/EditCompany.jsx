import React from "react";
import { Button} from "material-ui";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import Checkbox from 'material-ui/Checkbox';
import $ from "jquery"

var maindata = [];
var dropDownData = [];
var dd;
var temp;
var temp2;
var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
class EditCompany extends React.Component{
    constructor(props){
        super(props);
         this.state={
            _id:"",
            id:"",
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
            updatedAt:"",
            logo:"",
            uploadFile:[],
            isActive:false,
            dropDownData: [],
            dropDownData2: [],
            dropDownData3: [],
            oldLogo:""
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
        }).then(res => res.json())
        .then(
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
        }).then(res => res.json())
        .then(
            (result) => {
                var maindata = [];
                var localdata = []
                console.log(result.data, "kkkloololo")
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
        console.log(temp2, "data3 temp state")
        fetch("http://localhost:8080/allSelectedCity?stateCode=" + temp2, {
            method: "GET",
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': "Key@123"
            })
        }).then(res => res.json())
        .then(
            (result) => {
                var maindata = [];
                var localdata = []
                console.log(result.data, "result.data city data")
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
        this.setState({updatedAt:today});
    }

    handleChange1 = (event) => {
        console.log(event.target.value, "selected country")
        this.setState({ countryCode: event.target.value,stateCode:"",cityCode:"" })
        temp = event.target.value
        this.data2(temp)
        $('.state').val("")
        $('.city').val("")

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
            })
        })
        .then(res => res.json())
        .then(
            (result) => {  
                console.log("this is one company by id in edit",result)
                this.setState({_id:result.data[0]._id});
                this.setState({companyCode:result.data[0].companyCode});
                this.setState({logo:result.data[0].logo});
                this.setState({oldLogo:result.data[0].logo});
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

    handleRemove=()=>{
        const data1 = new FormData();
        data1.append('_id', this.state._id);
        data1.append('logo', this.state.logo);
        data1.append('id',this.state.id);
        data1.append('companyName', this.state.companyName);
        data1.append('updatedAt',this.state.updatedAt);    
        fetch("http://localhost:8080/removeLogo",{
            body:data1,
            method: "POST",
            cache: 'no-cache',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(
            (result) => 
            {
                console.log("removed logo in frontend",result);
                if(result.success==true)
                {
                    swal({
                        title: "Logo Removed Successfully !",
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
       this.setState({logo:""})
    }

    fileHandler=(event)=>{        
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

    handleClose=(e)=>{
        swal2({ 
            text: "Do you want to leave the page ?",
            type:"warning",
            title: '',
            showCancelButton: true,
            confirmButtonColor: '#d9534f',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText:'No' 
        })
        .then((result) => {
            if (result.value) {
                window.location.href="/company";
            }
            else if (result.dismiss === swal2.DismissReason.cancel) {
            }
        })

    }

    update=()=>{
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const data = new FormData();
        data.append('file', this.state.uploadFile);
        data.append('_id', this.state._id);
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
        data.append('updatedAt',this.state.updatedAt);  
        data.append('oldLogo',this.state.oldLogo);        
         
    
        swal2({ 
            text: "Do you want to save the changes ?",
            type:"warning",
            title: '',
            showCancelButton: true,
            confirmButtonColor: '#d9534f',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes', 
            cancelButtonText:'No'
        })
        .then((result) => {
            if(result.value){
                fetch("http://localhost:8080/editCompany",{
                    body:data,
                    method: "POST",
                    cache: 'no-cache',
                    mode: 'cors'
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
                                title: result.msg ,
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
            else if(result.dismiss === swal2.DismissReason.cancel){  
            }
        })       
    }

    render(){
        return (<div>
            <table style={{width:"600px",height:"450px"}} align="center">
                <tr>      
                    <td><span style={{color:"red"}}>*</span>Company Code </td>
                    <td></td>
                    <td style={{textAlign:"center"}}><input type="hidden" value={this.state._id} ref="_id"/><label ref="companyCode" >{this.state.companyCode}</label></td>
                </tr>
                <tr>
                    <td><span style={{color:"red"}}>*</span>Company Name </td>
                    <td></td>
                    <td><input type="text"  value={this.state.companyName} ref="companyName" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Company Logo </td>
                    <td></td>
                    <td><img src={"uploads/"+this.state.logo} width="75" height="50" /><input type="button" value="Remove" onClick={this.handleRemove}/><input type="file" onChange={this.fileHandler}/></td>
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
                    <td><input class="country" type="text" Value={this.state.countryName}  ref="countryCode" list="country"placeholder="select country" onChange={this.handleChange1}/>
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
                    <td><span style={{ color: "red" }}>*</span>State</td><td></td>
                    <td> <input class="state" type="text" Value={this.state.stateName} list="state"  ref="stateCode" placeholder="select State" onChange={this.handleChange2}/>

                      <datalist id="state">
                        {
                            this.state.dropDownData2 && this.state.dropDownData2.map((item, index) => {

                                return <option styles={{ width: '350px' }} name={item.stateName} value={item.stateCode} key={index}>{item.stateName}</option>
                            })
                        }

                    </datalist></td>
                </tr>
                <tr>
                    <td><span style={{ color: "red" }}>*</span>City</td>
                    <td></td>
                    <td> <input class="city" type="text" Value={this.state.cityName} list="city"  ref="stateCode" placeholder="select State" onChange={this.handleChange3}/>

                      <datalist id="city">
                        {
                            this.state.dropDownData3 && this.state.dropDownData3.map((item, index) => {

                                return <option styles={{ width: '350px' }} name={item.cityName} value={item.cityCode} key={index}>{item.cityName}</option>
                            })
                        }

                    </datalist></td>
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
                    </td>
                    <td>
                        <Checkbox selected
                            checked={this.state.isActive}
                            onChange={this.handleCheckbox('isActive')}
                            value="isActive"
                            color="primary"
                        />
                    </td>
                </tr>
                <tr>

                    <td align="right"><input type="submit" value="Update" onClick={this.update} style={{backgroundColor:"#76323f", color:"white"}}/></td>   
                  <td></td>
                    <td align="left"><input type="button" onClick={this.handleClose} value="Close" style={{backgroundColor:"#76323f", color:"white"}}/></td>
                </tr>
            </table>        
        </div>);
    }
}

export default EditCompany;