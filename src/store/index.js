
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import homeReducer from "./homeStore";
import sameCityReducer from "./sameCityStore";
import messageReducer from "./messageStore";
import userReducer from "./userStore";
import centerButtonReducer from "./centerButtonStore";

const reducer = combineReducers({
  userReducer,
  homeReducer,
  sameCityReducer,
  messageReducer,
  centerButtonReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
