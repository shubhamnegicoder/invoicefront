import DashboardPage from "views/Dashboard/Dashboard.jsx";
import City from "../views/Location/City/City";
import State from "../views/Location/State/State";
import Country from "../views/Location/Country/Country";
import Customer from "../views/Customer/Customer.jsx";
import Company from "../views/Company/Company.jsx";
import CreateInvoice from "../views/Invoice/CreateInvoice/CreateInvoice.jsx";
import ListInvoice from "../views/Invoice/ListInvoice/ListInvoice.jsx";
import CreateBill from '../views/BillOfSupply/CreateBill/createBill.jsx';
import Tax from "../views/Tax/Tax.jsx";
import Product from "../views/Product/Product.jsx";
import ListBill from "../views/BillOfSupply/ListBill/ListBill"

import {
  Dashboard,
  Person,
  BubbleChart,
  LocationOn,
  Assignment
} from "@material-ui/icons";
var name = "Welcome" + " " + localStorage.getItem("name")
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
    navbarName: name,
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
        path: "/CreateInvoice",
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
    path: "/bill",
    sidebarName: "Bill of Supply",
    navbarName: name,
    icon: Assignment,
    childs: [
      {
        path: "/CreateBill",
        sidebarName: "Create Bill",
        icon: LocationOn,
        navbarName: name,
        component: CreateBill
      },
      {
        path: "/BillList",
        sidebarName: "Bill List",
        navbarName: name,
        icon: LocationOn,
        component: ListBill
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