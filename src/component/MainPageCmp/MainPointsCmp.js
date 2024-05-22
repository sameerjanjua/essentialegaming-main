import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';

const PointsCmp = () => {
    return (
        <div className="mt-md-5 mb-md-5 pb-5 pt-5 ps-5 pe-5">
            <Row className="mb-4">
                {/* User-Friendly Interface */}
                <Col md={4} className="text-center mt-5">
                    <AccessibilityIcon fontSize="large" style={{ color: '#3498db' }} />
                    <h4 className="mt-2">User-Friendly Interface</h4>
                    <p>
                        Essential E-Gaming provides an intuitive platform for gamers of all levels, ensuring effortless tournament participation and real-time communication within a streamlined interface.
                    </p>
                </Col>

                {/* Efficient Tournament Management */}
                <Col md={4} className="text-center mt-5">
                    <EventIcon fontSize="large" style={{ color: '#27ae60' }} />
                    <h4 className="mt-2">Efficient Tournament Management</h4>
                    <p>
                        The platform excels in tournament organization, offering organizers tools to create, customize, and manage events seamlessly, while participants enjoy easy registration, and timely notifications.
                    </p>
                </Col>

                {/* Innovative Social Features */}
                <Col md={4} className="text-center mt-5">
                    <GroupIcon fontSize="large" style={{ color: '#e74c3c' }} />
                    <h4 className="mt-2">Innovative Social Features</h4>
                    <p>
                        Essential E-Gaming fosters a vibrant gaming community through innovative social elements, including in-game chat, discussion forums, and social media integration, promoting connection among players.
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default PointsCmp;