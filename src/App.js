import React from "react";
import "./App.css";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
// import "./lib/font-awesome/css/all.css";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  decCountHandler = (product) => {
    const exist = this.state.cartItems.find((item) => item._id === product._id);
    if (exist && exist.count > 1) {
      const cartItems = this.state.cartItems;
      this.setState({
        cartItems: cartItems.map((item) => {
          return item._id === product._id
            ? { ...exist, count: exist.count - 1 }
            : item;
        }),
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          cartItems.map((item) => {
            return item._id === product._id
              ? { ...exist, count: exist.count - 1 }
              : item;
          })
        )
      );
    }
  };

  orderFuncHandler = (order) => {
    alert("lady,daa..." + order.name);
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products />
              </div>
              <div className="sidebar">
                <Cart />
              </div>
            </div>
          </main>
          <footer>All Rights is Reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
