/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Accounts from "views/examples/AccountPage.js"
import NewAccount from "views/examples/NewAccount.js"
import ManageAccount from "views/examples/ManageAccount.js"
import Refund from "views/examples/Refund.js"
import InternalTransfer from "views/examples/InternalTransfer.js"
import ExternalTransfer from "views/examples/ExternalTransfer.js"
import Test from "views/examples/Test.js"
import Transactions from "views/examples/Transactions.js"
import Profile from "views/examples/Profile.js"
var routes = [
  {
    path: "/Accounts",
    name: "Account Summary",
    icon: "ni ni-tv-2 text-primary",
    component: Accounts,
    layout: "/admin",
  },
  {
    path: "/Register",
    name: "Register",
    icon: "ni ni-single-02 text-yellow",
    component: Register,
    layout: "/unauth",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-single-02 text-yellow",
    component: Login,
    layout: "/unauth",
  },
  {
    path: "/Test",
    name: "Test",
    icon: "ni ni-single-02 text-yellow",
    component: Test,
    layout: "/unauth",
  },
  {
    path: "/addaccount",
    name: "Add Account",
    icon: "ni ni-single-02 text-yellow",
    component: NewAccount,
    layout: "/auth",
  },
  {
    path: "/ManageAccount",
    name: "Manage Account",
    icon: "ni ni-single-02 text-yellow",
    component: ManageAccount,
    layout: "/auth",
  },
  {
    path: "/refund",
    name: "Refund",
    icon: "ni ni-single-02 text-yellow",
    component: Refund,
    layout: "/auth",
  },
  {
    path: "/internaltransfer",
    name: "Transfer",
    icon: "ni ni-single-02 text-yellow",
    component: InternalTransfer,
    layout: "/admin",
  },
  {
    path: "/externaltransfer",
    name: "Bill payment",
    icon: "ni ni-single-02 text-yellow",
    component: ExternalTransfer,
    layout: "/admin",
  },
  {
    path: "/Transactions",
    name: "Transactions",
    icon: "ni ni-single-02 text-yellow",
    component: Transactions,
    layout: "/admin",
  },
  {
    path: "/Profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/Test",
    name: "test",
    icon: "ni ni-single-02 text-yellow",
    component: Test,
    layout: "/auth",
  }
];
export default routes;
