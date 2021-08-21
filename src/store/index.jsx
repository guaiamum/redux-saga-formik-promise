import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import createReduxWaitForMiddleware from 'redux-wait-for-action';

import { formsReducer } from "./form/reducers";

import mySaga from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const AppStore = ({ children }) => {
  const store = createStore(
    combineReducers({
      forms: formsReducer
    }),
    compose(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(createReduxWaitForMiddleware())
    )
  );
  // then run the saga
  sagaMiddleware.run(mySaga);

  // render the application

  return <Provider store={store}>{children}</Provider>;
};
