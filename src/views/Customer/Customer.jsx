import React from "react";
import { Grid } from "material-ui";
import { RegularCard, Table, ItemGrid } from "components";
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import Button from 'material-ui/Button';
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';

class CustomerList extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
          
                data:[]        
        };
    }
  

    componentDidMount(){ 
        this.list();
    }

    handleClick=(e)=>{
        console.log('button cliked');
        e.preventDefault();
        window.location.href="/addCustomer";

    }

    handleEdit=(e,response)=>{
        e.preventDefault();
        this.setState({customerCode:response.customerCode})      
        this.setState({customerName:response.customerName})
        this.setState({customerGSTNo:response.customerGSTNo})
        this.setState({addressLine1:response.addressLine1})
        this.setState({addressLine2:response.addressLine2})
        this.setState({cityCode:response.cityName})
        this.setState({stateCode:response.stateName})
        this.setState({countryCode:response.countryName})
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
        this.setState({city:response.city})
        this.setState({state:response.state})
        this.setState({country:response.country})
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
        // 'authorization':"Key@123"
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
              //dataArray.push(responseData.addressLine1)
              //dataArray.push(responseData.addressLine2)
              dataArray.push(responseData.cityName)
              dataArray.push(responseData.stateName)
              dataArray.push(responseData.countryName)
              //dataArray.push(responseData.postalCode)
              dataArray.push(responseData.contactNo)
             // dataArray.push(responseData.isActive)
              dataArray.push(<Button onClick={(e)=>this.handleEdit(e,responseData)} >Edit</Button>)
             dataArray.push(<Button  onClick={(e)=>this.handleView(e,responseData)}>View</Button>)
              //dataArray.push(new Date(responseData.createdAt).toDateString());
              mainArray.push(dataArray)
      
            })
           // console.log("main Array is",mainArray);
            this.setState({
                data:mainArray
            })
            },
            (error) => {
               // alert("error",error)
              console.log("error",error)
        }
      )
      }
      

    render(){
        const columns = [
            {
              name: "Code",
              options: {
                filter: true,
                sort:true
              }
            },      
            {
              name: "Name",
              options: {
                filter: true,
                sort:true
              }
            },
            {
              name: "GST No",
              options: {
                filter: false,
              }
            },
            
              
            {
              name: "City",
              options: {
                filter: true,
              }
            },
            {
              name: "State",
              options: {
                filter: true
              }
            },
            {
              name: "Country",
                options: {
                  filter: true
                }
              },
              {
                name: "Contact No",
                  options: {
                    filter: true
                  }
                },
                {
                name: "Action",
                     options: {
                        filter: true
                      }
                    },
                    {
                    name: "Action",
                         options: {
                         filter: true
                          }
                        },
              
                      
      ];
      var tableData= this.state.data;
      const options = {
        filter: true,
        selectableRows:false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        page: 1,
        viewColumns:false,
        print:false,
        filter:false,
        download:false,
        textLabels: {
          body: {
            noMatch: "Sorry, no matching records found",
            toolTip: "Sort",
          }
        }
  }
        return (
        <Grid container>
        <ItemGrid xs={30} sm={30} md={30}>
            <RegularCard
         cardTitle="Customer List"
            cardSubtitle={
                <Button style={{ float: "right" }} variant="fab" color="primary" aria-label="add" onClick={this.handleClick} >
                    <AddIcon />
                </Button>}
            />
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable title={"Customer list"} data={tableData} columns={columns} options={options} />
              </MuiThemeProvider>  
        </ItemGrid>
        
        </Grid>
    );
    }
    }


export default CustomerList; 
