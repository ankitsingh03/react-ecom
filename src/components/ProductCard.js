import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render() {
    // console.log(this.props.product);
    const { id, title, price, image } = this.props.product;
    return (
      <div className="box-list">
        <Link to={{ pathname: `/product/${id}`, state: this.props.product }}>
          <div>
            <img src={image} height="200" width="200" />
            <div>{title}</div>
            <div>price: {price}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
