import React from "react";
import { Grid } from "material-ui";
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from './modal'
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import ViewIcon from '@material-ui/icons/ViewList';

import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
// import Modal from 'react-responsive-modal';

import { RegularCard, Table, ItemGrid } from "components";
var data = [];
class State extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            mydata: [],
            stateCode: "",
            stateName: "",
            countryCode: "",
            _id: "",  
            userId: "",
            isActive:false
        }
    };
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
        this.setState({  stateCode: "",
            stateName: "",
            countryCode: "",
            _id: ""})
        this.setState({ load: true })
    }
    handleEdit = (e, item) => {
        this.setState({ load: true })
        this.setState({ countryCode: item.countryCode })
        this.setState({ stateName: item.stateName })
        this.setState({ stateCode: item.stateCode })
        this.setState({ _id: item._id ,userId:item.createdBy
            ,options:"edit"})

            console.log(this.state,"pass as props")

    } 
    componentWillMount(){
        console.log(this.state.data);
        let id=localStorage.getItem("id")
        if(id==null){
          window.location.href="/login"
        }
    }
  
    data = () => {
        axios.get("http://localhost:8080/allState?id=5af170d60c06c02559273df1")
            .then(
                (result) => {
                    console.log(result.data.data," get all state")
                var maindata = [];
                var localdata = []
           result.data.data && result.data.data.map((item, key) => {
                    localdata.push(item.countryName,item.stateCode, item.stateName,item.isActive?"True":"False")
                    localdata.push(<Tooltip id="tooltip-icon" title="Edit"><a href="javascript:void(0)" onClick={(e)=>this.handleEdit(e,item)}style={{color:"black"}}><EditIcon/></a></Tooltip>)
                    maindata.push(localdata);
                    localdata = [];
                })


                this.setState({ mydata: maindata })
               
            },
            (error) => {
                // console.log("error", error)
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
                 cardTitle={<div>State<Button style={{float: "right" , backgroundColor:"#76323f",  color:"white"}} aria-label="add" variant="fab"onClick={this.clickaction} >
                <AddIcon />
  
              </Button></div>
              }
  
              content={
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["Country","Code", "Name", "IsActive","Action"]}
                      tableData={this.state.mydata}
                  />
              }
              />
  
              </ItemGrid>
                <Modal open={this.state.load} data={{ "_id": this.state._id, "isActive":this.state.isActive, "stateName": this.state.stateName, "stateCode": this.state.stateCode , "countryCode": this.state.countryCode ,"userId": this.state.userId , }} onClose={this.onClose} />
               
            </Grid>

        );

    }
}

export default State ;
