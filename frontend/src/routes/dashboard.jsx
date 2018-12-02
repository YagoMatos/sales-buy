import Admin from "../views/Admin/Admin/Admin.jsx";
import Item from "../views/Admin/Item/Item.jsx";
import Auction from "../views/Admin/Auction/Auction.jsx";
import PatientPage from "../views/UserPage/PatientPage.jsx";
import RegisterPage from "../views/UserPage/RegisterPage.jsx";
import SearchPage from "../views/UserPage/SearchPage.jsx";
import PersonPage from "../views/UserPage/PersonPage.jsx";

var adminRoutes = [
  {
    path: "/admin",
    name: "Menu",
    icon: "nc-icon nc-bank",
    component: Admin
  },
  {
    path: "/auction",
    name: "Leilão",
    icon: "nc-icon nc-calendar-60",
    component: Auction
  },
  {
    path: "/item",
    name: "Estoque",
    icon: "nc-icon nc-single-02",
    component: Item
  },
  { redirect: true, path: "/", pathTo: "/admin", name: "Dashboard" }
];
export default adminRoutes;
