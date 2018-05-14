import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Grid, InputLabel } from "material-ui";
import { serialize} from "form-serialize"
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
import avatar from "assets/img/faces/marc.jpg";
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {countryCode: '',countryName:'' ,_id:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
            this.setState({ [event.target.name]: event.target.value });
        // this.setState({countryname: this.refs.name.value });

    }
    componentWillReceiveProps(newprops){
       console.log(newprops,"jjj")
        this.setState({countryCode:newprops.data.countryCode })
       this.setState({countryName:newprops.data.countryName})
        this.setState({ _id: newprops.data._id })
       
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     const formdata = {"_id": "5af170d60c06c02559273df1","countryCode":this.state.countryCode,"countryName":this.state.countryName}
    //     fetch("http://localhost:8080/addCountry", {
    //         body:JSON.stringify(formdata),
    //         method: "POST",
    //         cache: 'no-cache',
    //         mode: 'cors',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'authorization': "Key@123"
    //         })
    //     }).then(res => res.json()).then(
    //             (result) => {
    //             if(result.success==true)
    //             {
    //                 swal({
    //                     title: "Country added!",
    //                     icon: "success",
    //                 });
                   
    //             }
    //             else {
    //                 swal({
    //                     title: " Sorry !! this Country Code already exist!",
    //                     icon: "warning",
    //                 });

    //             }
                             
    //                  },
    //             (error) => {
    //                 console.log("error", error)
    //             }
    //         )
    //     // var data= new FormData(event.target.elements.countryCode.value)
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        var url = "";
        var data = {}


        if (this.state._id != "") {
            console.log("edit")
            url = "http://localhost:8080/editCountry";
            data =
                {
                   countryCode:this.state.countryCode,
                   countryName:this.state.countryName,
                    _id: this.state._id
                };
        }
        else {
            console.log("add")

            url = "http://localhost:8080/addCountry";
            data = {
                "id":"5af170d60c06c02559273df1",
                countryCode: this.state.countryCode,
                countryName: this.state.countryName,
            }
        }
        console.log(data)
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
                    // this.props.handleClose();

                }
                else{
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
                <Modal styles={{width:'379px'}} open={this.props.open} onClose={this.props.onClose} center>
                    <Grid container >
                        <form onSubmit={this.handleSubmit}>
                        <ItemGrid xs={18} sm={20} md={20}>
                            <RegularCard
                                cardTitle="Add Country"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={15}>
                                                <label>
                                                   <h5> Country Code:</h5>
                                                    <input required type="text" name="countryCode"ref="code"value={this.state.countryCode} onChange={this.handleChange} />
                                                </label>
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={12} md={15}>
                                            <label>
                                              <h5>  Country Name:</h5>
                                                    <input required type="text" ref="name" name="countryName" value={this.state.countryName} onChange={this.handleChange} />
                                           </label>     
                                         </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                    footer={<Button color="primary" type="submit"round>
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


