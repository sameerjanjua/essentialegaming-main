import { Outlet } from "react-router-dom";
import SidebarCmp from "./Sidebar";
import MyNavbar from "./Navbar";
import { useSelector } from "react-redux";
import FooterCmp from "./Footer";

const AppLayoutSec = () => {

    return (

        <div>
                <MyNavbar />
                <Outlet />
                <FooterCmp /> 
        </div>
    );
};

export default AppLayoutSec;