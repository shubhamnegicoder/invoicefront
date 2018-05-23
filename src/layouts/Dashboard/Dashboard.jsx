import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect ,Router} from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";
import ViewInvoice from "../../views/Invoice/ViewInvoice/ViewInvoice"
import { Header, Footer, Sidebar } from "components";
import dashboardRoutes from "routes/dashboard.jsx";
import AddCustomer from "../../views/Customer/AddCustomer";
import EditCustomer from "../../views/Customer/EditCustomer";
import ViewCustomer from "../../views/Customer/ViewCustomer";
import AddCompany from "../../views/Company/AddCompany";
import EditCompany from "../../views/Company/EditCompany";
import ViewCompany from "../../views/Company/ViewCompany";
import appStyle from "assets/jss/material-dashboard-react/appStyle.jsx";
import Dashboard from "routes/dashboard";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { createBrowserHistory } from "history";
const hist = createBrowserHistory();
var routing=[] 
const switchRoutes = ( 
  <Switch >
    <Route path="/addCustomer" component={AddCustomer}></Route>
    <Route path="/addCompany" component={AddCompany}></Route>
    <Route path="/editCompany" component={EditCompany}></Route>
    <Route path="/viewCompany" component={ViewCompany}></Route>
    <Route path="/viewCustomer" component={ViewCustomer}></Route>
    <Route path="/editCustomer" component={EditCustomer}></Route>
    <Route path="/viewInvoice" component={ViewInvoice}></Route>

    {dashboardRoutes.map((prop, key) => { 
      routing=[]
       console.log(prop.path,"path",prop.component)
      if (prop.redirect)
         return <Redirect from={prop.path} to={prop.to} key={key} />;
         if(prop.childs)
      { 
        prop.childs.map((item,index)=>{
           console.log("childs",item.path,item.component)
            routing.push(<Route exact path={item.path} component={item.component} key={index}/>)
          })
        
      } 
       routing.push(<Route exact path={prop.path} component={prop.component} key={key} />)
        return routing
    })}

  </Switch> 
);
class App extends React.Component {
  state = {
    mobileOpen:false, 
    open:false,
    collapse:false,
    sidebar:[]
  }; 
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  componentDidMount() {
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    dashboardRoutes.map((item,key)=>{
        var name=item.sidebarName
        this.state.sidebar.push({[item.sidebarName]:false})
    })
    this.setState({sidebar:this.state.sidebar})
  }
  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }
  collapse=()=>{
    alert("collapse")
    this.setState({collapse: !this.state.collapse });

  }

  handleClick = (ref) => {
    this.state.sidebar.map((item,key)=>{
    
       if(ref==Object.keys(item))
       { 
         item[Object.keys(item)] = !item[Object.keys(item)]
       }
    })
   this.setState({sidebar:this.state.sidebar });
   console.log("sidebar state",this.state.sidebar)
  };
  render() {
    console.log(this.state.sidebar,"sidebar")
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Invoice"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          handleClick={this.handleClick}
          handleCollapse={this.collapse}
           state={this.state.open}
           collapse={this.state.collapse}
           sidebar={this.state.sidebar}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
          
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {/* {this.getRoute() ? <Footer /> : null} */}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
