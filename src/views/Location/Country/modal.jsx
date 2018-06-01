import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Grid, InputLabel } from "material-ui";
import swal from "sweetalert";
import Country from "../Country/Country"
import axios from "axios"
import {
    ProfileCard,
    RegularCard,
    Button,
    CustomInput,
    ItemGrid
} from "components";
import Checkbox from 'material-ui/Checkbox'
import avatar from "assets/img/faces/marc.jpg";
var cardoption;
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { countryCode: '', countryName: '', _id: '', userId: "",isActive:false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        // this.setState({countryname: this.refs.name.value });

    }
    componentWillMount(){
        console.log(this.state.data);
        let id=localStorage.getItem("id")
        if(id==null){
          window.location.href="/login"
        }
    }
    handleCheck(event){
        this.setState({ [event.target.name]: event.target.checked });
    }
    componentWillReceiveProps(newprops) {
        this.setState({ countryCode: newprops.data.countryCode })
        this.setState({ countryName: newprops.data.countryName })
        this.setState({ _id: newprops.data._id })
        this.setState({ userId: newprops.data.userId,
            isActive:newprops.data.isActive})

    }


    handleSubmit = (e) => {
        e.preventDefault();
        var url = "";
        var data = {}


        if (this.state._id != "") {
            url = "http://localhost:8080/editCountry";
            data =
                {
                    countryCode: this.state.countryCode,
                    countryName: this.state.countryName,
                    id: this.state._id,
                    userId: this.state.userId,
                    isActive:this.state.isActive
                };
        }
        else {
            console.log("add")

            url = "http://localhost:8080/addCountry";
            data = {
                "id": "5af170d60c06c02559273df1",
                countryCode: this.state.countryCode,
                countryName: this.state.countryName,
                isActive:this.state.isActive
            }
        }
        axios.post(url, data)
            .then((result) => {
                //access the results here....
                console.log("result = ", result)
                if (result.data.success == true) {
                    console.log()
                    swal({
                        text: "Successfully Done",
                        icon: "success"

                    })
                    this.props.onClose();
                }
                else {
                    swal({
                        title: " Sorry !! this Country Code already exist!",
                        icon: "warning",
                    });
                }
                // this.props.List()

            })



    }


    render() {
        return (
            <div>
                <Modal styles={{ width: '379px' }} open={this.props.open} onClose={this.props.onClose} center>
                    <Grid container >
                        <form onSubmit={this.handleSubmit}>
                            <ItemGrid xs={18} sm={20} md={20}>
                                <RegularCard
                                    {...this.state._id ? cardoption = "Edit Country" : cardoption = "Add Country"}
                                    cardTitle={cardoption}
                                    content={
                                        <div>
                                            <Grid container>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5> Country Code:*</h5>
                                                        <input required readOnly={this.state._id ? "readOnly" : false} type="text" name="countryCode" ref="code" value={this.state.countryCode} onChange={this.handleChange} />
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5>  Country Name:*</h5>
                                                        <input required type="text" ref="name" name="countryName" value={this.state.countryName} onChange={this.handleChange} />
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>  <h5> Is Active *:</h5>
                                                        <input  type="checkbox"  name="isActive" onChange={(event)=>{this.handleCheck(event)}} color="primary"/>
                                                    </label>
                                                </ItemGrid>
                                            </Grid>
                                        </div>
                                    }
                                    footer={<Button color="primary" type="submit" style={{backgroundColor:"#76323f", color:"white"}} round>
                                        Submit</Button>}
                                />
                            </ItemGrid>
                        </form>
                    </Grid>
                </Modal>
            </div>
        );
    }
}


