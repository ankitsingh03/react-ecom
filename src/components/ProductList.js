import React, { Component } from "react";
import ProductCard from "./ProductCard";

class ProductList extends Component {
  render() {
    let productList = this.props.products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
    return <div className="container-list">{productList}</div>;
  }
}

export default ProductList;
