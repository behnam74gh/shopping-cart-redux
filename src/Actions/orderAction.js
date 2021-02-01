import { CLEAR_ORDER, CREATE_ORDER } from "../Types";

export const createOrder = (order) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER,
    payload: order,
  });
  localStorage.clear("cartItems");
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
