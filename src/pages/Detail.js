import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ValorantOne from "../images/ValorantOne.jpg"
import { useNavigate } from "react-router-dom";
import PastEvent from "../component/EventDetails/PastEvent";

const DetailPage = () => {

    const navigate = useNavigate();

    const registerNow = () => {
        navigate("/registrationform");
    }

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        // ☺ <Container className="mt-3 text-center" >
        //     <h1 className="text-center">Valorant Tournament Registration</h1>
        //     <Row className="mt-3" xs={1} md={2}>
        //         <Col className="d-flex justify-content-center align-items-center">
        //             <img src={ValorantOne} className="d-block w-100 rounded" />
        //         </Col>
        //         <Col className="d-grid justify-content-center align-items-center gap-3" >
        //             <p className="m-5 mb-0">🔥 Welcome to the battleground, Agent! Gear up for intense Valorant action by registering for our upcoming tournament. Join fellow gamers in a thrilling competition where strategy, precision, and teamwork reign supreme.</p>
        //             <Button variant="dark" className="m-5 mt-0" onClick={registerNow} >Register Now</Button>
        //         </Col>
        //     </Row>
        //     <div className="d-grid gap-2">
        //         <h3 className="mt-5">Tournament Details:</h3>
        //         <p>
        //             📅 Date: [Enter Date]<br />
        //             ⌚ Time: [Enter Time]<br />
        //             🎮 Game: Valorant<br />
        //             🏆 Format: [Specify Format, e.g., 5v5, Single Elimination]<br />
        //             💰 Prizes: [Detail Prize Pool and Rewards]<br />
        //         </p>
        //         <h3>
        //             Registration Guidelines:
        //         </h3>
        //         <p>

        //             🖱️ Click the "Register Now" button.<br />
        //             📝 Complete the registration form with your team details.<br />
        //             💳 Pay the registration fee to secure your spot.<br />
        //         </p>
        //         <h3>
        //             Why Join?
        //         </h3>
        //         <p>

        //             🌐 Connect with the Valorant community.<br />
        //             🏅 Compete for glory and attractive prizes.<br />
        //             🤝 Build camaraderie with fellow Agents.<br />
        //         </p>
        //         <h3>
        //             Important Notes:
        //         </h3>
        //         <p>

        //             🔒 Limited spots available, register early!<br />
        //             🚨 Stay tuned for tournament updates on our platform and social media.<br />
        //             📧 Contact [Your Support Email] for any inquiries.<br />
        //             Ready to showcase your Valorant skills? Click "Register Now" and let the battle begin! 🔗 [Register Now]<br /><br />

        //             Feel free to customize the details such as the date, time, format, prizes, and registration process according to your specific tournament. This description is designed to build excitement, highlight the benefits of participation, and provide clear instructions for interested players.</p>
        //         <Button variant="dark" className="mb-5 mt-0 w-50 mx-auto" onClick={registerNow} >Register Now</Button>
        //     </div>
        // </Container>


        <div>
            <PastEvent />
        </div>
    );
}

export default DetailPage;