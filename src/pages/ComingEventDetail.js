import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ValorantOne from "../images/ValorantOne.jpg"
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PaymentsIcon from '@mui/icons-material/Payments';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import EventIcon from '@mui/icons-material/Event';

const DetailPage = () => {

    const navigate = useNavigate();

    const registerNow = () => {
        navigate("/registrationform");
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="coming-event-container" >
            <Container className="my-3 text-center" >
                <h1 className="text-center my-3">Valorant Tournament Registration</h1>
                <Row className="mt-5" xs={1} md={2}>
                    <Col className="d-flex justify-content-center align-items-center">
                        <img src={ValorantOne} className="d-block w-100 rounded" />
                    </Col>
                    <Col className="d-grid justify-content-center align-items-center gap-3" >
                        <p className="m-5 mb-0">🔥 Welcome to the battleground, Agent! Gear up for intense Valorant action by registering for our upcoming tournament. Join fellow gamers in a thrilling competition where strategy, precision, and teamwork reign supreme.</p>
                        <Button variant="warning" className="m-5 mt-0" onClick={registerNow} >Register Now</Button>
                    </Col>
                </Row>
                <div className="d-grid gap-2">
                    <h3 className="my-5">Tournament Details:</h3>
                    <div className="d-flex gap-5 flex-wrap justify-content-center align-items-center">

                        <div className="card-box">
                            <h1>Winner Prize</h1>
                            <div className="d-flex gap-2 justify-content-center align-items-center">
                                <EmojiEventsIcon fontSize="large" />
                                <span>PKR 5000/-</span>
                            </div>
                        </div>

                        <div className="card-box">
                            <h1>Runner Up Prize</h1>
                            <div className="d-flex gap-2 justify-content-center align-items-center">
                                <MilitaryTechIcon fontSize="large" />
                                <span className="text-large" >PKR 5000/-</span>
                            </div>
                        </div>

                        <div className="card-box">
                            <h1>Registration Fee</h1>
                            <div className="d-flex gap-2 justify-content-center align-items-center">
                                <PaymentsIcon fontSize="large" />
                                <span className="text-large" >PKR 5000/-</span>
                            </div>
                        </div>

                        <div className="card-box">
                            <h1>Start Date</h1>
                            <div className="d-flex gap-2 justify-content-center align-items-center">
                                <EventIcon fontSize="large" />
                                <span className="text-large" >12/21/2222</span>
                            </div>
                        </div>

                        <div className="card-box">
                            <h1>End Date</h1>
                            <div className="d-flex gap-2 justify-content-center align-items-center">
                                <EventIcon fontSize="large" />
                                <span className="text-large" >12/21/2222</span>
                            </div>
                        </div>

                        <div className="card-box">
                            <h1>Format</h1>
                            <div className="d-flex gap-2 justify-content-center align-items-center">
                                <AllInclusiveIcon fontSize="large" />
                                <span className="text-large" >1 vs 1</span>
                            </div>
                        </div>

                    </div>

                    <p>
                        {/* 📅 Date: [Enter Date]<br />
                    ⌚ Time: [Enter Time]<br />
                    🎮 Game: Valorant<br />
                    🏆 Format: [Specify Format, e.g., 5v5, Single Elimination]<br />
                    💰 Prizes: [Detail Prize Pool and Rewards]<br /> */}
                    </p>
                    <h3>
                        Registration Guidelines:
                    </h3>
                    <p>

                        🖱️ Click the "Register Now" button.<br />
                        📝 Complete the registration form with your details.<br />
                        💳 Pay the registration fee to secure your spot.<br />
                    </p>
                    <h3>
                        Why Join?
                    </h3>
                    <p>

                        🌐 Connect with the E-Gaming community.<br />
                        🏅 Compete for glory and attractive prizes.<br />
                        🤝 Build camaraderie with fellow Agents.<br />
                    </p>
                    <h3>
                        Important Notes:
                    </h3>
                    <p>

                        🔒 Limited spots available, register early!<br />
                        🚨 Stay tuned for tournament updates on our platform and social media.<br />
                        📧 Contact essentialegaming@gmail.com for any inquiries.<br />
                        Ready to showcase your gaming skills? Click "Register Now" and let the battle begin!<br /><br />

                    </p>
                    <Button variant="warning" className="mb-5 mt-0 w-50 mx-auto" onClick={registerNow} >Register Now</Button>
                </div>
            </Container>
        </div>
    );
}

export default DetailPage;