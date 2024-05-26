import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { fetchEvent } from "../store/actions/ManageEventAction";
import EventCard from "../component/Cards/EventCard";
import { Button, Spinner } from "react-bootstrap";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import StreamIcon from '@mui/icons-material/Stream';

const LiveEventsPage = () => {

    const { events, loading } = useSelector((state) => state.events);

    const [liveEvents, setLiveEvents] = useState([]);
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
            const liveFilteredEvents = sortedEvents.filter(event => event.status === "live");
            setLiveEvents(liveFilteredEvents);
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
                <h1 className="heading-event">LIVE</h1>
            </div>
            {!loading ?
                (
                    <div className="container mb-5 mt-5">
                        <h1 className="mb-5 d-flex align-items-center gap-1"><StreamIcon color="success" fontSize="large" />Live Events</h1>
                        <div container className="d-flex gap-5 flex-wrap">
                            {liveEvents?.length > 0 ?
                                (
                                    liveEvents?.slice(0, visibleEvents).map(event => (
                                        <EventCard key={event?.eventId} {...event} type={"live"} path={"/coming-event-details"} />
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
                            {visibleEvents < liveEvents.length && (
                                <div className="m-auto d-flex justify-content-center">
                                    <div className="text-center mt-4 load-more-btn">
                                        <Button variant="primary" onClick={loadMoreEvents} className="gap-1" >
                                            Load More <span className="rotate-icon"><ExpandCircleDownIcon /></span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
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
    )
}

export default LiveEventsPage;