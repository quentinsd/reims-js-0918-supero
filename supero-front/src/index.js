import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import activitiesReducer from "./reducers/activitiesReducer";
import loadingReducer from "./reducers/loadingReducer";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { connectRouter, ConnectedRouter } from "connected-react-router";

const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = history =>
  combineReducers({
    activities: activitiesReducer,
    loading: loadingReducer,
    form: formReducer,
    router: connectRouter(history)
  });

const store = createStore(
  rootReducer(history),
  composeEnhancer(applyMiddleware(routerMiddleware(history)))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
