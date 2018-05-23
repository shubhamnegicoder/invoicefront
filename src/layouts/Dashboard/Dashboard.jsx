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
// import Login from "../../views/login/login"
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
var blog,token,dd,token1,show;
var side=false
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
      //  console.log(prop.path,"path",prop.component)
      if (prop.redirect)
         return <Redirect from={prop.path} to={prop.to} key={key} />;
         if(prop.childs)
      { 
        prop.childs.map((item,index)=>{
          //  console.log("childs",item.path,item.component)
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
    sidebar:[],
    showSideBar:localStorage.getItem("show")
  }; 
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });

  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
   
  }
getQuery=(sParam)=>{
    var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    
  }

show=(token)=>{
  token1=localStorage.getItem("token")
  console.log(token1,"localstorage data")
  console.log(token,"query data")
    if(token1==token && token!="" && token !==undefined){
      alert()
      this.setState({showSideBar:true})
      localStorage.setItem("show",true)

     
      

    }
 else
  {
    // this.setState({showSideBar:false})
    localStorage.removeItem("token")
    localStorage.removeItem("show")
    // window.location.reload()
  }
  }
  
  componentDidMount() {
  
    if(navigator.platform.indexOf('Win') > -1){
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    dashboardRoutes.map((item,key)=>{
        var name=item.sidebarName
        this.state.sidebar.push({[item.sidebarName]:false})
    })
    
    this.setState({sidebar:this.state.sidebar})
    token=this.getQuery('token');
    this.show(token)

  }

    
    // this.forceUpdate()


  componentDidUpdate() {
    if(localStorage.getItem("show")==true){
      alert("abhiu")
      this.setState({showSideBar:true})
    }
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
  //  console.log("sidebar state",this.state.sidebar)
  };
  render() {
    console.log(this.state,"ab kya hua tujhe sidebar")
   
    // localStorage.removeItem("token")
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
       {this.state.showSideBar?<Sidebar
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
        />:<div></div>}
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
