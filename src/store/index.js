import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { formsReducer } from "./form/reducers";

import mySaga from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const AppStore = ({ children }) => {
  const store = createStore(
    combineReducers({
      forms: formsReducer
    }),
    applyMiddleware(sagaMiddleware)
  );
  // then run the saga
  sagaMiddleware.run(mySaga);

  // render the application

  return <Provider store={store}>{children}</Provider>;
};
