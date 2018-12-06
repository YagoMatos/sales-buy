import PersonPage from "../views/Dashboard/PersonPage/PersonPage.jsx";
import Dashboard from "../views/Dashboard/Dasboard/Dashboard.jsx";
import OpenAuction from "../views/Dashboard/OpenAuction/OpenAuction.jsx";

var dashboardRoutes = [
   {
    path: "/dashboard",
    name: "Menu",
    icon: "nc-icon nc-bank",
    component: Dashboard
  },
  {
    path: "/auction-participant",
    name: "Leilão",
    icon: "nc-icon nc-calendar-60",
    component: OpenAuction
  },
  {
    path: "/user-page",
    name: "Minha Conta",
    icon: "nc-icon nc-single-02",
    component: PersonPage
  },
];
export default dashboardRoutes;
