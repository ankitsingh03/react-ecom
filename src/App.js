import "./App.css";
import React from "react";
import ProductList from "./components/ProductList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";

class App extends React.Component {
  state = {
    products: [
      {
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
      },
    ],
    isUserLogin: false,
  };

  GetProduct = async () => {
    await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => this.setState({ products: json }));
  };

  userLogin = async (user) => {
    // console.log(user);
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");

    await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username: "johnd",
        password: "m38rmF$",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        localStorage.setItem("userToken", json.token);
        localStorage.setItem("isUserLogin", true);
        this.setState({ isUserLogin: true });
      })
      .catch((error) => console.error("Error:", error));
  };

  userLogOut = () => {
    localStorage.setItem("userToken", "");
    localStorage.setItem("isUserLogin", false);
    this.setState({ isUserLogin: false });
  };

  componentDidMount() {
    // this.userLogin();
    this.GetProduct();
  }

  addProduct = async (product) => {
    const { id, title, price, description, category, image } = product;
    await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        image: image,
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let products = [
          ...this.state.products,
          { id: data["_id"], title, price, description, category, image },
        ];
        this.setState({ products });
      });
  };

  updateProduct = async (product) => {
    const { id, title, price, description, category, image } = product;
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        image: image,
        category: category,
      }),
    })
      // this api return same id that you pass
      .then((res) => res.json())
      .then((data) => {
        const products = this.state.products.map((p) => {
          return p.id == data.id ? product : p;
        });
        this.setState({ products });
      });
  };

  deleteProduct = (id) => {
    console.log(id) 
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    // this return full product info but the problem is not appliable for new created product
    // use individual process for delete
    console.log(this.state.products)
    const products = this.state.products.filter((product) => product.id !== id);
    console.log(products)
    this.setState({ products });
  };

  render() {
    return (
      <Router>
        <Header
          userLogOut={this.userLogOut}
          isUserLogin={this.state.isUserLogin}
        />
        <Switch>
          <Route path="/" exact>
            <ProductList products={this.state.products} />
          </Route>
          {/* <Route exact path="/product/:id" component={ProductDetail} onDelete={this.deleteProduct} /> */}
          <Route
            exact
            path="/product/:id"
            render={(props) => (
              <ProductDetail {...props} onDelete={this.deleteProduct} />
            )}
          />
          <Route
            exact
            path="/addproduct"
            // here render is use to redirect the page because push function not present in simple routes
            render={(props) => (
              <AddProduct {...props} addProduct={this.addProduct} />
            )}
          />
          {/* <Route exact path='/product/:id/edit' component={EditProduct} /> */}
          <Route
            exact
            path="/product/:id/edit"
            render={(props) => (
              <EditProduct {...props} updateProduct={this.updateProduct} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} userLogin={this.userLogin} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
