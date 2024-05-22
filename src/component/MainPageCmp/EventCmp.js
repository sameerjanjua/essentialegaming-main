import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../../App.css';

const EventCmp = () => {

    const navigate = useNavigate();

    const registerNow = () => {
        navigate("/events");
    }

    return (
        <div className="mt-5 text-center">
            <div className="d-md-flex bg-danger align-items-center">
                <div className="event-cmp">
                    <div className="d-flex justify-content-center w-100 align-items-center event-cmp-bg" >
                        {/* <img src={Game} className="d-block w-100" /> */}
                    </div>
                </div>
                <div className="d-flex-column w-100 p-5 gap-2" >
                    <h4>Essential E-Gaming: Unleashing Unforgettable Events</h4>
                    <p>Join us for the ultimate gaming experience! Witness top-tier competition, cutting-edge tech, and non-stop entertainment. Dive into the action, connect with fellow gamers, and elevate your passion to new heights!</p>
                    {/* <Button variant="secondary" onClick={details} >Details</Button> */}
                    <Button variant="warning" onClick={registerNow} className="w-50" >Explore Events</Button>
                </div>
            </div>
        </div>
    );
}

export default EventCmp;