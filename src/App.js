import "./App.css";
import React from "react";
import ProductList from "./components/ProductList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

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
    userToken: "",
  };

  GetProduct = async () => {
    await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => this.setState({ products: json }));
    // console.log(this.state.products)
  };

  GetUser = async () => {
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
        this.setState({ userToken: json });
        console.log(json);
      })
      .catch((error) => console.error("Error:", error));
  };

  componentDidMount() {
    // this.GetUser();
    this.GetProduct();
    // this.deleteProduct();
  }

  addProduct = (product) => {
    const { id, title, price, description, category, image } = product;
    fetch("https://fakestoreapi.com/products", {
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
        // console.log(products);
        this.setState({ products });
        // console.log("***",this.state.products);
      });
  };

  updateProduct = (product) => {
    // console.log(product);
    const { id, title, price, description, category, image } = product;
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
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
        console.log(data);
        const products = this.state.products.map((p) => {
          return p.id == data.id ? product : p;
        });
        this.setState({ products });
      });
  };

  deleteProduct = (id) => {
    console.log(id);
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    const products = this.state.products.filter((product) => product.id !== id);
    // console.log(products);
    this.setState({ products });
  };

  render() {
    return (
      <Router>
        <Header />
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
        </Switch>
      </Router>
    );
  }
}

export default App;
