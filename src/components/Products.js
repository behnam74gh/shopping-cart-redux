import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";

import formatCurrancy from "../util";
import { fetchProducts } from "../Actions/productActions";
import { addToCart } from "../Actions/cartActions";

class Products extends Component {
  state = {
    product: null,
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (product) => this.setState({ product });
  closeModal = () => this.setState({ product: null });

  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.filteredItems ? (
            <div>loading..</div>
          ) : (
            <ul className="products">
              {this.props.filteredItems.map((item) => (
                <li key={item._id}>
                  <div className="product">
                    <a
                      href={"#" + item._id}
                      onClick={() => this.openModal(item)}
                    >
                      <img src={item.image} alt={item.title} />
                      <p>{item.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrancy(item.price)}</div>
                      <button
                        onClick={() => this.props.addToCart(item)}
                        className="button primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                {" "}
                X
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    <strong>{product.description}</strong>
                  </p>
                  <p>
                    {" "}
                    availableSizes:{" "}
                    {product.availableSizes.map((item) => (
                      <span>
                        {" "}
                        <button className="button">{item}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrancy(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filteredItems: state.products.filteredItems,
  };
};

export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);
