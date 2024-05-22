import { Alert, Button, Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, setSubUser } from "../store/actions/UserAuth";

const UserSignUpPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const firebase = useFirebase();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchedData = async () => {
            if (firebase.isLoggedIn) {
                navigate(`/declineforms/${firebase.user.uid}`);
            }
        }

        fetchedData();

    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true);
        if (email === "" || password === "" || displayName === "" || category === "") {
            setError(true);
        }
        else {
            await dispatch(setSubUser(email, password, displayName, category, firebase))
                .then(async (res) => {
                    console.log("Successfully signed in!", res);
                    await dispatch(getUser(firebase, firebase.user.uid))
                        .then((user) => {
                            console.log("get user...", user);
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
    }

    return (
        <div className="container mt-5 mb-5">
            <h1 className="mb-5" >Sign Up</h1>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address <span className="text-danger" >*</span></Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setError(false);
                        }}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password <span className="text-danger" >*</span></Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError(false);
                        }}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDisplayName">
                    <Form.Label>Display Name <span className="text-danger" >*</span></Form.Label>
                    <Form.Control
                        onChange={(e) => {
                            setDisplayName(e.target.value)
                            setError(false);
                        }}
                        value={displayName}
                        type="text"
                        placeholder="Enter you name"
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
                            Something went wrong.
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
                                {"  Creating Account..."}
                            </>
                        ) : (
                            'Create Account'
                        )
                    }
                </Button>
            </Form>
        </div>
    );
}

export default UserSignUpPage;