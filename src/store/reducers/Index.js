import userAuthReducer from "./UserAuth-Reducer";
import formReducer, { formFetchReducer } from "./FormReducer";
import { SidebarReducer } from "./SidebarReducer";
import formConfigReducer from "./RegFormConfigReducer";
import eventReducer from "./ManageEventReducer"

import { combineReducers } from "redux";

const reducers = combineReducers(
    {
        userAuthReducer,
        user: userAuthReducer,
        formReducer,
        formFetchReducer,
        SidebarReducer,
        formConfigReducer,
        events: eventReducer,
    }
);

export default reducers;