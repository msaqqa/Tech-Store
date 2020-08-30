import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import DefaultPage from "./pages/DefaultPage";

// components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SideCart from "./components/SideCart";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <SideCart />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/products" component={ProductsPage} />
        <Route exact path="/product/:id" component={SingleProductPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/:DefaultPage" component={DefaultPage} />
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
