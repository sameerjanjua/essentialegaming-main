import { Outlet } from "react-router-dom";
import SidebarCmp from "./Sidebar";
import MyNavbar from "./Navbar";
import { useSelector } from "react-redux";

const AppLayout = () => {

    const collapsed = useSelector(res => res.SidebarReducer.collapsed)
    console.log("collapsed : ", collapsed);

    if (collapsed) {

    return (

        <div>
            <div style={{ position: "fixed", height: '100vh' }} >
                <SidebarCmp />
            </div>
            <div style={{ flex: 1, paddingLeft: '250px', transition: "width, left, right, 800ms" }}>
                <MyNavbar dashboard={true} />
                <Outlet />
            </div>
        </div>
    );
    }
    
    else {
        return (

            <div>
                <div style={{ position: "fixed", height: '100vh' }} >
                    <SidebarCmp />
                </div>
                <div style={{ flex: 1, paddingLeft: '80px', transition: "width, left, right, 800ms" }}>
                    <MyNavbar dashboard={true} />
                    <Outlet />
                </div>
            </div>
    
        );
    }
};

export default AppLayout;