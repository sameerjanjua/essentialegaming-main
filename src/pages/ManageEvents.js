import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Typography, TableSortLabel } from '@mui/material';
import { Button, Card, Spinner } from "react-bootstrap";
import Img from '../images/NFS.jpg'
import CreateEventModal from "../component/Modals/Manage Events/CreateEventModal";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../context/Firebase";
import { fetchEvent } from "../store/actions/ManageEventAction";
import UpdateEventModal from "../component/Modals/Manage Events/UpdateEventModal";
import DeleteModal from "../component/Modals/Common/DeleteModal";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ManageEventPage = () => {

    const [modalShow, setModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [comingEvents, setComingEvents] = useState([]);
    const [liveEvents, setLiveEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [key, setKey] = useState('coming');

    const dispatch = useDispatch();
    const firebase = useFirebase();

    const { events, loading } = useSelector((state) => state.events);
    console.log(events, "event");

    const toggleCreateModal = () => {
        setModalShow(!modalShow);
    }

    const toggleUpdateModal = (event) => {
        setUpdateModalShow(!updateModalShow);
        setSelectedEvent(event);
    }

    const toggleDeleteModal = (event) => {
        setDeleteModalShow(!deleteModalShow);
        setSelectedEvent(event);
    }

    useEffect(() => {
        if (events) {
            const sortedEvents = [...events].sort((a, b) => new Date(b.eventStartDate) - new Date(a.eventStartDate));
            const comingFilteredEvents = sortedEvents.filter(event => event.status === "coming");
            const liveFilteredEvents = sortedEvents.filter(event => event.status === "live");
            const pastFilteredEvents = sortedEvents.filter(event => event.status === "end");
            setComingEvents(comingFilteredEvents);
            setLiveEvents(liveFilteredEvents);
            setPastEvents(pastFilteredEvents);
        }
    }, [events])

    useEffect(() => {
        dispatch(fetchEvent(firebase));
    }, [dispatch, firebase])

    return (
        <div className="container mt-5 mb-5">

            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >

                <Tab eventKey="coming" title="Coming Events">

                    <Card component={Paper} variant="outlined">
                        <div className="d-flex justify-content-between align-items-center p-4">
                            <Typography
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                                Coming Events
                            </Typography>
                            <Button variant="success" onClick={toggleCreateModal} >Add Event</Button>
                        </div>
                        <div className="table-responsive">
                            <Table aria-label="events table">
                                <TableHead>
                                    <TableRow className="bg-dark">
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white">ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Event</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Event Image</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Start Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >End Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {!loading ?
                                        (comingEvents?.length > 0 ?
                                            comingEvents?.map(event => (
                                                <TableRow key={event?.id} >
                                                    <TableCell>{event?.id}</TableCell>
                                                    <TableCell>{event?.eventName}</TableCell>
                                                    <TableCell><img src={event?.eventImage} width="100px" /></TableCell>
                                                    <TableCell style={{ whiteSpace: "nowrap" }}>{event?.eventStartDate}</TableCell>
                                                    <TableCell style={{ whiteSpace: "nowrap" }}>{event?.eventEndDate || "N/A"}</TableCell>
                                                    <TableCell style={{ whiteSpace: "nowrap" }}>
                                                        <Button className="me-2" variant="success" onClick={() => toggleUpdateModal(event)}>Update</Button>
                                                        <Button variant="danger" onClick={() => toggleDeleteModal(event)} >Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                            :
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-bold">No Coming Events found.</TableCell>
                                            </TableRow>
                                        )
                                        :
                                        (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center mt-2">
                                                    <Spinner size="md" />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>

                </Tab>

                <br /><br /><br />

                <Tab eventKey="live" title="Live Events">

                    <Card component={Paper} variant="outlined">
                        <div className="d-flex justify-content-between align-items-center p-4">
                            <Typography
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                                Live Events
                            </Typography>
                        </div>
                        <div className="table-responsive">
                            <Table aria-label="events table">
                                <TableHead>
                                    <TableRow className="bg-dark">
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white">ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Event</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Event Image</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Start Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >End Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {!loading ?
                                        (liveEvents?.length > 0 ?
                                            liveEvents?.map(event => (
                                                <TableRow key={event?.id} >
                                                    <TableCell>{event?.id}</TableCell>
                                                    <TableCell>{event?.eventName}</TableCell>
                                                    <TableCell><img src={event?.eventImage} width="100px" /></TableCell>
                                                    <TableCell style={{ whiteSpace: "nowrap" }}>{event?.eventStartDate}</TableCell>
                                                    <TableCell style={{ whiteSpace: "nowrap" }}>{event?.eventEndDate || "N/A"}</TableCell>
                                                    <TableCell style={{ whiteSpace: "nowrap" }}>
                                                        <Button className="me-2" variant="success" onClick={() => toggleUpdateModal(event)}>Update</Button>
                                                        <Button variant="danger" onClick={() => toggleDeleteModal(event)} >Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                            :
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-bold">No Live Events found.</TableCell>
                                            </TableRow>
                                        )
                                        :
                                        (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center mt-2">
                                                    <Spinner size="md" />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>



                </Tab>

                <br /><br /><br />

                <Tab eventKey="past" title="Past Events">

                    <Card component={Paper} variant="outlined">
                        <div className="d-flex justify-content-between align-items-center p-4">
                            <Typography
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                                Past Events
                            </Typography>
                        </div>
                        <div className="table-responsive">
                            <Table aria-label="events table">
                                <TableHead>
                                    <TableRow className="bg-dark">
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white">ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Event</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Event Image</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Start Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >End Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className="text-white" >Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {!loading ?
                                        (pastEvents?.length > 0 ?
                                            pastEvents?.map(event => (
                                                <TableRow key={event?.id} >
                                                    <TableCell>{event?.id}</TableCell>
                                                    <TableCell>{event?.eventName}</TableCell>
                                                    <TableCell><img src={event?.eventImage} width="100px" /></TableCell>
                                                    <TableCell style={{ whiteSpace: "nowrap" }}>{event?.eventStartDate}</TableCell>
                                                    <TableCell style={{ whiteSpace: "nowrap" }}>{event?.eventEndDate || "N/A"}</TableCell>
                                                    <TableCell style={{ whiteSpace: "nowrap" }}>
                                                        <Button className="me-2" variant="success" onClick={() => toggleUpdateModal(event)}>Update</Button>
                                                        <Button variant="danger" onClick={() => toggleDeleteModal(event)} >Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                            :
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-bold">No Past Events found.</TableCell>
                                            </TableRow>
                                        )
                                        :
                                        (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center mt-2">
                                                    <Spinner size="md" />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>

                </Tab>

            </Tabs>


            <CreateEventModal
                modal={modalShow}
                toggle={toggleCreateModal}
            />

            <UpdateEventModal
                modal={updateModalShow}
                toggle={toggleUpdateModal}
                eventData={selectedEvent}
            />

            <DeleteModal
                modal={deleteModalShow}
                toggle={toggleDeleteModal}
                event={selectedEvent}
            />
        </div>
    );
}

export default ManageEventPage;