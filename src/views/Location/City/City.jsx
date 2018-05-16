import React from "react";
import { Grid } from "material-ui";
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from './modal'
// import Modal from 'react-responsive-modal';

import { RegularCard, Table, ItemGrid } from "components";
var data = [];
class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            mydata: [],
            stateCode: "",
            cityCode:"",
            cityName: "",
            countryCode: "",
            _id: ""
        }
    };

    clickaction = () => {
        this.setState({
            stateCode: "",
            cityCode: "",
            cityName: "",
            countryCode: "",
            _id: ""
        })
        this.setState({ load: true })
    }

    handleEdit = (e, item) => {
        this.setState({ load: true })
        this.setState({ countryCode: item.countryCode })
        this.setState({ stateCode: item.stateCode })
        this.setState({ cityCode: item.cityCode })
        this.setState({ cityName: item.cityName })
        this.setState({ _id: item._id })

    } 
    data = () => {
        fetch("http://localhost:8080/allCity?_id=5af170d60c06c02559273df1", {
            method: "GET",
            cache: 'no-cache',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': "Key@123"
            })
        }).then(res => res.json()).then(
            (result) => {
                console.log(result.data, "aaya")
                var maindata = [];
                var localdata = []
                result.data && result.data.map((item, key) => {
                    localdata.push(item.countryName,item.stateName,item.cityCode,item.cityName)
                    localdata.push(<button onClick={(e) => this.handleEdit(e, item)}>Edit</button>)
                    maindata.push(localdata);
                    localdata = [];
                })


                this.setState({ mydata: maindata })

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
                        plainCard
                        cardTitle="City List"
                        cardSubtitle={
                            <Button style={{ float: "right" }} variant="fab" color="primary" aria-label="add" onClick={this.clickaction} >
                                <AddIcon />
                            </Button>
                        }
                        content={
                            <Table
                                tableHeaderColor="primary"
                                tableHead={[ "Country","State" , "CityCode", "CityName"]}
                                tableData={this.state.mydata}
                            />
                        }

                    />

                </ItemGrid>
                <Modal open={this.state.load} data={{ "_id": this.state._id, "cityName": this.state.cityName, "cityCode": this.state.cityCode, "stateCode": this.state.stateCode, "countryCode": this.state.countryCode }} onClose={this.onClose} />

            </Grid>

        );

    }
}

export default City;
