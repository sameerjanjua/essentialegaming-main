import { Alert, Button, Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, loginUser, setUser } from "../store/actions/UserAuth";

const UserLoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(false);


    const firebase = useFirebase();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/home");
        }
    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SignIn in a user...");
        // const result = await firebase.signInUserWithEmailAndPassword(email, password)
        //     .then((result) => {
        //         console.log("Successfull ", result);
        //         setEmail("");
        //         setPassword("");
        //         const user = result.user;
        //         dispatch(setUser(user));
        //     })
        //     .catch((err) => {
        //         console.log("Error ", err);
        //         setError(true);
        //     })

        setSpinner(true);
        await dispatch(loginUser(firebase, email, password))
            .then(async () => {
                console.log("Successfully signed in!");
                await dispatch(getUser(firebase.user.uid))
                    .then((user) => {
                        console.log("userssssss : ", user);
                    })
                    .catch((error) => {
                        console.log("error : ", error);
                    })
            })
            .catch((error) => {
                console.log("Error ", error);
                setError(true);
            })

        setSpinner(false);
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-5" >Login</h1>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address <span className="text-danger" >*</span></Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(false);
                        }}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password <span className="text-danger" >*</span></Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select Category <span className="text-danger" >*</span></Form.Label>
                    <Form.Select
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setError(false);
                        }}
                        value={category}
                        required
                    >
                        <option>---------Select Option---------</option>
                        <option value="Valorant" >Valorant</option>
                        <option value="Fortnite" >Fortnite</option>
                        <option value="Need For Speed Heat" >Need For Speed Heat</option>
                    </Form.Select>
                </Form.Group>

                {
                    error ?
                        <Alert variant="warning" >
                            Invalid Email / Password / Category.
                        </Alert>
                        : null
                }
                <Button
                    variant="dark"
                    type="submit"
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
    );
}

export default UserLoginPage;