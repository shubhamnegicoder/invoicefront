import React from "react";
import { Grid } from "material-ui";
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from './modal'
import axios from 'axios';
import MUIDataTable from "mui-datatables";
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
  
    data = () => {
        axios.get("http://localhost:8080/allState?id=5af170d60c06c02559273df1")
            .then(
                (result) => {
                    console.log(result.data.data," get all state")
                var maindata = [];
                var localdata = []
           result.data.data && result.data.data.map((item, key) => {
                    localdata.push(item.countryName,item.stateCode, item.stateName,item.isActive?"True":"False")
                    localdata.push(<button onClick={(e) => this.handleEdit(e, item)}>Edit</button>)
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
        const columns = [
            {
              name: "Country",
              options: {
                filter: true,
                sort:true
              }
            },      
            {
              name: "State Code",
              options: {
                filter: true,
                sort:true
              }
            },
            {
              name: "State",
              options: {
                filter: true
              }
            },
            {
                name: "Is Active",
                options: {
                  filter: true
                }
              },
              {
                name: "Action"
            }        
      ];
      var tableData= this.state.mydata;
    
      const options = {
        filter: true,
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
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>

                    <RegularCard
                        plainCard
                        cardTitle={<h2><b>State</b></h2>}
                        cardSubtitle={
                            <Button style={{ float: "right" }} variant="fab" color="primary" aria-label="add" onClick={this.clickaction} >
                                <AddIcon />
                            </Button>
                        }
                    />
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={"State list"}  columns={columns} options={options} data={tableData}/>
                      </MuiThemeProvider> 


                </ItemGrid>
                <Modal open={this.state.load} data={{ "_id": this.state._id, "isActive":this.state.isActive, "stateName": this.state.stateName, "stateCode": this.state.stateCode , "countryCode": this.state.countryCode ,"userId": this.state.userId , }} onClose={this.onClose} />
               
            </Grid>

        );

    }
}

export default State ;
