import React, { useEffect, useState } from "react";
import { Typography, Grid, Card, CardContent, Divider, CardMedia, CardActions } from '@mui/material';
import Img from "../images/game.jpg"
import { fetchEvent } from "../store/actions/ManageEventAction";
import { useFirebase } from "../context/Firebase";
import { useDispatch, useSelector } from "react-redux";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StreamIcon from '@mui/icons-material/Stream';
import BgChar from "../images/char2.png"
import Char from "../images/char1.png"

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

    const formatDateRange = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);

        const startDay = startDate.getDate();
        const startMonth = startDate.toLocaleString('default', { month: 'short' });
        const startYear = startDate.getFullYear();

        const startSuffix = (startDay > 3 && startDay < 21) || startDay % 10 > 3 ? 'th' : ['st', 'nd', 'rd'][startDay % 10 - 1] || 'th';

        if (!endDateString) {
            return `${startDay}${startSuffix} ${startMonth} ${startYear}`;
        }

        const endDate = new Date(endDateString);

        const endDay = endDate.getDate();
        const endMonth = endDate.toLocaleString('default', { month: 'short' });
        const endYear = endDate.getFullYear();

        const endSuffix = (endDay > 3 && endDay < 21) || endDay % 10 > 3 ? 'th' : ['st', 'nd', 'rd'][endDay % 10 - 1] || 'th';

        if (startYear === endYear) {
            if (startMonth === endMonth) {
                return `${startDay}${startSuffix} - ${endDay}${endSuffix} ${startMonth} ${startYear}`;
            }
            return `${startDay}${startSuffix} ${startMonth} - ${endDay}${endSuffix} ${endMonth} ${startYear}`;
        }

        return `${startDay}${startSuffix} ${startMonth} ${startYear} - ${endDay}${endSuffix} ${endMonth} ${endYear}`;
    };

    const handleDetails = (eventId) => {
        navigate(`/details/${eventId}`);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div>
            <div className="w-100 mb-5 bg-danger p-5 text-center text-white head-event">
                <h1 className="heading-event">Events</h1>
            </div>
            {!loading ?
                (
                    <div className="container mb-5 mt-5">
                        {liveEvents?.length > 0 &&
                            <>
                                <div container className="relative d-flex gap-5 flex-wrap">
                                    <div className="d-flex align-items-center justify-content-center w-100 rounded-3 live-cmp">
                                        <img src={BgChar} className="absolute chr1" />
                                        <img src={Char} className="absolute chr2" />
                                        <div className="absolute text-center bg-none live-cmp-content d-flex flex-column justify-content-center">
                                            <h2>We're Live Now!</h2>
                                            <p>Join the excitement and dive into our live tournaments. Compete, watch, and win in real-time!</p>
                                            <Button className="btn-live">Live Tournaments</Button>
                                        </div>
                                    </div>
                                </div>
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
                                            <div className="event-card relative cursor-pointer" key={event?.id} onClick={() => handleDetails(event?.eventId)} >
                                                <img src={event?.eventImage} alt={event?.eventName} height="100%" width="100%" className="absolute event-card-image z-0" />
                                                <div className="z-1 bg-none relative w-100 h-100 event-content d-flex flex-column justify-content-between">
                                                    <div className="p-4">
                                                        <div className="event-date p-1 ps-2 pe-2 d-flex align-items-center gap-1"><div className="dot-date-uc" />{formatDateRange(event?.eventStartDate, event?.eventEndDate)}</div>
                                                    </div>
                                                    <div className="event-discription p-4" >
                                                        <h1>{event?.eventName}</h1>
                                                        <p>{event?.eventShortDes}</p>
                                                        <p>{event?.eventLocation}</p>
                                                    </div>
                                                </div>
                                            </div>
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
                                        <div className="event-card relative cursor-pointer" key={event?.id} onClick={() => handleDetails(event?.eventId)}>
                                            <img src={event?.eventImage} alt={event?.eventName} height="100%" width="100%" className="absolute event-card-image z-0" />
                                            <div className="z-1 bg-none relative w-100 h-100 event-content d-flex flex-column justify-content-between">
                                                <div className="p-4">
                                                    <div className="event-date p-1 ps-2 pe-2 d-flex align-items-center gap-1"><div className="dot-date" />{formatDateRange(event?.eventStartDate, event?.eventEndDate)}</div>
                                                </div>
                                                <div className="event-discription p-4" >
                                                    <h1>{event?.eventName}</h1>
                                                    <p>{event?.eventShortDes}</p>
                                                    <p>{event?.eventLocation}</p>
                                                </div>
                                            </div>
                                        </div>
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