import React from "react";
import { Grid } from "material-ui";
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from './modal'
// import Modal from 'react-responsive-modal';

import { RegularCard, Table, ItemGrid } from "components";
 var data=[];
 class Country extends React.Component 
 {
     constructor(props){
         super(props);
         this.state={
             load:false,
             mydata:[],
             countryName:"",
             countryCode:"",
             _id:""
         }
     };

clickaction=()=>{
    this.setState({ countryName: "", countryCode: "", _id:""})    
this.setState({load:true})
}

handleEdit=(e,item)=>{
        this.setState({ load: true })
    this.setState({countryName:item.countryName})
    this.setState({ countryCode: item.countryCode })
    this.setState({ _id: item._id })
    
    }    


     data = () => {
         fetch("http://localhost:8080/allCountry?_id=5af170d60c06c02559273df1", {
             method: "GET",
             cache: 'no-cache',
             mode: 'cors',
             headers: new Headers({
                 'Content-Type': 'application/json',
                 'authorization': "Key@123"
             })
         }).then(res => res.json()).then(
             (result) => {
                 var maindata = [];
                 var localdata = []
                 console.log(result.data)

                 result.data.map((item, key) => {
                     localdata.push(item.SerialNo, item.countryCode, item.countryName)
                     localdata.push(<button onClick={(e)=>this.handleEdit(e ,item) }>Edit</button>)
                     maindata.push(localdata);
                     localdata = [];
                 })


                 this.setState({ mydata: maindata })
                 console.log(this.state.mydata, "arrsy")
             },
             (error) => {
                 console.log("error", error)
             }
         )
     }
componentDidMount(){
this.data()

}
onClose = () => {
 this.setState({load:false });
 this.data();

};
 
render(){
    return (
        <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
                
                <RegularCard
                    plainCard
                    cardTitle="Country List"
                    cardSubtitle={
                        <Button style={{float:"right"}}variant="fab" color="primary" aria-label="add" onClick={this.clickaction} >
                            <AddIcon />
                        </Button>
                    }
                    content={
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Serial No", "CountryCode", "CountryName"]}
                            tableData={this.state.mydata}
                        />
                        }
                
                />

            </ItemGrid>
            <Modal open={this.state.load} data={{"_id":this.state._id,"countryName":this.state.countryName,"countryCode":this.state.countryCode}} onClose={this.onClose}/>
        </Grid>
       
    );
  
}
 }

export default Country;
