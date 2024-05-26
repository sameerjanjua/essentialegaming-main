import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useFirebase } from "../../context/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEvent } from "../../store/actions/ManageEventAction";
import BgChar from "../../images/char2.png"
import Char from "../../images/char1.png"

const LiveCard = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/events/live-events")
    }

    return (
        <div container className="relative d-flex gap-5 flex-wrap mt-5 pt-5 mb-5">
            <div className="d-flex align-items-center justify-content-center w-100 rounded-3 live-cmp">
                <img src={BgChar} className="absolute chr1" />
                <img src={Char} className="absolute chr2" />
                <div className="absolute text-center bg-none live-cmp-content d-flex flex-column justify-content-center">
                    <h2>We're Live Now!</h2>
                    <p>Join the excitement and dive into our live tournaments. Compete, watch, and win in real-time!</p>
                    <Button className="btn-live" onClick={handleClick}>Live Tournaments</Button>
                </div>
            </div>
        </div>
    )
}

export default LiveCard;