import React from "react";
import { Grid } from "material-ui";
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from './modal'
import axios from 'axios';
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
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>

                    <RegularCard
                        plainCard
                        cardTitle="State List"
                        cardSubtitle={
                            <Button style={{ float: "right" }} variant="fab" color="primary" aria-label="add" onClick={this.clickaction} >
                                <AddIcon />
                            </Button>
                        }
                        content={
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["Country", "StateCode","State","Is Active","Operation"]}
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
