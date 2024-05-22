import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Modal, Spinner } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useDispatch } from "react-redux";
import { submitForm } from "../store/actions/FormAction";
import { toast } from "react-toastify";

const RegisterNowPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [recipt, setRecipt] = useState("");
    const [isUpdating, setIsUpdating] = useState(true);
    const [spinner, setSpinner] = useState(false);
    const [modalShowSec, setModalShowSec] = useState(false);
    const [error, setError] = useState(false);

    const firebase = useFirebase();
    const dispatch = useDispatch();

    console.log("recipt", recipt);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || email === "" || phone === "" || city === "" || category === "") {
            const errorMessage = (
                <span>
                  Fill all required Values(<span className="text-danger">*</span>)
                </span>
              );
            toast.error(errorMessage);
        }
        else {
            setSpinner(true);
            setIsUpdating(true);
            await dispatch(submitForm(name, email, phone, city, category, recipt, firebase))
                .then(() => {
                    setSpinner(false);
                    setModalShowSec(true)
                })
                .catch((error) => {
                    console.log("error : ", error);
                    toast.error(error);
                    setSpinner(false);
                })
        }
    }

    useEffect(() => {
    const isOnline = navigator.onLine;
    
    if (!isOnline) {
        toast.error("Internet Disconnected");
        setSpinner(false);
        setIsUpdating(true);
    }
  }, [handleSubmit]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div>
            <div className="d-flex register-cmp-bg justify-content-center">
                <div className="p-5 m-sm-5 register-cmp rounded">
                    <h1 className="mb-3 text-center text-white">Registration Form</h1>
                    <Form onSubmit={handleSubmit} className="d-grid">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="text-white">Name <span className="text-danger" >*</span></Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setName(e.target.value)
                                    setIsUpdating(false);
                                }}
                                value={name}
                                type="text"
                                placeholder="Enter Name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-white">Email <span className="text-danger" >*</span></Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setIsUpdating(false);
                                }}
                                value={email}
                                type="email"
                                placeholder="Enter Email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="text-white">Phone Number (WhatsApp Prefered) <span className="text-danger" >*</span></Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                    setIsUpdating(false);
                                }}
                                value={phone}
                                type="text"
                                placeholder="Enter Phone Number"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="text-white">City <span className="text-danger" >*</span></Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setCity(e.target.value)
                                    setIsUpdating(false);
                                }}
                                value={city}
                                type="text"
                                placeholder="Enter City"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Select Category <span className="text-danger" >*</span></Form.Label>
                            <Form.Select
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setIsUpdating(false);
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

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="text-white">Add Recipt</Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setRecipt(e.target.files[0])
                                    setIsUpdating(false);
                                }}
                                type="file"
                                accept="image/*"
                            />
                        </Form.Group>

                        <Button
                            variant="danger"
                            type="submit"
                            className="mx-auto w-auto ps-5 pe-5 mt-3"
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
                                        {"  Submiting..."}
                                    </>
                                ) : (
                                    'Submit'
                                )
                            }
                        </Button>
                        {
                            <Modal
                                show={modalShowSec}
                                onHide={() => {
                                    setModalShowSec(false)
                                    setName("");
                                    setEmail("");
                                    setPhone("");
                                    setCity("");
                                    setCategory("");
                                    setRecipt(null);
                                }}
                                size="md"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton className="border-0">
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Registration Form
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Card.Text>Thanks {name} For Registration.</Card.Text>

                                </Modal.Body>
                                <Modal.Footer className="border-0">
                                    <Button
                                        onClick={() => {
                                            setModalShowSec(false);
                                            setName("");
                                            setEmail("");
                                            setPhone("");
                                            setCity("");
                                            setCategory("");
                                            setRecipt(null);
                                        }}
                                        variant="dark"
                                    >Close</Button>
                                </Modal.Footer>
                            </Modal>


                        }
                    </Form>
                </div>
                {/* <div className="w-100"></div> */}
            </div>
        </div>
    );
}

export default RegisterNowPage;