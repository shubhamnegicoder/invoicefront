import React from "react";
import { Grid } from "material-ui";
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from './modal'
// import Modal from 'react-responsive-modal';

import { RegularCard, Table, ItemGrid } from "components";

 class Country extends React.Component 
 {
     constructor(props){
         super(props);
         this.state={
             load:false
         }
     };

clickaction=()=>{
this.setState({load:true})
}
onClose = () => {
 this.setState({load:false });
};
 
render(){
    return (
        <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
                
                <RegularCard
                    plainCard
                    cardTitle="Country List"
                    cardSubtitle={
                        <Button style={{float:"right"}}variant="fab" color="primary" aria-label="add" onClick={this.clickaction} >
                            <AddIcon />
                        </Button>
                    }
                    content={
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["ID", "Name", "Country", "City", "Salary"]}
                            tableData={[
                                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                                [
                                    "4",
                                    "Philip Chaney",
                                    "$38,735",
                                    "Korea, South",
                                    "Overland Park"
                                ],
                                [
                                    "5",
                                    "Doris Greene",
                                    "$63,542",
                                    "Malawi",
                                    "Feldkirchen in Kärnten"
                                ],
                                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
                            ]}
                        />
                        }
                
                />

            </ItemGrid>
            <Modal open={this.state.load} onClose={this.onClose}/>
        </Grid>
       
    );
}
 }

export default Country;
