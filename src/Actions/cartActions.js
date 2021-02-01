import { ADD_TO_CART, REMOVE_FROM_CART, INC_COUNT, DEC_COUNT } from "../Types";

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExist = false;
  cartItems.forEach((item) => {
    if (item._id === product._id) {
      item.count++;
      alreadyExist = true;
    }
  });
  if (!alreadyExist) {
    cartItems.push({
      ...product,
      count: 1,
    });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (items, product) => (dispatch) => {
  const cartItems = items.slice().filter((item) => item._id !== product._id);

  dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const incCountHandler = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  const exist = cartItems.find((item) => item._id === product._id);
  if (exist) {
    exist.count++;
  }
  dispatch({
    type: INC_COUNT,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const decCountHandler = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  const exist = cartItems.find((item) => item._id === product._id);
  if (exist && exist.count > 1) {
    exist.count--;
  }
  dispatch({
    type: DEC_COUNT,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
