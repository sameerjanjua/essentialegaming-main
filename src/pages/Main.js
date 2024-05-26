import React, { useEffect, useState } from "react";
import SlideShow from "../component/MainPageCmp/SlideShow";
import FormRegisterCmp from "../component/MainPageCmp/FormRegisterCmp";
import PointsCmp from "../component/MainPageCmp/MainPointsCmp";
import EventCmp from "../component/MainPageCmp/EventCmp";
import ComingEventCmp from "../component/MainPageCmp/ComingEventCmp";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../context/Firebase";
import { fetchEvent } from "../store/actions/ManageEventAction";
import LiveCard from "../component/Cards/LiveCard";

const MainPage = () => {

    const { events, loading } = useSelector((state) => state.events);

    const [liveEvents, setLiveEvents] = useState([]);
    const [comingEvents, setComingEvents] = useState([]);

    const firebase = useFirebase();
    const dispatch = useDispatch();

    useEffect(() => {
        if (events) {
            const sortedEvents = [...events].sort((a, b) => new Date(b.eventStartDate) - new Date(a.eventStartDate));
            const comingFilteredEvents = sortedEvents.filter(event => event.status === "coming");
            const liveFilteredEvents = sortedEvents.filter(event => event.status === "live");
            setLiveEvents(liveFilteredEvents);
            setComingEvents(comingFilteredEvents);
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
            <SlideShow />
            {liveEvents?.length > 0 && <LiveCard />}
            {comingEvents?.length > 0 && <FormRegisterCmp comingEvents={comingEvents} />}
            <PointsCmp />
            <EventCmp />
            <ComingEventCmp />

        </div>
    );
}

export default MainPage;