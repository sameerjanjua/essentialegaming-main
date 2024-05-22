import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, getEvent, updateEvent } from "../../../store/actions/ManageEventAction";
import { useFirebase } from "../../../context/Firebase";
import { toast } from "react-toastify";

const UpdateEventModal = ({ modal, toggle, eventData }) => {

    const [updateEventName, setUpdateEventName] = useState("");
    const [updateEventImage, setUpdateEventImage] = useState(null);
    const [updateEventLocation, setUpdateEventLocation] = useState("");
    const [updateEventStartDate, setUpdateEventStartDate] = useState("");
    const [updateEventEndDate, setUpdateEventEndDate] = useState("");
    const [updateEventShortDes, setUpdateEventShortDes] = useState("");
    const [updateEventDetailDes, setUpdateEventDetailDes] = useState("");
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [eventWinner, setEventWinner] = useState("");
    const [eventRunnerUp, setEventRunnerUp] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [isUpdating, setIsUpdating] = useState(true);


    console.log("event : ", eventData);
    const eventId = eventData?.id;

    const { event, updateLoading } = useSelector((state) => state.events);
    console.log("Event from Redux", event);

    const dispatch = useDispatch();
    const firebase = useFirebase();

    const preEventImage = event?.eventImage;

    console.log(preEventImage);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setSpinner(true);
        await dispatch(updateEvent(updateEventName, updateEventImage, updateEventLocation, updateEventStartDate, updateEventEndDate, updateEventShortDes, updateEventDetailDes, updatedStatus, eventWinner, eventRunnerUp, preEventImage, eventId, firebase))
            .then(() => {
                toast.success("Event Successfully Updated.");
                setSpinner(false);
                setUpdateEventName('');
                setUpdateEventImage('');
                setUpdateEventLocation('');
                setUpdateEventStartDate('');
                setUpdateEventEndDate('');
                setUpdateEventShortDes('');
                setUpdateEventDetailDes('');
                setUpdatedStatus('');
                setEventWinner('');
                setEventRunnerUp('');
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
                setIsUpdating(false);
                setSpinner(false);
            })
    }

    const handleOnHide = () => {
        setUpdateEventName('');
        setUpdateEventImage('');
        setUpdateEventLocation('');
        setUpdateEventStartDate('');
        setUpdateEventEndDate('');
        setUpdateEventShortDes('');
        setUpdateEventDetailDes('');
        setUpdatedStatus('');
        setEventWinner('');
        setEventRunnerUp('');
        toggle();
    }

    useEffect(() => {
        dispatch(getEvent(eventId, firebase));
    }, [dispatch, firebase, eventId])

    return (
        <Modal
            show={modal}
            onHide={handleOnHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Event
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            {!updateLoading ?
                (
                <Form
                    className="d-grid"
                >
                    <Row>
                        <Col xs={12} md={6} lg={4} className="d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex flex-column align-items-center mb-3">
                                {
                                    // updateEventImage || 
                                    event?.eventImage ?
                                        (
                                            <Card.Img
                                                variant="top"
                                                className="w-75"
                                                style={{ cursor: "pointer" }}
                                                src={
                                                    updateEventImage ?
                                                        URL.createObjectURL(updateEventImage)
                                                        : (event?.eventImage)
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
                            <Form.Group className="mb-3" controlId="formUpdateEventImage">
                                <Form.Label>Update Event Image</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setIsUpdating(true);
                                        setUpdateEventImage(e.target.files[0])
                                        setIsUpdating(false);
                                    }}
                                    type="file"
                                    accept="image/*"
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={8} className="modal-container">
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    defaultValue={event?.status}
                                    onChange={(e) => {
                                        setUpdatedStatus(e.target.value);
                                        setIsUpdating(false);
                                    }}
                                    required
                                >
                                    <option value="" disabled >Select</option>
                                    <option value="coming" >Coming</option>
                                    <option value="live" >Live</option>
                                    <option value="end" >End</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formUpdateEventName">
                                <Form.Label>Winner</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEventWinner(e.target.value)
                                        setIsUpdating(false);
                                    }}
                                    // defaultValue={props.name}
                                    type="text"
                                    placeholder="Enter Winner Name"
                                    defaultValue={event?.winner}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formUpdateEventName">
                                <Form.Label>Runner-Up</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEventRunnerUp(e.target.value)
                                        setIsUpdating(false);
                                    }}
                                    // defaultValue={props.name}
                                    type="text"
                                    placeholder="Enter Runner-Up Name"
                                    defaultValue={event?.runnerUp}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formUpdateEventName">
                                <Form.Label>Update Event Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUpdateEventName(e.target.value)
                                        setIsUpdating(false);
                                    }}
                                    // defaultValue={props.name}
                                    type="text"
                                    placeholder="Enter Name"
                                    defaultValue={event?.eventName}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formUpdateEventLocation">
                                <Form.Label>Update Location</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUpdateEventLocation(e.target.value)
                                        setIsUpdating(false);
                                    }}
                                    // defaultValue={props.city}
                                    type="text"
                                    placeholder="Enter Location"
                                    defaultValue={event?.eventLocation}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formUpdateEventStartDate">
                                <Form.Label>Update Start Date</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUpdateEventStartDate(e.target.value)
                                        setIsUpdating(false);
                                    }}
                                    // defaultValue={props.city}
                                    type="date"
                                    defaultValue={event?.eventStartDate}
                                    max={updateEventEndDate}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formUpdateEventEndDate">
                                <Form.Label>Update End Date</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUpdateEventEndDate(e.target.value)
                                        setIsUpdating(false);
                                    }}
                                    // defaultValue={props.city}
                                    type="date"
                                    defaultValue={event?.eventEndDate}
                                    min={updateEventStartDate}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formUpdateEventShortDes">
                                <Form.Label>Update Short Description</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUpdateEventShortDes(e.target.value)
                                        setIsUpdating(false);
                                    }}
                                    // defaultValue={props.city}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter short description"
                                    defaultValue={event?.eventShortDes}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formUpdateDetailDes">
                                <Form.Label>Update Detail Description</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUpdateEventDetailDes(e.target.value)
                                        setIsUpdating(false);
                                    }}
                                    // defaultValue={props.city}
                                    as="textarea"
                                    rows={10}
                                    placeholder="Enter detail description"
                                    defaultValue={event?.eventDetailDes}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                )
                :
                (
                        <div className="text-center mt-5 mb-5">
                            <Spinner size="md" />
                        </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                {/* <Button
                    onClick={toggle}
                    variant="dark"
                >Close</Button> */}

                <Button
                    variant="dark"
                    type="submit"
                    disabled={isUpdating}
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
                                {"  Updating..."}
                            </>
                        ) : (
                            'Update'
                        )
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateEventModal;