import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  checkUserLogin = () => {
    const token = localStorage.getItem("userToken");
    if (token === "") {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      );
    } else {
      // localStorage.setItem("userToken", "");
      return (
        <li className="nav-item">
          <Link className="nav-link" onClick={this.props.userLogOut}>
            Log out
          </Link>
        </li>
      );
    }
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/addproduct"
                >
                  Add Product
                </Link>
              </li>
              {this.checkUserLogin()}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li> */}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
