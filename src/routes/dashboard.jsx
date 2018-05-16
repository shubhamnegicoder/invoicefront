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
    component: Customer
  },
  
  {
    path: "/company",
    sidebarName: "Company",
   // navbarName: "Company",
    icon: BubbleChart,
    component: Company
  },

  {
    path: "/invoice",
    sidebarName: "Invoice",
    navbarName: "Invoice",
    icon: Assignment,
    childs: [
      {
        path: "/createInvoice",
        sidebarName: "Create Invoice",
        icon: LocationOn,
        navbarName: "Invoice Creation",
        component: CreateInvoice
      },
      
      {
        path: "/InvoiceList",
        sidebarName: "Invoice List",
        navbarName: "List of Invoices",
        icon: LocationOn,
        component: ListInvoice
      }
    ]
  },
  
  {
    path: "Product",
    sidebarName: "Product",
    navbarName: "Product",
    icon: BubbleChart,
    childs: [
      {
        path: "/Product/product",
        sidebarName: "Product", 
        icon: BubbleChart,
        navbarName: "Product",
        component: Product
      }, {
        path: "/Product/tax",
        sidebarName: "Tax", 
        navbarName: "Tax",   
        icon: BubbleChart,
        component: Tax
      }
      
    ]
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