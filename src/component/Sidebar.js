import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu, } from "react-pro-sidebar";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';

import { useDispatch, useSelector } from 'react-redux';
import { handleSidebarCol } from '../store/actions/SidebarAction';
import { useFirebase } from '../context/Firebase';
import { fetchForm, setForms } from '../store/actions/FormAction';
import { getUser } from '../store/actions/UserAuth';
import { Spinner } from 'react-bootstrap';


const SidebarCmp = () => {

    const [activeElement, setActiveElement] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const firebase = useFirebase();

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const { userData } = useSelector(state => state.userAuthReducer);
    const fetchedUser = userData;
    console.log("fetched User : ", fetchedUser);
    const getUserData = useSelector(state => state.userAuthReducer.user);
    console.log("Get User : ", getUserData);
    // const fetchedData = useSelector(state => state.formFetchReducer.fetchedData) || [];
    // const formList = fetchedData.map(doc => ({ id: doc.id, ...doc.data() }));
    const formList = useSelector(state => state.formFetchReducer.forms) || [];
    const uniqueCategories = new Set();
    const formComponents = [];

    const profileFunc = async () => {
        navigate(`/profile/${firebase.user.uid}`);
    }

    const titleFunc = async () => {
        navigate(`/`);
    }

    const handleClick = (elementId) => {
        setActiveElement(elementId);
    };

    formList.forEach((form, i) => {
        if (!uniqueCategories.has(form.category)) {
            const categoryStatusLength = formList.filter((data) => data.status === "Approved")
            const categoryLength = categoryStatusLength.filter((data) => data.category === form.category)
            uniqueCategories.add(form.category);
            formComponents.push(
                <MenuItem
                    icon={<SportsEsportsOutlinedIcon style={{ color: '#9966cc' }} />}
                    className={window.location.pathname === `/category/${encodeURIComponent(form?.category)}` ? 'active' : ''}
                    // onClick={() => handleClick(`element${i+10}`)}
                    component={<Link to={`/category/${form.category}`} />}
                >{form.category}</MenuItem>
            );
        }
    });

    useEffect(() => {
        dispatch(handleSidebarCol(!collapsed));
    }, [dispatch, collapsed])

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchForm(firebase, dispatch));
            await dispatch(setForms());
        }
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (firebase.isLoggedIn) {
            console.log("firebase login check");
            dispatch(getUser(firebase, firebase.user.uid))
                .then(() => {
                    console.log("User data updated...");
                })
                .catch((error) => {
                    console.log("Error updating user data: ", error);
                });
        }
    }, [dispatch]);

    return (

        <Sidebar
            collapsed={collapsed}
            backgroundColor='#fff'
            style={{ height: "100vh", color: '#212739' }}
            transitionDuration={800}
        >
            <Menu>
                <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={handleToggleSidebar}
                    style={{ textAlign: "center" }}
                    className='mb-3 mt-3 border-bottom pb-3'
                >
                    {" "}
                    <h3 onClick={titleFunc} className='mb-0'>E-GAMING</h3>
                </MenuItem>

                <MenuItem
                    icon={<DashboardOutlinedIcon style={{ color: '#2E7E9B' }} />}
                    className={window.location.pathname === "/dashboard" ? 'active' : ''}
                    component={
                        <Link
                            to={"/dashboard"}
                        />}
                >Dashboard</MenuItem>

                <MenuItem
                    icon={<ReceiptOutlinedIcon style={{ color: '#228b22' }} />}
                    className={window.location.pathname === "/home" ? 'active' : ''}
                    component={
                        <Link
                            to={"/home"}
                        />}
                >Home</MenuItem>

                <MenuItem
                    icon={<DnsOutlinedIcon style={{ color: '#cc7722' }} />}
                    className={window.location.pathname === "/category" ? 'active' : ''}
                    component={
                        <Link
                            onClick={() => handleClick('element3')}
                            to={"/category"}
                        />}
                >Category List</MenuItem>

                <SubMenu
                    icon={<CategoryOutlinedIcon style={{ color: '#01796f' }} />}
                    label="Categories"
                >
                    {formComponents}
                </SubMenu>

                <MenuItem
                    icon={<RecyclingOutlinedIcon style={{ color: '#800000' }} />}
                    className={window.location.pathname === "/declineforms" ? 'active' : ''}
                    component={
                        <Link
                            onClick={() => handleClick('element4')}
                            to={"/declineforms"}
                        />}
                >Decline Forms</MenuItem>

                <MenuItem
                    icon={<EditIcon color='primary' />}
                    className={window.location.pathname === "/formediting" ? 'active' : ''}
                    component={
                        <Link
                            onClick={() => handleClick('element5')}
                            to={"/formediting"}
                        />}
                >Form Editing</MenuItem>

                <MenuItem
                    icon={<EventIcon color='secondary' />}
                    className={window.location.pathname === "/manageevents" ? 'active' : ''}
                    component={
                        <Link
                            onClick={() => handleClick('element6')}
                            to={"/manageevents"}
                        />}
                >Manage Events</MenuItem>

                <MenuItem
                    onClick={() => {
                        profileFunc();
                        // handleClick('element6');
                    }}
                    className={window.location.pathname === `/profile/${firebase?.user?.uid}` ? 'active' : ''}
                    icon={fetchedUser?.profileImage || getUserData?.photoURL ? (
                        <img
                            src={fetchedUser?.profileImage || getUserData?.photoURL}
                            width="30"
                            height="30"
                            className="rounded-circle active"
                            style={{ objectFit: 'cover' }}
                            onLoad={() => setImageLoaded(false)}
                            onError={() => setImageLoaded(false)}
                        />
                    ) : (
                        <>
                            {
                                imageLoaded ?
                                    <Spinner size="sm" />
                                    : null
                            }
                        </>
                    )

                    }>Profile</MenuItem>
                {/* <MenuItem onClick={profileFunc} icon={<ReceiptOutlinedIcon />}>Profile</MenuItem> */}
                {/* <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
                <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem> */}
            </Menu>
        </Sidebar>

    );
}

export default SidebarCmp;