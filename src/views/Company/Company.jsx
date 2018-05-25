import React from "react";
import { Grid ,Button} from "material-ui";
import { RegularCard, Table, ItemGrid } from "components";
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
class CompanyList extends React.Component{
    constructor(props){
        super(props);
        this.state={
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

    handleClick=(e)=>{
       // console.log('button cliked');
        e.preventDefault();
        window.location.href="/addCompany";

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
        fetch("http://localhost:8080/allCompany",{  
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
          console.log("result of list company like result",result);
          result.data.forEach((responseData)=>{
            console.log("responseData.isActive",responseData.isActive);
              var dataArray = []; 
              dataArray.push(responseData.companyCode)
              dataArray.push(responseData.companyName)
              dataArray.push(responseData.companyGSTNo)
              // var a1 = responseData.addressLine1; 
              // var a2 = responseData.addressLine2;
              // var address = a1+" "+a2;
              //dataArray.push(address) 
              // dataArray.push(responseData.cityName)
              // dataArray.push(responseData.stateName)
             // dataArray.push(responseData.countryName)
            //  dataArray.push(responseData.postalCode)
            
            dataArray.push(responseData.isActive?"Yes":"No")
            dataArray.push(responseData.contactNo)
             
            dataArray.push(<Button onClick={(e)=>this.handleEdit(e,responseData)}>Edit</Button>)
            dataArray.push(<Button onClick={(e)=>this.handleView(e,responseData)}>View</Button>)
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
            
              
            // {
            //   name: "City",
            //   options: {
            //     filter: true,
            //   }
            // },
            // {
            //   name: "State",
            //   options: {
            //     filter: true
            //   }
            // },
            {
              name: "IsActive",
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
        selectableRows:false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        page: 1,
        viewColumns:true,
        print:false,
        filter:true,
        download:false,
        textLabels: {
          body: {
            noMatch: "No Records Found!!",
            toolTip: "Sort",
          }
        }
  }
        return (<div>
        <Grid container>
        <ItemGrid xs={30} sm={30} md={30}>
            <RegularCard
            cardTitle="Company"
            cardSubtitle={
                <Button style={{ float: "right" }} variant="fab" color="primary" aria-label="add" onClick={this.handleClick} >
                    <AddIcon />
                </Button>}
                />

            
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable title={"Company list"} data={tableData} columns={columns} options={options} />
             
              </MuiThemeProvider>  
        </ItemGrid>
        
        </Grid></div>
    );
    }
    }


export default CompanyList; 
