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
var dropDownData=[];
var dd;
var temp;
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { countryCode: '', stateCode: '', cityCode: '', cityName: '', dropDownData: [], dropDownData2: [], userId: "",isActive:""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        // this.setState({countryname: this.refs.name.value });

    }
    handleCheck(event){
        this.setState({ [event.target.name]: event.target.checked });
    }
    handleChange1 = (event) => {
        console.log(event.target.value)
        this.setState({countryCode:event.target.value })
        temp=event.target.value
        this.data2(temp)

       
      
    }

    handleChange2 = (event) => {
        console.log(event.target.value)
        this.setState({ stateCode: event.target.value })
        console.log(this.state.stateCode, "set hui")
    }

    componentWillReceiveProps(newprops) {
        console.log(newprops, "jjj")
        this.setState({ countryCode: newprops.data.countryCode })
        this.setState({ stateCode: newprops.data.stateCode })
        this.setState({ cityCode: newprops.data.cityCode })

        this.setState({ cityName: newprops.data.cityName })
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
                console.log(result.data,"kkk")
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
    data2 = (temp) => {
        console.log(this.state.countryCode, "set hui in url")
        fetch("http://localhost:8080/allSelectedState?countryCode="+temp, {
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
                console.log(result.data, "kkkloololo")
                result.data && result.data.map((item, key) => {
                    maindata.push(item);

                })


                this.setState({ dropDownData2: maindata })
                // console.log(this.state.dropDownData, "arrsy")
            },
            (error) => {
                console.log("error", error)
            }
        )
    }
   componentDidMount(){
       this.data()
   }
    
    
   
    
   

    // handleSubmit(event) {
    //     event.preventDefault();
    //     console.log(this.state,"state jo form se aayegi")
    //     const formdata = { "_id": "5af170d60c06c02559273df1", "countryCode": this.state.countryCode, "stateCode":this.state.stateCode,"cityCode":this.state.cityCode, "cityName": this.state.cityName }
    //     fetch("http://localhost:8080/addCity", {
    //         body: JSON.stringify(formdata),
    //         method: "POST",
    //         cache: 'no-cache',
    //         mode: 'cors',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'authorization': "Key@123"
    //         })
    //     }).then(res => res.json()).then(
    //         (result) => {
    //             if (result.success == true) {
    //                 swal({
    //                     title: "City added!",
    //                     icon: "success",
    //                 });

    //             }
    //             else{
    //                 swal({
    //                     title: " Sorry !! this CityCode already exist!",
    //                     icon: "warning",
    //                 });

    //             }
               
    //         },
    //         (error) => {
    //             console.log("error", error)
    //         }
    //     )
    //     // var data= new FormData(event.target.elements.countryCode.value)
    // }



    handleSubmit = (e) => {
        e.preventDefault();
        var url = "";
        var data = {}


        if (this.state._id != "") {
            console.log("edit")
            url = "http://localhost:8080/editCity";
            data =
                {
                    countryCode: this.state.countryCode,
                    stateCode: this.state.stateCode,
                    cityCode: this.state.cityCode,
                    cityName: this.state.cityName,
                    isActive:this.state.isActive,
                    id:this.state._id,
                    userId: this.state.userId,
                };
        }
        else {
            console.log("add")

            url = "http://localhost:8080/addCity";
            data = {
                "id": "5af170d60c06c02559273df1",
                countryCode: this.state.countryCode,
                stateCode: this.state.stateCode,
                cityCode: this.state.cityCode,
                cityName: this.state.cityName,
                isActive:this.state.isActive
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
                                    cardTitle="Add State"
                                    content={
                                        <div>
                                            <Grid container>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5> Select Country:</h5>
                                                        <select placeholder="select country"   onChange={this.handleChange1}>
                                                         <option  value="Select Country "style={{width:"150px"}}> Select Country Name</option>
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
                                                        <h5> Select State:</h5>
                                                        <select placeholder="select State" onChange={this.handleChange2}>

                                                            <option value="Select  " style={{ width: "150px" }}> Select State Name</option>
                                                            {
                                                                this.state.dropDownData2 && this.state.dropDownData2.map((item, index) => {



                                                                    return <option styles={{ width: '350px' }} name={item.stateName} value={item.stateCode} key={index}>{item.stateName}</option>
                                                                })
                                                            }

                                                        </select>
                                                    </label>
                                                </ItemGrid>

                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5> City Code:</h5>
                                                        <input required type="text" readOnly={this.state._id ? "readOnly" : false}  name="cityCode" ref="code" value={this.state.cityCode} onChange={this.handleChange} />
                                                    </label>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={15}>
                                                    <label>
                                                        <h5>  City Name:</h5>
                                                        <input  required type="text" ref="name" name="cityName" value={this.state.cityName} onChange={this.handleChange} />
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
                                    footer={<Button color="primary" type="submit" round>
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


