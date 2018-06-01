import DashboardPage from "views/Dashboard/Dashboard.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import City from "../views/Location/City/City";
import State from "../views/Location/State/State";
import Country from "../views/Location/Country/Country";
import Customer from "../views/Customer/Customer.jsx";
import Company from "../views/Company/Company.jsx";
import Login from "../views/login/login";
import CreateInvoice from "../views/Invoice/CreateInvoice/CreateInvoice.jsx";
import ListInvoice from "../views/Invoice/ListInvoice/ListInvoice.jsx";
import Tax from "../views/Tax/Tax.jsx";
import Product from "../views/Product/Product.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications,
  Assignment
} from "@material-ui/icons";
var name= "Welcome" +" "+ localStorage.getItem("name")
const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },

  {
    path: "/customer",
    sidebarName: "Customer",
    icon: Person,
    navbarName:name,
    component: Customer
  },

  {
    path: "/company",
    sidebarName: "Company",
    navbarName: name,
    icon: BubbleChart,
    component: Company
  },

  {
    path: "/invoice",
    sidebarName: "Invoice",
    navbarName: name,
    icon: Assignment,
    childs: [
      {
        path: "/createInvoice",
        sidebarName: "Create Invoice",
        icon: LocationOn,
        navbarName: name,
        component: CreateInvoice
      },

      {
        path: "/InvoiceList",
        sidebarName: "Invoice List",
        navbarName: name,
        icon: LocationOn,
        component: ListInvoice
      }
    ]
  },

  {
    path: "/Product",
    sidebarName: "Product",
    navbarName: name,
    icon: BubbleChart,
    childs: [
      {
        path: "/Product/tax",
        sidebarName: "Tax",
        navbarName: name,
        icon: BubbleChart,
        component: Tax
      },
      {
        path: "/Product/product",
        sidebarName: "Product",
        navbarName: name,
        icon: BubbleChart,
        component: Product
      },
    ]
  },
  {
    path: "/Location",
    sidebarName: "Location",
    navbarName: name,
    icon: LocationOn,
    childs: [
      {
        path: "/Location/country",
        sidebarName: "Country",
        icon: LocationOn,
        navbarName: name,
        component: Country
      }, {
        path: "/Location/state",
        sidebarName: "State",
        navbarName: name,
        icon: LocationOn,
        component: State
      },
      {
        path: "/Location/city",
        sidebarName: "City",
        navbarName: name,
        icon: LocationOn,
        component: City
      }
    ]
  },
  { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
];

export default dashboardRoutes;  