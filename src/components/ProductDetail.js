import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductDetail extends Component {
  deleteproduct = (id) => {
    let confirm = window.confirm("Do you really want to delete this item?");
    if (confirm) {
      this.props.onDelete(id);
      this.props.history.push("/");
    }
  };

  render() {
    const { id, title, price, description, category, image } =
      this.props.location.state;
    return (
      <div className="container-detail">
        <div className="box-detail">
          <img src={image} height="400" width="400" />
        </div>
        <div className="box-detail">
          <div>Product Name: {title}</div>
          <hr />
          <div>Price: {price}</div>
          <hr />
          <div>description: {description}</div>
          <hr />
          <div>Product Category: {category}</div>
          <Link
            to={{
              pathname: `/product/${id}/edit`,
              state: this.props.location.state,
            }}
          >
            <button>Edit Product</button>
          </Link>
          <button onClick={() => this.deleteproduct(id)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
