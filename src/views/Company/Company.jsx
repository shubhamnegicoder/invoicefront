import React from "react";
import { Grid ,Button} from "material-ui";
import { RegularCard, Table, ItemGrid } from "components";
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
import Search from '@material-ui/icons/Search';
import Modal from './modal';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import ViewIcon from '@material-ui/icons/ViewList';

class CompanyList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            load:false,
            id:"",
            companyCode:"", 
            companyName:"",
            companyGSTNo:"",
            addressLine1:"",
            addressLine2:"",
            cityName:"",
            stateName:"",
            countryName:"",
            postalCode:"",
            contactNo:"",
            createdBy:"",
            isActive:false,
            data:[]        
        };
    }
    getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTable: {
            root: {
              backgroundColor: "#F08080",
            }
          },
          MUIDataTableBodyCell: {
            root: {
              backgroundColor: "#FFB6C1"
            }
          }
        }
      })

    componentDidMount(){ 
        this.list();
      
       
    }
   componentWillMount(){
    let id=localStorage.getItem("id")
    if(id==null){
      window.location.href="/login"
    }
    this.setState({id:id});
   }
    handleClick=(e)=>{
        e.preventDefault();
        window.location.href="/addCompany";

    }
      handleOpen=()=>{
        this.setState({load : true});
        // this.setState({taxCode:"",taxName:"",cgst:"",igst:"",sgst:"",_id:"",isActive:""});

      }
      onClose = () => {
        this.setState({ load: false });
    };
    onmodal=(data)=>{
      var mainArray = [];
      data.forEach((responseData)=>{
          var dataArray = [];
          dataArray.push(responseData.companyCode)
          dataArray.push(responseData.companyName)
          dataArray.push(responseData.companyGSTNo)
          dataArray.push(responseData.contactNo)
       dataArray.push(responseData.isActive?"Yes":"No")
         //var array = "";
        dataArray.push(<div>
          <Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,responseData)}style={{color:"black"}}><EditIcon/></a></Tooltip>
          <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,responseData)}style={{color:"black"}}><ViewIcon/></a></Tooltip>

          </div>);
       
          //dataArray.push(new Date(responseData.createdAt).toDateString());
          mainArray.push(dataArray)
  
        })
        this.setState({
            data:mainArray
        })
 
     }
    handleEdit=(e,response)=>{
        e.preventDefault();
        this.setState({companyCode:response.companyCode})      
        this.setState({companyName:response.companyName})
        this.setState({companyGSTNo:response.companyGSTNo})
        this.setState({addressLine1:response.addressLine1})
        this.setState({addressLine2:response.addressLine2})
        this.setState({city:response.cityName}) 
        this.setState({state:response.stateName})
        this.setState({country:response.countryName})
        this.setState({postalCode:response.postalCode})
        this.setState({contactNo:response.contactNo})  
      this.setState({ isActive: response.isActive })      
       window.location.href="/editCompany?id="+response._id;
    }

    handleView=(e,response)=>{
        e.preventDefault();
        this.setState({companyCode:response.companyCode})      
        this.setState({companyName:response.companyName})
        this.setState({companyGSTNo:response.companyGSTNo})
        this.setState({addressLine1:response.addressLine1})
        this.setState({addressLine2:response.addressLine2})
        this.setState({city:response.cityName})
        this.setState({state:response.stateName})
        this.setState({country:response.countryName})
        this.setState({postalCode:response.postalCode})
        this.setState({contactNo:response.contactNo})
      this.setState({ isActive: response.isActive })      
       window.location.href="/viewCompany?id="+response._id;
    }

    list=()=>{
        fetch("http://localhost:8080/allCompany?id="+this.state.id,{  
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
          var mainArray = [];
          result.data.forEach((responseData)=>{
              var dataArray = []; 
              dataArray.push(responseData.companyCode)
              dataArray.push(responseData.companyName)
              dataArray.push(responseData.companyGSTNo)
            dataArray.push(responseData.contactNo) 
            dataArray.push(responseData.isActive?"Yes":"No")   
            dataArray.push(<div>
              <Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,responseData)}style={{color:"black"}}><EditIcon/></a></Tooltip>
              <Tooltip id="tooltip-icon" title="View"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,responseData)}style={{color:"black"}}><ViewIcon/></a></Tooltip>
    
              </div>);
           
              //dataArray.push(new Date(responseData.createdAt).toDateString());
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
                 cardTitle={<div>Company<Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} aria-label="add" variant="fab"onClick={this.handleClick} >
                <AddIcon /> </Button><Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} aria-label="add" variant="fab"onClick={this.handleOpen} ><Search/>
  
              </Button></div>
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


export default CompanyList; 
