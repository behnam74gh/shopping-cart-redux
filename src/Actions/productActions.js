import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../Types";

import data from "../data.json";

export const fetchProducts = () => (dispatch) => {
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data.products,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((item) => item.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredItems, sort) => (dispatch) => {
  const sortedProducts = filteredItems.slice();

  if (sort === "Latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "Lowest"
        ? a.price > b.price
          ? 1
          : -1
        : b.price > a.price
        ? 1
        : -1
    );
  }

  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
