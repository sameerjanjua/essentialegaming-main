import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Valorant from "../../images/Valorant.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../../context/Firebase";
import { fetchEvent } from "../../store/actions/ManageEventAction";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ComingEventCmp = () => {

    const { events, loading } = useSelector((state) => state.events);

    const [comingEvents, setComingEvents] = useState([]);
    const [liveEvents, setLiveEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    const firebase = useFirebase();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        console.log(eventId);
        navigate(`/past-event-details/${eventId}`);
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


    const settings = {
        className: "center",
        dots: true,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="relative">
            <div className="absolute slick-bg" />
            <div className="mt-5 mb-5 pt-5 pb-5 container">
                <div className="text-center slick-header mb-4">
                    <h1>In the Headline</h1>
                    <p>Catch up on the most recent happenings in the world of esports. From tournament results to game updates, stay in the know.</p>
                </div>
                <div className="slick-body">
                    <Slider {...settings} >
                        {
                            pastEvents?.slice(0, 5).map(event => (
                                <div className="ps-1 pe-1">
                                    <div className="bg-light d-lg-flex gap-1 rounded">
                                        <div className="w-100 main-slick-image" style={{ backgroundImage: `url(${event?.eventImage})` }} >
                                            <div className="hover-text text-center text-black">
                                                <h5>{event?.eventName}</h5>
                                                <Button variant="warning" size="sm" onClick={() => handleDetails(event?.eventId)} >Details</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default ComingEventCmp;