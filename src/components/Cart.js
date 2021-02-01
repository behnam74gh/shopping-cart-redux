import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import {
  removeFromCart,
  incCountHandler,
  decCountHandler,
} from "../Actions/cartActions";
import { createOrder, clearOrder } from "../Actions/orderAction";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

import formatCurrancy from "../util";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      email: "",
      name: "",
      address: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  createOrderHandler = (e) => {
    e.preventDefault();
    let date = new Date();
    date = date.toDateString();
    const order = {
      email: this.state.email,
      name: this.state.name,
      address: this.state.address,
      date: date,
      cart: this.props.cartItems,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  render() {
    const { cartItems, order } = this.props;

    return (
      <div>
        {this.props.cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is Empty</div>
        ) : (
          <div className="cart cart-header">
            you have {cartItems.length} in the cart
          </div>
        )}

        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="order-details">
                <h3 className="success-message">your order has been placed.</h3>
                <h2>order: {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.date}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrancy(order.total)}</div>
                  </li>
                  <li>
                    <div>CartItems:</div>
                    <div>
                      {order.cartItems.map((item) => (
                        <div>
                          {item.count} {" X "} {item.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}

        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {localStorage.getItem("cartItems") &&
                this.props.cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                      <button
                        className="btn"
                        onClick={() => this.props.incCountHandler(item)}
                      >
                        +
                      </button>
                      <button
                        className="btn"
                        onClick={() => this.props.decCountHandler(item)}
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="text-right">
                        {formatCurrancy(item.price)} * {item.count}{" "}
                        <button
                          className="button"
                          onClick={() =>
                            this.props.removeFromCart(
                              this.props.cartItems,
                              item
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length > 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrancy(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  onClick={() => this.setState({ showCheckout: true })}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {this.state.showCheckout && (
              <Fade right cascade>
                <div className="cart">
                  <form
                    className="form-container"
                    onSubmit={this.createOrderHandler}
                  >
                    <ul className="ulWrapper">
                      <li>
                        <label>Email: </label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label>Name: </label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label>Address: </label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    order: state.order.order,
  };
};

export default connect(mapStateToProps, {
  removeFromCart,
  incCountHandler,
  decCountHandler,
  createOrder,
  clearOrder,
})(Cart);
