import Dashboard from "../views/Dashboard/Dashboard.jsx";
import Schedule from "../views/Schedule/Schedule.jsx";
import PatientPage from "../views/UserPage/PatientPage.jsx";
import RegisterPage from "../views/UserPage/RegisterPage.jsx";
import SearchPage from "../views/UserPage/SearchPage.jsx";
import PersonPage from "../views/UserPage/PersonPage.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Menu",
    icon: "nc-icon nc-bank",
    component: Dashboard
  },
  {
    path: "/schedule",
    name: "agenda",
    icon: "nc-icon nc-calendar-60",
    component: Schedule
  },
  {
    path: "/user-page",
    name: "Pacientes",
    icon: "nc-icon nc-single-02",
    component: PatientPage
  },
  {
    path: "/patient-register",
    component: RegisterPage
  },
  {
    path: "/patient-search",
    component: SearchPage
  },
  {
    path: "/patient",
    component: PersonPage
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
