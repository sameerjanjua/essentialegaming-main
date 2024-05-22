import React, { useState } from "react";
import { Alert, Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addEvent } from "../../../store/actions/ManageEventAction";
import { useFirebase } from "../../../context/Firebase";
import { toast } from "react-toastify";

const CreateEventModal = ({ modal, toggle }) => {

    const [eventName, setEventName] = useState("");
    const [eventImage, setEventImage] = useState(null);
    const [eventLocation, setEventLocation] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
    const [eventShortDes, setEventShortDes] = useState("");
    const [eventDetailDes, setEventDetailDes] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [isAdding, setIsAdding] = useState(true);
    const [error, setError] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    const dispatch = useDispatch();
    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (eventName !== '', eventImage !== '', eventLocation !== '', eventStartDate !== '', eventShortDes !== '', eventDetailDes !== '') {
            setIsAdding(true);
            setSpinner(true);
            await dispatch(addEvent(eventName, eventImage, eventLocation, eventStartDate, eventEndDate, eventShortDes, eventDetailDes, firebase))
                .then(() => {
                    toast.success("Event Successfully Added.");
                    setSpinner(false);
                    setEventName('');
                    setEventImage('');
                    setEventLocation('');
                    setEventStartDate('');
                    setEventEndDate('');
                    setEventShortDes('');
                    setEventDetailDes('');
                    toggle();
                })
                .catch((error) => {
                    console.log(error);
                    setNetworkError(true);
                    toast.error(error.message);
                })

        }
        else {
            setError(true);
            setIsAdding(true);
            setSpinner(false);
        }
    }

    return (
        <Modal
            show={modal}
            onHide={() => {
                toggle();
                setEventName('');
                setEventImage('');
                setEventLocation('');
                setEventStartDate('');
                setEventEndDate('');
                setEventShortDes('');
                setEventDetailDes('');
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Event
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <Form
                    className="d-grid"
                >
                    <Row>
                        <Col xs={12} md={6} lg={4} className="d-flex flex-column align-items-center justify-content-center">

                            <div className="d-flex flex-column align-items-center mb-3">
                                {eventImage ? (
                                    <Card.Img
                                        variant="top"
                                        className="w-75"
                                        style={{ cursor: "pointer" }}
                                        src={
                                            eventImage ?
                                                URL.createObjectURL(eventImage)
                                                : null
                                        }
                                    // onClick={handleImageClick}
                                    />
                                )
                                    : (
                                        <>
                                            <Card className="p-5 text-center">
                                                <p>N/A</p>
                                            </Card>
                                        </>
                                    )
                                }
                            </div>


                            <Form.Group className="" controlId="formEventImage">
                                <Form.Label>Upload Event Image<span className="text-danger" >*</span></Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setIsAdding(true);
                                        setEventImage(e.target.files[0])
                                        setIsAdding(false);
                                        setError(false);
                                        setNetworkError(false);
                                    }}
                                    type="file"
                                    accept="image/*"
                                />
                            </Form.Group>

                        </Col>
                        <Col xs={12} md={6} lg={8} className="modal-container">

                            <Form.Group className="mb-3" controlId="formEventName">
                                <Form.Label>Event Name<span className="text-danger" >*</span></Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEventName(e.target.value)
                                        setIsAdding(false);
                                        setError(false);
                                        setNetworkError(false);
                                    }}
                                    type="text"
                                    placeholder="Enter Name"
                                    value={eventName}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventLocation">
                                <Form.Label>Location<span className="text-danger" >*</span></Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEventLocation(e.target.value)
                                        setIsAdding(false);
                                        setError(false);
                                        setNetworkError(false);
                                    }}
                                    type="text"
                                    placeholder="Enter Location"
                                    value={eventLocation}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventStartDate">
                                <Form.Label>Start Date<span className="text-danger" >*</span></Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEventStartDate(e.target.value)
                                        setIsAdding(false);
                                        setError(false);
                                        setNetworkError(false);
                                    }}
                                    type="date"
                                    value={eventStartDate}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventEndDate">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEventEndDate(e.target.value)
                                        setIsAdding(false);
                                        setError(false);
                                        setNetworkError(false);
                                    }}
                                    type="date"
                                    value={eventEndDate}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventShortDes">
                                <Form.Label>Short Description<span className="text-danger" >*</span></Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEventShortDes(e.target.value)
                                        setIsAdding(false);
                                        setError(false);
                                        setNetworkError(false);
                                    }}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter short description"
                                    value={eventShortDes}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDetailDes">
                                <Form.Label>Detail Description<span className="text-danger" >*</span></Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEventDetailDes(e.target.value)
                                        setIsAdding(false);
                                        setError(false);
                                        setNetworkError(false);
                                    }}
                                    as="textarea"
                                    rows={10}
                                    placeholder="Enter detail description"
                                    value={eventDetailDes}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {
                    networkError ?
                        <p className="text-danger">
                            Something went wrong.
                        </p>
                        : null
                }
                {
                    error ?
                        <p>
                            Enter all <span className="text-danger" >(*)</span> values.
                        </p>
                        : null
                }

                <Button
                    variant="dark"
                    type="submit"
                    disabled={isAdding}
                    onClick={handleSubmit}
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
                                {"  Adding..."}
                            </>
                        ) : (
                            'Add'
                        )
                    }
                </Button>
                {/* </div> */}
            </Modal.Footer>
        </Modal>
    );
}

export default CreateEventModal;