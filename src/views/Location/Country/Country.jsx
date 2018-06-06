import React from "react";
import { Grid } from "material-ui";
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from './modal'
import Pagination from 'react-js-pagination'
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import ViewIcon from '@material-ui/icons/ViewList';

import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
// import  'bootstrap/less/bootstrap.less'
// import Modal from 'react-responsive-modal';

import { RegularCard, Table, ItemGrid } from "components";
var data = [];
class Country extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            load: false,
            mydata: [],
            countryName: "",
            countryCode: "",
            _id: "",
            userId: "",
            isActive:false

        }
    };
    componentWillMount(){
        console.log(this.state.data);
        let id=localStorage.getItem("id")
        if(id==null){
          window.location.href="/login"
        }
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
              backgroundColor: "#d5f5e3"
            }
          }
        }
      })

    clickaction = () => {
        
        this.setState({ countryName: "", countryCode: "", _id: "" })
        this.setState({ load: true, options: "add" })
    }

    handleEdit = (e, item) => {
        // console.log(item.isActive,"activa")
    this.setState({ load: true })
    this.setState({countryName: item.countryName ,countryCode: item.countryCode , _id: item._id ,userId:item.createdBy
    ,options:"edit"})

    }


    data = () => {
        axios.get("http://localhost:8080/allCountry?id=5af170d60c06c02559273df1")
            .then(
                (result) => {

                    var maindata = [];
                    var localdata = []
                    console.log(result.data)

                    result.data.data && result.data.data.map((item, key) => {
                        console.log(item.isActive,"active")
                        localdata.push(item.countryCode, item.countryName,item.isActive?"True":"False")
                        localdata.push( <Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,item)}style={{color:"black"}}><EditIcon/></a></Tooltip>)
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
    componentDidMount() {
        this.data()

    }
    onClose = () => {
        this.setState({ load: false });
        this.data();

    };
    
    render() {
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
              <RegularCard
                 cardTitle={<div>Country<Tooltip title="Add Country" id="tooltip-icon"><Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} aria-label="add" variant="fab"onClick={this.clickaction} >
                <AddIcon />
  
              </Button></Tooltip></div>
              }
  
              content={
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["Code", "Name", "IsActive","Action"]}
                      tableData={this.state.mydata}
                  />
              }
              />
  
              </ItemGrid>

                <Modal open={this.state.load} data={{ "_id": this.state._id,"isActive":this.state.isActive , "countryName": this.state.countryName, "countryCode": this.state.countryCode, "userId": this.state.userId }} onClose={this.onClose} />
            </Grid>

        );

    }
}

export default Country;
