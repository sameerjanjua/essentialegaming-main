import React, { useEffect } from "react";
import SlideShow from "../component/MainPageCmp/SlideShow";
import FormRegisterCmp from "../component/MainPageCmp/FormRegisterCmp";
import PointsCmp from "../component/MainPageCmp/MainPointsCmp";
import EventCmp from "../component/MainPageCmp/EventCmp";
import ComingEventCmp from "../component/MainPageCmp/ComingEventCmp";
import LiveCmp from "../component/MainPageCmp/LiveCmp";

const MainPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <SlideShow />
            <LiveCmp />
            <PointsCmp />
            {/* <FormRegisterCmp /> */}
            <EventCmp />
            <ComingEventCmp />
            
        </div>
    );
}

export default MainPage;