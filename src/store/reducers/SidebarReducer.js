import { SIDEBAR_COLLAPSED } from "../types";

const initialState = {
    collapsed : true,
}

export const SidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIDEBAR_COLLAPSED:
          console.log('SIDEBAR_COLLAPSED updated');
          return {
            state,
            collapsed: action.payload,
        };
        
        default:
          return state;
      }
}