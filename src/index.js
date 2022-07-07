import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";

function reducer(currentState, action) {
    if (currentState === undefined) {
        return {
            login: false,
        };
    }
    const newState = { ...currentState };
    if (action.type === "login") {
        newState.login = true;
    }
    return newState;
}
const store = legacy_createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
