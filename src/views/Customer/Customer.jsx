import React from "react";
import { Grid } from "material-ui";
import { RegularCard, Table, ItemGrid } from "components";
import AddIcon from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import Modal from './modal';
import Button from 'material-ui/Button';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import ViewIcon from '@material-ui/icons/ViewList';
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';

class CustomerList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            load : false,
            customerCode:"",
            customerName:"",
            customerGSTNo:"",
            addressLine1:"",
            addressLine2:"",
            cityCode:"",
            stateCode:"",
            countryCode:"",
            postalCode:"",
            contactNo:"",
            isActive:"",
          
                data:[]        
        };
    }

    componentDidMount(){ 
        this.list();  
    }

    componentWillMount(){
      let id=localStorage.getItem("id")
      if(id==null){
        window.location.href="/login"
      }
    }

    handleClick=(e)=>{
      e.preventDefault();
      window.location.href="/addCustomer";

    }

    handleOpen=()=>{
      this.setState({load : true});
      }

    onClose = () => {
      this.setState({ load: false });
    };
    onmodal=(data)=>{
     console.log(data,"yha hu")
     var mainArray = [];
     data.forEach((responseData)=>{
         var dataArray = [];
         dataArray.push(responseData.customerCode)
         dataArray.push(responseData.customerName)
         dataArray.push(responseData.customerGSTNo)
         dataArray.push(responseData.contactNo)
      dataArray.push(responseData.isActive?"Yes":"No")
      dataArray.push(<div>
        <Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,responseData)}style={{color:"black"}}><EditIcon/></a></Tooltip>
        <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={(e)=>this.handleView(e,responseData)}style={{color:"black"}}><ViewIcon/></a></Tooltip>
        </div>);
         mainArray.push(dataArray)
       })
       this.setState({
           data:mainArray
       })

    }
    handleEdit=(e,response)=>{
        e.preventDefault();
        this.setState({customerCode:response.customerCode})      
        this.setState({customerName:response.customerName})
        this.setState({customerGSTNo:response.customerGSTNo})
        this.setState({addressLine1:response.addressLine1})
        this.setState({addressLine2:response.addressLine2})
        this.setState({cityCode:response.cityCode})
        this.setState({stateCode:response.stateCode})
        this.setState({countryCode:response.countryCode})
        this.setState({postalCode:response.postalCode})
        this.setState({contactNo:response.contactNo})      
       window.location.href="/editCustomer?id="+response._id;
    }

    handleView=(e,response)=>{
        e.preventDefault();
        this.setState({customerCode:response.customerCode})      
        this.setState({customerName:response.customerName})
        this.setState({customerGSTNo:response.customerGSTNo})
        this.setState({addressLine1:response.addressLine1})
        this.setState({addressLine2:response.addressLine2})
        this.setState({cityCode:response.cityCode})
        this.setState({stateCode:response.stateCode})
        this.setState({countryCode:response.countryCode})
        this.setState({postalCode:response.postalCode})
        this.setState({contactNo:response.contactNo})      
       window.location.href="/viewCustomer?id="+response._id;
    }

    list=()=>{
        fetch("http://localhost:8080/allCustomer",{  
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
          var mainArray = [];
          result.data.forEach((responseData)=>{
              var dataArray = [];
              dataArray.push(responseData.customerCode)
              dataArray.push(responseData.customerName)
              dataArray.push(responseData.customerGSTNo) 
              dataArray.push(responseData.contactNo)
           dataArray.push(responseData.isActive?"Yes":"No")
            dataArray.push(<div>
              <Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,responseData)}style={{color:"black"}}><EditIcon/></a></Tooltip>
              <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={(e)=>this.handleView(e,responseData)}style={{color:"black"}}><ViewIcon/></a></Tooltip>
              </div>);
              mainArray.push(dataArray)
            })
            this.setState({
                data:mainArray
            })
            },
            (error) => {
              console.log("error",error)
        }
      )
      }
      

    render(){
        return (
            <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
               cardTitle={<div>Customer<Tooltip id="tooltip-icon" title="Add Customer"><Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} aria-label="add" variant="fab"onClick={this.handleClick} >
              <AddIcon /> </Button></Tooltip><Tooltip id="tooltip-icon" title="Search"><Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} aria-label="add" variant="fab"onClick={this.handleOpen} ><Search/>

            </Button></Tooltip></div>
            }

            content={
                <Table
                    tableHeaderColor="primary"
                    tableHead={["Code", "Name","GST NO" , "Contact No", "IsActive","Action"]}
                    tableData={this.state.data}
                />
            }
            />

            </ItemGrid>
            </Grid> 
         
            <Modal open={this.state.load} data={this.onmodal}  onClose={this.onClose} />
            </div>
    );
    }
    }


export default CustomerList; 
