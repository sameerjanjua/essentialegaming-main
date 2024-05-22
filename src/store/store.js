// import { applyMiddleware, createStore } from "redux";
// import reducers  from "./reducers/Index";
// import { thunk } from "redux-thunk";

// const store = createStore(reducers, applyMiddleware(thunk));

// export default store;




import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { compose } from "redux";
// import rootReducer from "./reducers/rootReducer";
import reducers from "./reducers/Index";

const saveToLocalStorage = (state) => {
    const serializedUid = JSON.stringify(state.auth);
    localStorage.setItem("auth", serializedUid);
};
// const checkLocalStorage = () => {
//     const serializedUid = localStorage.getItem("auth");
//     if (serializedUid === null) return undefined;
//     return {
//         auth: JSON.parse(serializedUid),
//     };
// };

const comp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    // checkLocalStorage(),
    comp(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;












// import { applyMiddleware, compose, createStore } from "redux";
// import rootReducer from "./reducers";
// import thunk from "redux-thunk";
// import CryptoJS from "crypto-js";

// const saveToLocalStorage = (state) => {
//   // console.log(state.authUser);
//   const serializedUid = CryptoJS.AES.encrypt(
//     JSON.stringify(state.auth),
//     "my-secret-key"
//   ).toString();
//   //console.log(serializedUid);
//   localStorage.setItem("auth", serializedUid);
// };

// const checkLocalStorage = () => {
//   const serializedUid = localStorage.getItem("auth");
//   if (serializedUid === null) return undefined;
//   return {
//     auth: JSON.parse(
//       CryptoJS.AES.decrypt(serializedUid, "my-secret-key").toString(
//         CryptoJS.enc.Utf8
//       )
//     ),
//   };
// };

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// let store = createStore(
//   rootReducer,
//   checkLocalStorage(),
//   composeEnhancers(applyMiddleware(thunk))
// );

// store.subscribe(() => saveToLocalStorage(store.getState()));
// export default store;
