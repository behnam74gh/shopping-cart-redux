import { ADD_TO_CART, DEC_COUNT, INC_COUNT, REMOVE_FROM_CART } from "../Types";

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cartItems: action.payload.cartItems,
      };
    case REMOVE_FROM_CART:
      return {
        cartItems: action.payload.cartItems,
      };
    case INC_COUNT:
      return {
        cartItems: action.payload.cartItems,
      };
    case DEC_COUNT:
      return {
        cartItems: action.payload.cartItems,
      };
    default:
      return state;
  }
};
