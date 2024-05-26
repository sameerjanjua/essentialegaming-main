import React, { useEffect, useState } from "react";
import { Divider } from '@mui/material';
import { fetchEvent } from "../store/actions/ManageEventAction";
import { useFirebase } from "../context/Firebase";
import { useDispatch, useSelector } from "react-redux";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StreamIcon from '@mui/icons-material/Stream';
import EventCard from "../component/Cards/EventCard";
import LiveCard from "../component/Cards/LiveCard";

const EventPage = () => {

    const { events, loading } = useSelector((state) => state.events);

    const [comingEvents, setComingEvents] = useState([]);
    const [liveEvents, setLiveEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [visibleEvents, setVisibleEvents] = useState(6);

    const firebase = useFirebase();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadMoreEvents = () => {
        setVisibleEvents(prev => prev + 6);
    };

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div>
            <div className="w-100 mb-5 bg-danger p-5 text-center text-white head-event">
                <h1 className="heading-event">EVENTS</h1>
            </div>
            {!loading ?
                (
                    <div className="container mb-5 mt-5">
                        {liveEvents?.length > 0 &&
                            <>
                                <LiveCard />
                                <Divider className="mt-5 mb-5 border-1 bg-white" />
                            </>
                        }

                        {
                            comingEvents?.length > 0 &&
                            <>
                                <h1 className="mb-5 d-flex align-items-center gap-1"><EventAvailableIcon color="warning" fontSize="large" />Upcoming Events</h1>
                                <div container className="d-flex gap-5 flex-wrap">
                                    {
                                        comingEvents?.map(event => (
                                            <EventCard key={event?.eventId} {...event} type={"coming"} path={"/coming-event-details"} />
                                        ))
                                    }
                                </div>
                                <Divider className="mt-5 mb-5 border-1 bg-white" />
                            </>
                        }

                        <h1 className="mb-5 d-flex align-items-center gap-1"><EmojiEventsIcon color="info" fontSize="large" />Earlier Events</h1>
                        <div container className="d-flex gap-5 flex-wrap">
                            {pastEvents?.length > 0 ?
                                (
                                    pastEvents?.slice(0, visibleEvents).map(event => (
                                        <EventCard key={event?.eventId} {...event} type={"past"} path={"/past-event-details"}/>
                                    ))
                                )
                                :
                                (
                                    <div className="event-card relative">
                                        <div className="z-1 bg-none relative w-100 h-100 event-content d-flex flex-column justify-content-between">
                                            <div className="p-4">
                                                <div className="event-date p-1 ps-2 pe-2 d-flex align-items-center gap-1"><div className="dot-date" />00/00/0000</div>
                                            </div>
                                            <div className="event-discription p-4">
                                                <h1>N/A</h1>
                                                <p>-</p>
                                                <p>-</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {visibleEvents < pastEvents.length && (
                            <div className="m-auto d-flex justify-content-center">
                                <div className="text-center mt-4 load-more-btn">
                                    <Button variant="primary" onClick={loadMoreEvents} className="gap-1" >
                                        Load More <span className="rotate-icon"><ExpandCircleDownIcon /></span>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )
                :
                (
                    <div className="text-center vh-100">
                        <Spinner size="md" />
                    </div>
                )
            }
        </div>
    );
}

export default EventPage;