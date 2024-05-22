import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../context/Firebase";
import { getUser, updateUser } from "../store/actions/UserAuth";
import { useParams } from "react-router-dom";

const ProfilePage = () => {

    const firebase = useFirebase();
    const dispatch = useDispatch();
    const params = useParams();

    const [updateDisplayName, setUpdateDisplayName] = useState("");
    const [updateCountry, setUpdateCountry] = useState("");
    const [updateProfileImage, setUpdateProfileImage] = useState(null);
    const [isUpdating, setIsUpdating] = useState(true);
    const [spinner, setSpinner] = useState(false);



    const userID = params.userID;

    // console.log(userID);


    useEffect(() => {
        dispatch(getUser(firebase, userID))
    }, [dispatch, firebase, userID])


    const { userData } = useSelector(state => state.userAuthReducer);
    const fetchedData = userData;

    console.log("Profile",userData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true);
        setIsUpdating(true);
        await dispatch(updateUser(firebase, userID, updateDisplayName, updateCountry, updateProfileImage));
        setSpinner(false);
        dispatch(getUser(firebase, userID));
        setUpdateProfileImage(null);
    }

    return (
        <Container className="mt-5 mb-5">

            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <div className="d-flex flex-column align-items-center mt-3">
                            <div className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center" style={{ width: '150px', height: '150px' }}>
                                <Card.Img
                                    variant="top"
                                    className="w-100 h-100"
                                    style={{ objectFit: 'cover' }}
                                    src={
                                        updateProfileImage ?
                                            URL.createObjectURL(updateProfileImage)
                                            : (fetchedData && fetchedData.profileImage)
                                    }
                                />
                            </div>
                            <p className="mt-2 font-weight-bold" >{fetchedData && fetchedData.email}</p>
                        </div>

                        <Form onSubmit={handleSubmit} className="justify-content-center p-5" >

                            <Form.Group className="mb-3" controlId="formBasicDisplayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUpdateDisplayName(e.target.value)
                                        setIsUpdating(false);
                                    }
                                    }
                                    defaultValue={fetchedData && fetchedData.displayName}
                                    type="text"
                                    placeholder="Enter you name"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUpdateCountry(e.target.value)
                                        setIsUpdating(false);
                                    }
                                    }
                                    defaultValue={fetchedData && fetchedData.country}
                                    type="text"
                                    placeholder="Enter you country"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicProfileImage">
                                <Form.Label>Profile Image</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUpdateProfileImage(e.target.files[0])
                                        setIsUpdating(false);
                                    }
                                    }
                                    accept="image/*"
                                    type="file"
                                />
                            </Form.Group>

                            <Button
                                variant="dark"
                                type="submit"
                                disabled={isUpdating}
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
                                            {"  Updating..."}
                                        </>
                                    ) : (
                                        'Update Account'
                                    )
                                }
                            </Button>
                        </Form>




                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfilePage;