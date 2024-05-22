import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function Protected(props) {

    let Component = props.Component;
    const navigate = useNavigate();
    const firebase = useFirebase();

    // useEffect(() => {
    //     if(!firebase.isLoggedIn) {
    //         navigate("/login")
    //     }
    // },[firebase, navigate])
    
    return (
        <>
            <Component />
        </>
    );
}

export default Protected;