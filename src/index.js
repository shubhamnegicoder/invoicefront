import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.2.0";

import indexRoutes from "routes/index.jsx";
import Login from "./views/login/login";
import Dashboard from "./layouts/Dashboard/Dashboard"
 const hist = createBrowserHistory();

  ReactDOM.render(
    <Router history={hist}>
   
    <div> 
      <Route path="/login" component={Login}></Route>
        {indexRoutes.map((prop, key) => {
          return <Route  path={prop.path} component={prop.component} key={key} />;
        })}
      {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        
      
      </div>
    </Router>,
    document.getElementById("root")
  );
