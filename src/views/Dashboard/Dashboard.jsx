import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility
} from "@material-ui/icons";
import { withStyles, Grid } from "material-ui";

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

var cardoptions={}
class Dashboard extends React.Component {
  state = {
    value: 0,
    cardoptions:[{totalinvoice:""},{totalsales:""}]
  };
  componentWillMount(){
    let id=localStorage.getItem("id")
    if(id==""&& id==undefined){
      window.location.href="/login"
    }
    
  }
  tickets=()=>{
    axios.get("http://localhost:8080/countInvoice")
      .then(
        (result) => {
          this.setState({ [cardoptions.totalinvoice]: result.data.data })
        },
        (error) => {
          // console.log("error", error)
        }
      )
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="Total Invoice"
              description="49/50"
              small="GB"
              statIcon={Warning}
              statIconColor="danger"
            
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="Total sales"
              description="$34,245"
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
