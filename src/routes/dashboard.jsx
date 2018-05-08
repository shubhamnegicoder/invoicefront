import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import City from "../views/Location/City/City"
import State from "../views/Location/State/State"
import Country from "../views/Location/Country/Country"

import NotificationsPage from "views/Notifications/Notifications.jsx";

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications
} from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/dashboard",
    
    sidebarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "Location",
    sidebarName: "Location",
    navbarName: "Location",
    icon: LocationOn,
    childs: [
      {
        path: "/Location/country",
        sidebarName: "Country",
        icon: LocationOn,
        navbarName: "Country",
        component: Country
      }, {
        path: "/Location/state",
        sidebarName: "State",
        navbarName: "State",
        icon: LocationOn,
        component: State
      },
      {
        path: "/Location/city",
        sidebarName: "City",
        navbarName: "City",
        icon: LocationOn,
        component: City
      }
    ]
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];




export default dashboardRoutes;
