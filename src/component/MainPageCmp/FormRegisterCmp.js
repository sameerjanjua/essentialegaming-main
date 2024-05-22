import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Game from "../../images/game.jpg";
import { useNavigate } from "react-router-dom";

const FormRegisterCmp = () => {

    const navigate = useNavigate();

    const details = () => {
        navigate("/detail");
    }

    const registerNow = () => {
        navigate("/registrationform");
    }

    const upcomingEvents = [
        {
            id: 1,
            name: 'Valorant Tournament Registration',
            date: 'March 2024',
            location: 'Unknown',
            description: '🔥 Welcome to the battleground, Agent! Gear up for intense Valorant action by registering for our upcoming tournament. Join fellow gamers in a thrilling competition where strategy, precision, and teamwork reign supreme.',
            image: Game,
        },
        // Add more upcoming events as needed
    ];

    return (
        <>
            {upcomingEvents.length > 0 ?
                upcomingEvents.map((event) => (
                    <Container key={event.id} className="mt-5 text-center mb-5">
                        <h1>{event.name}</h1><br />
                        <Row xs={1} md={2} >
                            <Col className="d-flex justify-content-center align-items-center order-md-2" >
                                <img src={event.image} className="d-block w-75 rounded" />
                            </Col>
                            <Col className="d-grid gap-2 pb-5 pt-5" >
                                <p>{event.description}</p><br />
                                <Button variant="secondary" onClick={details} >Details</Button>
                                <Button variant="dark" onClick={registerNow} >Register Now</Button>
                            </Col>

                        </Row>
                    </Container>
                ))
                :
                null
            }
        </>
    );
}

export default FormRegisterCmp;