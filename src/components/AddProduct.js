import React, { Component } from "react";

class AddProduct extends Component {
  state = {
    title: "",
    price: "",
    description: "",
    image: "https://i.pravatar.cc",
    category: "grapefruit",
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  add = (e) => {
    e.preventDefault();
    this.props.addProduct(this.state);
    this.props.history.push("/");
  };

  render() {
    return (
      <form className="container" onSubmit={this.add}>
        <label className="form-lable">Title</label>
        <input
          type="text"
          class="form-control mb-3"
          name="title"
          value={this.state.title}
          onChange={this.onChangeHandler}
        ></input>

        <label className="form-lable">description</label>
        <input
          class="form-control mb-3"
          name="description"
          value={this.state.description}
          onChange={this.onChangeHandler}
        ></input>
        <label className="form-lable">price</label>
        <input
          class="form-control mb-3"
          name="price"
          value={this.state.price}
          onChange={this.onChangeHandler}
        ></input>
        <label className="form-lable">
          Pick your favorite category:
          <select
          className='mb-3'
            name="category"
            value={this.state.category}
            onChange={this.onChangeHandler}
          >
            <option value="electronics">electronics</option>
            <option value="jewelery">jewelery</option>
            <option value="men's clothing">men's clothing</option>
            <option value="women's clothing">women's clothing</option>
          </select>
        </label>
        <br />
        <button type="submit" class="btn btn-primary">
          Add
        </button>
      </form>
    );
  }
}

export default AddProduct;
