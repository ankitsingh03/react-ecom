import React, { Component } from "react";

class Login extends Component {
  state = { email: "", password: "" };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  add = async (e) => {
    e.preventDefault();
    await this.props.userLogin(this.state);
    this.props.history.push("/");
  };

  render() {
    return (
      <form onSubmit={this.add} className="container">
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-sm btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
export default Login;
