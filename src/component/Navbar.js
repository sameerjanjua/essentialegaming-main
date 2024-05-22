import React, { useEffect, useState } from "react";
import { Button, Container, Nav, NavDropdown, Navbar, Offcanvas, Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, getUser } from "../store/actions/UserAuth";
import "../App.css";

const MyNavbar = (props) => {

    console.log("nav props", props.dashboard);

    const firebase = useFirebase();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(true);

    const { userData } = useSelector(state => state.userAuthReducer);
    const fetchedUser = userData;
    console.log(fetchedUser);

    const logout = async () => {
        const result = await firebase.logOutUser();
        dispatch(clearUser());
        navigate("/");
        setShowOffcanvas(false);
    }

    const profileFunc = async () => {
        navigate(`/profile/${firebase.user.uid}`);
        setShowOffcanvas(false);
    }

    const handleLogin = () => {
        navigate("/login");
    }

    useEffect(() => {
        if (firebase.isLoggedIn) {
            dispatch(getUser(firebase, firebase.user.uid))
                .then(() => {
                    console.log("User data updated...");
                })
                .catch((error) => {
                    console.log("Error updating user data: ", error);
                });
        }
    }, [dispatch, firebase]);

    return (
        <>
            {
                !props.dashboard ? (
                    <Navbar
                        expand="md"
                        expanded={showOffcanvas}
                    >
                        <Container fluid>
                            <Navbar.Brand className="d-md-none p-2"><NavLink to={"/"} className="text-white" >E-GAMING</NavLink></Navbar.Brand>
                            <Navbar.Toggle
                                aria-controls={`offcanvasNavbar-expand-md`}
                                onClick={() => setShowOffcanvas(!showOffcanvas)}
                                className="border-0 bg-warning"
                            />

                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-md`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                                placement="end"
                                show={showOffcanvas}
                                onHide={() => setShowOffcanvas(false)}
                                className="bg-black p-1"
                            >

                                <Offcanvas.Header closeButton className="text-white">
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                                        E-GAMING
                                    </Offcanvas.Title>
                                </Offcanvas.Header>

                                <Offcanvas.Body className="d-md-flex align-items-center justify-content-between p-2">
                                    <Navbar.Brand className="me-0 d-none d-md-block" ><NavLink to={"/"} className="text-white" >E-GAMING</NavLink></Navbar.Brand>

                                    <Nav className="gap-3">
                                        <Nav.Link><NavLink to={"/"} onClick={() => setShowOffcanvas(false)} >Home</NavLink></Nav.Link>
                                        <Nav.Link><NavLink to={"/events"} onClick={() => setShowOffcanvas(false)} >Events</NavLink></Nav.Link>
                                        <Nav.Link><NavLink to={"/registrationform"} onClick={() => setShowOffcanvas(false)} >Register Now</NavLink></Nav.Link>
                                        {
                                            firebase.isLoggedIn ?
                                                <Nav.Link><NavLink to={"/dashboard"} onClick={() => setShowOffcanvas(false)} >Dashboard</NavLink></Nav.Link>
                                                : null
                                        }
                                    </Nav>

                                    <Nav className="">
                                        {
                                            !firebase.isLoggedIn ?
                                                <>
                                                    {/* <Nav.Link><NavLink to={"/signup"} onClick={() => setShowOffcanvas(false)} >Sign Up</NavLink></Nav.Link>
                                                    <Nav.Link><NavLink to={"/login"} onClick={() => setShowOffcanvas(false)} >Login</NavLink></Nav.Link> */}
                                                    <Button variant="warning" className="mt-4 mt-md-0" onClick={() => {setShowOffcanvas(false); handleLogin()}}>Get Started</Button>
                                                </>
                                                :
                                                <NavDropdown
                                                    title={
                                                        <div className="d-inline-flex align-items-center gap-1 text-white" >
                                                            {fetchedUser?.profileImage || firebase?.user?.photoImage ? (
                                                                <img
                                                                    src={fetchedUser?.profileImage || firebase?.user?.photoImage}
                                                                    width="30"
                                                                    height="30"
                                                                    className="rounded-circle"
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
                                                            }
                                                            {fetchedUser?.displayName || firebase?.user?.displayName}
                                                        </div>
                                                    }
                                                    id={`offcanvasNavbarDropdown-expand-md`}
                                                    className="custom-dropdown"

                                                >

                                                    <NavDropdown.Item onClick={profileFunc} className="text-white" >Profile</NavDropdown.Item>

                                                    <NavDropdown.Item onClick={logout} className="text-white" >LogOut</NavDropdown.Item>
                                                </NavDropdown>
                                        }
                                    </Nav>


                                    {/* {
                                        firebase.isLoggedIn ?
                                            <div className="d-md-flex align-items-center w-100">
                                                <Nav className="me-auto gap-3">
                                                    <Nav.Link><NavLink to={"/"} onClick={() => setShowOffcanvas(false)} >Home</NavLink></Nav.Link>
                                                    <Nav.Link><NavLink to={"/events"} onClick={() => setShowOffcanvas(false)} >Events</NavLink></Nav.Link>
                                                    <Nav.Link><NavLink to={"/registrationform"} onClick={() => setShowOffcanvas(false)} >Register Now</NavLink></Nav.Link>
                                                    <Nav.Link><NavLink to={"/dashboard"} onClick={() => setShowOffcanvas(false)} >Dashboard</NavLink></Nav.Link>
                                                </Nav>
                                                <Nav>
                                                    <NavDropdown
                                                        title={
                                                            <div className="d-inline-flex align-items-center gap-1" >
                                                                {fetchedUser?.profileImage || firebase?.user?.photoImage ? (
                                                                    <img
                                                                        src={fetchedUser?.profileImage || firebase?.user?.photoImage}
                                                                        width="30"
                                                                        height="30"
                                                                        className="rounded-circle"
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
                                                                }
                                                                {fetchedUser?.displayName || firebase?.user?.displayName}
                                                            </div>
                                                        }
                                                        id={`offcanvasNavbarDropdown-expand-md`}
                                                        className="custom-dropdown"

                                                    >

                                                        <NavDropdown.Item onClick={profileFunc} >Profile</NavDropdown.Item>

                                                        <NavDropdown.Item onClick={logout}>LogOut</NavDropdown.Item>
                                                    </NavDropdown>
                                                </Nav>
                                            </div>
                                            :
                                            <>
                                                <Nav className="me-auto gap-3" >
                                                    <Nav.Link><NavLink to={"/"} onClick={() => setShowOffcanvas(false)} >Home</NavLink></Nav.Link>
                                                    <Nav.Link><NavLink to={"/events"} onClick={() => setShowOffcanvas(false)} >Events</NavLink></Nav.Link>
                                                    <Nav.Link><NavLink to={"/registrationform"} onClick={() => setShowOffcanvas(false)} >Register Now</NavLink></Nav.Link>
                                                </Nav>
                                                <Nav>
                                                    <Nav.Link><NavLink to={"/signup"} onClick={() => setShowOffcanvas(false)} >Sign Up</NavLink></Nav.Link>
                                                    <Nav.Link><NavLink to={"/login"} onClick={() => setShowOffcanvas(false)} >Login</NavLink></Nav.Link>
                                                    <Nav.Link><NavLink to={"/usersignup"} onClick={() => setShowOffcanvas(false)} >User Sign Up</NavLink></Nav.Link>
                                        <Nav.Link><NavLink to={"/userlogin"} onClick={() => setShowOffcanvas(false)} >User Login</NavLink></Nav.Link>
                                                </Nav>
                                            </>
                                    } */}
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                )
                    :
                    (
                        <Navbar
                            data-bs-theme="light"
                        >
                            <Container fluid>
                                <Nav className="ms-auto">
                                    <Nav.Link onClick={logout} style={{ fontWeight: '600' }} className="me-3 mt-3" >LogOut</Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                    )
            }
        </>

    );
}

export default MyNavbar;