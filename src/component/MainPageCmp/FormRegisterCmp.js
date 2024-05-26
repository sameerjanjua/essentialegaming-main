import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Game from "../../images/game.jpg";
import { useNavigate } from "react-router-dom";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventCard from "../Cards/EventCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FormRegisterCmp = ({ comingEvents }) => {

    const navigate = useNavigate();

    console.log(comingEvents);

    const handleClick = () => {
        navigate("/events");
    }

    return (
        <Container>
            <div className="my-5 main-cmp-content">
                <div>
                    <h1>Featured Tournaments</h1>
                    <p>Join the fray in your favorite game and claim glory!</p>
                </div>
                <Button variant="warning" className="rounded-full d-flex align-items-center gap-2" onClick={handleClick}>All Tournaments <ArrowForwardIosIcon className="icon-size" /> </Button>
            </div>
            <div container className="d-flex gap-5 flex-wrap">
                {
                    comingEvents?.slice(0, 3).map(event => (
                        <EventCard key={event?.eventId} {...event} type={"coming"} path={"/coming-event-details"} />
                    ))
                }
            </div>
        </Container>












        // {/* {upcomingEvents.length > 0 ?
        //     upcomingEvents.map((event) => (
        //         <Container key={event.id} className="mt-5 text-center mb-5">
        //             <h1>{event.name}</h1><br />
        //             <Row xs={1} md={2} >
        //                 <Col className="d-flex justify-content-center align-items-center order-md-2" >
        //                     <img src={event.image} className="d-block w-75 rounded" />
        //                 </Col>
        //                 <Col className="d-grid gap-2 pb-5 pt-5" >
        //                     <p>{event.description}</p><br />
        //                     <Button variant="secondary" onClick={details} >Details</Button>
        //                     <Button variant="dark" onClick={registerNow} >Register Now</Button>
        //                 </Col>

        //             </Row>
        //         </Container>
        //     ))
        //     :
        //     null
        // } */}
    );
}

export default FormRegisterCmp;