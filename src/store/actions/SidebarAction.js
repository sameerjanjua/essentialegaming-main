import React from "react";
import { SIDEBAR_COLLAPSED } from "../types";

export const handleSidebarCol = (collapsed) => {
    return (dispatch, getState) => {
        dispatch({ 
            type : SIDEBAR_COLLAPSED, 
            payload: collapsed, 
        });
    }
}