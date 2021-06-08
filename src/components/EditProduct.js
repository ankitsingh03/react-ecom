import React, { Component } from "react";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    const { id, title, price, description, category, image } =
      this.props.location.state;

    this.state = {
      id,
      title,
      price,
      description,
      image,
      category,
    };
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  add = async (e) => {
    e.preventDefault();
    await this.props.updateProduct(this.state);
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
            className="mb-3"
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
export default EditProduct;
