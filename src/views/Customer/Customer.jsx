import React from "react";
import { Grid ,Button} from "material-ui";
import { RegularCard, Table, ItemGrid } from "components";

class CustomerList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            customerCode:"",
            customerName:"",
            customerGSTNo:"",
            addressLine1:"",
            addressLine2:"",
            city:"",
            state:"",
            country:"",
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
              dataArray.push(responseData.city)
              dataArray.push(responseData.state)
              dataArray.push(responseData.country)
              dataArray.push(responseData.postalCode)
              dataArray.push(responseData.contactNo)
             // dataArray.push(responseData.isActive)
              dataArray.push(<Button  class="RegularCard-purpleCardHeader-287" style={{color:"white"}}>Edit Details</Button>)
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
        return (
        <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
            cardTitle="Customer"
            cardSubtitle={<Button style={{float:"right",color:"white"}} onClick={this.handleClick}>Add Customer</Button>}
            content={
                <Table
                tableHeaderColor="primary"
                tableHead={["Code","Name","GST No", "City","State","Country","Postal Code","Contact No","Action"]}
                tableData={this.state.data}
                />
            }
            />
        </ItemGrid>
        
        </Grid>
    );
    }
    }


export default CustomerList; 
