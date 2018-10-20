import Expo from "expo";
import React from 'react';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import reducers from "./reducers";
import App from "./App";

const store = createStore(reducers);

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default Expo.registerRootComponent(Root);