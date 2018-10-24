import Expo from "expo";
import React from 'react';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import todos from "./reducers/todos";
import AppContainer from "./containers/AppContainer";

const store = createStore(todos);

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

export default Expo.registerRootComponent(Root);