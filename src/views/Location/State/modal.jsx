import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Grid, InputLabel } from "material-ui";
import { serialize } from "form-serialize"
import swal from "sweetalert";
import axios from "axios"


import {
    ProfileCard,
    RegularCard,
    Button,
    CustomInput,
    ItemGrid
} from "components";
import avatar from "assets/img/faces/marc.jpg";

var maindata = [];
var dd,cardoption;
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { countryCode:'', stateCode: '', stateName: '',dropDownData:[], _id: '', userId: "",isActive:""};

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
    componentDidMount(){
        this.data();
    }
    handleChange1 = (event) => {
        // console.log(event.target.value)
        this.setState({ countryCode:event.target.value })
        // console.log(this.state.countryCode, "set hui")
    }
    componentWillReceiveProps(newprops) {
        // console.log(newprops, "will  receive ")
        this.setState({ countryCode: newprops.data.countryCode })
        this.setState({ stateCode: newprops.data.stateCode })
        this.setState({ stateName: newprops.data.stateName })
        this.setState({ _id: newprops.data._id })
        this.setState({ userId:newprops.data.userId,
            isActive:newprops.data.isActive})

    }
    
    data = () => {
        fetch("http://localhost:8080/allCountry?id=5af170d60c06c02559273df1", {
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
                // console.log(result.data,"kkk")
                result.data && result.data.map((item, key) => {
                    maindata.push(item);
                  
                })


                this.setState({ dropDownData: maindata })
                // console.log(this.state.dropDownData, "arrsy")
            },
            (error) => {
                console.log("error", error)
            }
        )
    }
 
    dd = this.data()


    handleSubmit = (e) => {
        e.preventDefault();
        var url = "";
        var data = {}


        if (this.state._id != "") {
            console.log("edit")
            url = "http://localhost:8080/editState";
            data =
                {
                    countryCode: this.state.countryCode,
                    stateCode: this.state.stateCode,
                    stateName: this.state.stateName,
                    isActive:this.state.isActive,
                    id:this.state._id,
                    userId: this.state.userId,

                };
        }
        else {
            console.log("add")

            url = "http://localhost:8080/addState";
            data = {
                "id": "5af170d60c06c02559273df1",
                countryCode: this.state.countryCode,
                stateCode: this.state.stateCode,
                stateName: this.state.stateName,
                isActive:this.state.isActive
            }
        }
        // console.log(data)
        axios.post(url, data)
            .then((result) => {
                //access the results here....
                // console.log("result = ", result)
                if (result.data.success == true) {
                    // console.log()
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
                {/* {console.log(this.state.dropDownData,"drop")} */}
                <Modal styles={{ width: '379px' }} open={this.props.open} onClose={this.props.onClose} center>
                    <Grid container >
                        <form onSubmit={this.handleSubmit}>
                            <ItemGrid xs={18} sm={20} md={20}>
                                <RegularCard
                                    {...this.state._id ? cardoption = "Edit State" : cardoption = "Add State"}
                                    cardTitle={cardoption}
                                    content={
                                        <div>
                                            <Grid container>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5> Select Country:</h5>
                                                        <select placeholder="select country" readOnly={this.state._id ? "readOnly" : false}   onChange={this.handleChange1}>
                                                            <option value="Select Country "style={{width:"150px"}}> Select Country Name</option>
                                                         {     
                                                              this.state.dropDownData && this.state.dropDownData.map((item, index) => {
                                                              

                                                                     
                                                                    return <option styles={{ width: '350px' }} name={item.countryName} value={item.countryCode} key={index}>{item.countryName}</option>
                                                                })
                                                         }

                                                         </select>
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5> State Code:</h5>
                                                        <input required type="text" readOnly={this.state._id ? "readOnly" : false} name="stateCode" ref="code" value={this.state.stateCode} onChange={this.handleChange} />
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5>  State Name:</h5>
                                                        <input  required type="text" ref="name" name="stateName" value={this.state.stateName} onChange={this.handleChange} />
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
                                    footer={<Button color="primary" style={{backgroundColor:"#76323f", color:"white"}} type="submit" round>
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


