import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Grid, InputLabel } from "material-ui";

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
        this.state = { id: '',countryname:'' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
            this.setState({ id: this.refs.code.value });
        this.setState({countryname: this.refs.name.value });

    }

    handleSubmit(event) {
        event.preventDefault();
        var  data = new FormData(event.target);
        console.log(data,"daa",event.target.value)
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
                                                    Country Code:
                                                 <input type="number" name="counrtycode"ref="code"value={this.state.id} onChange={this.handleChange} />
                                                </label>
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={12} md={15}>
                                            <label>
                                                Country Name:
                                           <input type="text" ref="name" name="countryname" value={this.state.countryname} onChange={this.handleChange} />
                                           </label>     
                                         </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                    footer={<Button color="primary" type="submit"round>
                                        Add</Button>}
                            />
                        </ItemGrid>
                        </form>
                    </Grid>
                </Modal>
            </div>
        );
    }
}


