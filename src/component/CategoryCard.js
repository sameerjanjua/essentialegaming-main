import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, ListGroup, Modal, Spinner } from "react-bootstrap";
import ValorantOne from "../images/ValorantOne.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../context/Firebase";
import { deleteForm, fetchForm, fetchImageURL, updateForm } from "../store/actions/FormAction";
import { authenticateUser } from "../store/actions/UserAuth";

const CategoryCard = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalShowSec, setModalShowSec] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedPhone, setUpdatedPhone] = useState("");
    const [updatedCity, setUpdatedCity] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [updatedRecipt, setUpdatedRecipt] = useState("");
    const [isUpdating, setIsUpdating] = useState(true);
    const [isUpdatingSec, setIsUpdatingSec] = useState(true);
    const [spinner, setSpinner] = useState(false);
    const [passwordGet, setPasswordGet] = useState("");
    const [error, setError] = useState(false);

    const firebase = useFirebase();
    const dispatch = useDispatch();


    const handleImageClick = () => {
        setShowModal(true);
    }

    const HandleModalClose = () => {
        setShowModal(false);
    }

    const formID = props.id;
    const preImage = props.imageURL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true);
        await dispatch(updateForm(firebase, formID, updatedName, updatedEmail, updatedPhone, updatedCity, updatedCategory, updatedRecipt, preImage, updatedStatus))
            .then(async () => {
                setSpinner(false);
                setIsUpdating(true);
                await dispatch(fetchForm(firebase));
                console.log("form updated");
            })
    }

    const handleFormDelete = async (e) => {
        e.preventDefault();
        setSpinner(true);
        await dispatch(authenticateUser(firebase, passwordGet))
            .then(async () => {
                await dispatch(deleteForm(firebase, formID, preImage))
                setSpinner(false);
                setIsUpdatingSec(true);
                await dispatch(fetchForm(firebase));
            })
            .catch((error) => {
                console.log("Password not correct!", error);
                setError(true);
                setSpinner(false);
                setIsUpdatingSec(true);
            })

    }

    console.log("props", props);

    if (props) {
        return (

            <tr>
                <td>{props.index + 1}</td>
                <td>{props.category}</td>
                <td>{props.name}</td>
                <td>{props.email}</td>
                <td>{props.phone}</td>
                <td>{props.city}</td>
                <td>{props.imageURL && !props.imageURL.includes('undefined') ? (
                    <div>
                        <img
                            src={props.imageURL}
                            style={{ width: "100px", cursor: "pointer" }}
                            onClick={handleImageClick}
                        />
                        <Modal 
                            show={showModal} 
                            onHide={HandleModalClose} 
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{props.name}'s Recipt Image</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <img
                                    src={props.imageURL}
                                    style={{ width: "100%", objectFit: 'cover' }}
                                    alt="Recipt"
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={HandleModalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )
                    : ("N/A")
                }

                </td>


                {
                    props.button && (
                        <>
                            <td>{props.status}</td>
                            <td>
                                <div className="d-flex justify-content-between gap-3 align-items-center" >
                                    <Button variant="success" onClick={() => setModalShow(true)} >Update</Button>
                                    {
                                        props.delete ?
                                            <Button variant="danger" onClick={() => setModalShowSec(true)} >Delete</Button>
                                            : null
                                    }

                                    {
                                        <Modal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            {...props}
                                            size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Registration Form
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>

                                                <div className="d-flex flex-column align-items-center mt-3 mb-5">
                                                    {props.imageURL && !props.imageURL.includes('undefined') ? (
                                                        <Card.Img
                                                            variant="top"
                                                            className="w-25"
                                                            style={{ cursor: "pointer" }}
                                                            src={
                                                                updatedRecipt ?
                                                                    URL.createObjectURL(updatedRecipt)
                                                                    : (props.imageURL)
                                                            }
                                                            onClick={handleImageClick}
                                                        />
                                                    )
                                                        : ("N/A")
                                                    }
                                                </div>


                                                <Form onSubmit={handleSubmit} className="d-grid">

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Status</Form.Label>
                                                        <Form.Select
                                                            onChange={(e) => {
                                                                setUpdatedStatus(e.target.value);
                                                                setIsUpdating(false);
                                                            }}
                                                            defaultValue={props.status}
                                                            required
                                                        >
                                                            <option value="Pending" >Pending</option>
                                                            <option value="Approved" >Approved</option>
                                                            <option value="InProcess" >InProcess</option>
                                                            <option value="Decline" >Decline</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicName">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control
                                                            onChange={(e) => {
                                                                setUpdatedName(e.target.value)
                                                                setIsUpdating(false);
                                                            }}
                                                            defaultValue={props.name}
                                                            type="text"
                                                            placeholder="Enter Name"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            onChange={(e) => {
                                                                setUpdatedEmail(e.target.value)
                                                                setIsUpdating(false);
                                                            }}
                                                            defaultValue={props.email}
                                                            type="email"
                                                            placeholder="Enter Email"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Phone Number (WhatsApp Prefered)</Form.Label>
                                                        <Form.Control
                                                            onChange={(e) => {
                                                                setUpdatedPhone(e.target.value)
                                                                setIsUpdating(false);
                                                            }}
                                                            defaultValue={props.phone}
                                                            type="text"
                                                            placeholder="Enter Phone Number"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control
                                                            onChange={(e) => {
                                                                setUpdatedCity(e.target.value)
                                                                setIsUpdating(false);
                                                            }}
                                                            defaultValue={props.city}
                                                            type="text"
                                                            placeholder="Enter City"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Select Category</Form.Label>
                                                        <Form.Select
                                                            onChange={(e) => {
                                                                setUpdatedCategory(e.target.value);
                                                                setIsUpdating(false);
                                                            }}
                                                            defaultValue={props.category}
                                                            required
                                                        >
                                                            <option>---------Select Option---------</option>
                                                            <option value="Valorant" >Valorant</option>
                                                            <option value="Fortnite" >Fortnite</option>
                                                            <option value="Need For Speed Heat" >Need For Speed Heat</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formRecipt">
                                                        <Form.Label>Add Recipt</Form.Label>
                                                        <Form.Control
                                                            onChange={(e) => {
                                                                setUpdatedRecipt(e.target.files[0])
                                                                setIsUpdating(false);
                                                            }}
                                                            type="file"
                                                            accept="image/*"
                                                        />
                                                    </Form.Group>

                                                    <Button
                                                        variant="dark"
                                                        type="submit"
                                                        className="mx-auto w-25 mt-3"
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
                                                                'Update'
                                                            )
                                                        }
                                                    </Button>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={() => setModalShow(false)} variant="dark" >Close</Button>
                                            </Modal.Footer>
                                        </Modal>


                                    }

                                    {
                                        <Modal
                                            show={modalShowSec}
                                            onHide={() => setModalShowSec(false)}
                                            {...props}
                                            size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Delete Form
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>

                                                <p className="text-center">Enter password to delete this Registration Form.</p>
                                                <Form onSubmit={handleFormDelete} className="d-grid">
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control
                                                            onChange={(e) => {
                                                                setPasswordGet(e.target.value)
                                                                setIsUpdatingSec(false);
                                                                setError(false);
                                                            }}
                                                            value={passwordGet}
                                                            type="password"
                                                            placeholder="Enter password"
                                                        />
                                                    </Form.Group>

                                                    {
                                                        error ?
                                                            <Alert variant="warning" >
                                                                Invalid Password.
                                                            </Alert>
                                                            : null
                                                    }
                                                    <p className="text-center">Are you sure you want to delete this Registration Form.</p>
                                                    <Button
                                                        variant="dark"
                                                        type="submit"
                                                        className="mx-auto w-25"
                                                        disabled={isUpdatingSec}
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
                                                                    {"  Deleting..."}
                                                                </>
                                                            ) : (
                                                                'Delete'
                                                            )
                                                        }
                                                    </Button>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={() => setModalShowSec(false)} variant="dark" >Close</Button>
                                            </Modal.Footer>
                                        </Modal>


                                    }

                                </div>
                            </td>
                        </>
                    )
                }

            </tr>
        );
    }

    else {
        return (
            <tr>
                <td>Data Not Found</td>
            </tr>
        );
    }
}

export default CategoryCard;