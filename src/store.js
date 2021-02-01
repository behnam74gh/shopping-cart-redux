import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import { productsReducer } from "./reducers/productsReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";

const initialState = {};
const middleWares = [thunk];
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleWares))
);

export default store;
