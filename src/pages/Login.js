import { Button, Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/actions/UserAuth";
import Live_Wallpaper from "../videos/Live_Wallpaper.mp4"
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const firebase = useFirebase();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SignIn in a user...");

        setSpinner(true);
        await dispatch(loginUser(firebase, email, password))
            .then(() => {
                console.log("Successfully signed in!");
                toast.success("Login Successfully!");
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log("Error ", error);
                toast.error("Invalid Credential");
            })

        setSpinner(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

        <div class="login-video d-sm-flex p-0 p-sm-5 justify-content-center">
            <video autoPlay muted loop>
                <source src={Live_Wallpaper} type="video/mp4" />
            </video>
            <div className="bg-white bg-opacity-25 login-bg rounded">
                <h1 className="mb-5 text-center" >Login</h1>
                <Form onSubmit={handleSubmit} className="d-grid" >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="fw-bold ">Email <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                            type="email"
                            placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 relative z-1" controlId="formBasicPassword">
                        <Form.Label className="fw-bold">Password <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="pe-5"
                        />
                        <span
                            className="bg-none password-icon cursor-pointer absolute z-5"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {!showPassword ? (
                                <VisibilityOff className="text-muted" />
                            ) : (
                                <Visibility className="text-muted" />
                            )}
                        </span>
                    </Form.Group>
                    <Form.Text className="text-center text-white">Don't have account? <NavLink to={"/signup"} className="text-warning" >Sign Up</NavLink></Form.Text>
                    <Button
                        variant="warning"
                        type="submit"
                        className="mx-auto w-auto mt-3"
                        disabled={!email || !password}
                    >
                        {
                            spinner ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {"  Loging In..."}
                                </>
                            ) : (
                                'Login'
                            )
                        }
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;