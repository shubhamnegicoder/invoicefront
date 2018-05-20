import React from "react";
import { Grid ,Button} from "material-ui";
import { RegularCard, Table, ItemGrid } from "components";
import AddIcon from '@material-ui/icons/Add';
//import MUIDataTable from "mui-datatables";
//import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
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
            data:[]        
        };
    }
    // getMuiTheme = () => createMuiTheme({
    //     overrides: {
    //       MUIDataTable: {
    //         root: {
    //           backgroundColor: "#F08080",
    //         }
    //       },
    //       MUIDataTableBodyCell: {
    //         root: {
    //           backgroundColor: "#FFB6C1"
    //         }
    //       }
    //     }
    //   })

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
          result.data.forEach((responseData)=>{
              var dataArray = []; 
              dataArray.push(responseData.companyCode)
              dataArray.push(responseData.companyName)
              dataArray.push(responseData.companyGSTNo)
              // var a1 = responseData.addressLine1;
              // var a2 = responseData.addressLine2;
              // var address = a1+" "+a2;
              //dataArray.push(address) 
              dataArray.push(responseData.cityName)
              dataArray.push(responseData.stateName)
              dataArray.push(responseData.countryName)
            //  dataArray.push(responseData.postalCode)
              dataArray.push(responseData.contactNo)
             // dataArray.push(responseData.isActive)
              dataArray.push(<Button onClick={(e)=>this.handleEdit(e,responseData)}>Edit Details</Button>)
             dataArray.push(<Button onClick={(e)=>this.handleView(e,responseData)}>View Details</Button>)
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
      //   const columns = [
      //       {
      //         name: "Code",
      //         options: {
      //           filter: true,
      //           sort:true
      //         }
      //       },      
      //       {
      //         name: "Name",
      //         options: {
      //           filter: true,
      //           sort:true
      //         }
      //       },
      //       {
      //         name: "GST No",
      //         options: {
      //           filter: false,
      //         }
      //       },
            
              
      //       {
      //         name: "City",
      //         options: {
      //           filter: true,
      //         }
      //       },
      //       {
      //         name: "State",
      //         options: {
      //           filter: true
      //         }
      //       },
      //       {
      //         name: "Country",
      //           options: {
      //             filter: true
      //           }
      //         },
      //         {
      //           name: "Contact No",
      //             options: {
      //               filter: true
      //             }
      //           },
      //           {
      //           name: "Action",
      //                options: {
      //                   filter: true
      //                 }
      //               },
      //               {
      //               name: "Action",
      //                    options: {
      //                    filter: true
      //                     }
      //                   },
              
                      
      // ];
      //var tableData= this.state.data;
      //console.log(tableData,"medha")
      // const options = {
      //   filter: true,
      //   selectableRows:false,
      //   filterType: 'dropdown',
      //   responsive: 'stacked',
      //   rowsPerPage: 10,
      //   page: 1,
      //   viewColumns:false,
      //   print:false,
      //   filter:false,
      //   download:false,
      //   textLabels: {
      //     body: {
      //       noMatch: "Sorry, no matching records found",
      //       toolTip: "Sort",
      //     }
      //   }
  //}
        return (
        <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
            cardTitle="Company List"
            cardSubtitle={
                <Button style={{ float: "right" }} variant="fab" color="primary" aria-label="add" onClick={this.handleClick} >
                    <AddIcon />
                </Button>}
            content={
              <Table
              tableHeaderColor="primary"
              tableHead={["Code","Name","GST No", "City","State","Country","Contact No","Action"]}
              tableData={this.state.data}
              />
          }
                />

            
            {/* <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable title={"Company list"} data={tableData} columns={columns} options={options} />
              </MuiThemeProvider>   */}
        </ItemGrid>
        
        </Grid>
    );
    }
    }


export default CompanyList; 
