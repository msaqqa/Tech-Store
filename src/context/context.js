import React, { Component } from "react";
import { linkData } from "./linkData";
import { socialData } from "./socialData";
import { items } from "./productData";

const ProductContext = React.createContext();

export default class ProductProvider extends Component {
  state = {
    sidebar: false,
    sidecart: false,
    links: linkData,
    social: socialData,
    storeProducts: [],
    filterdProducts: [],
    featuredProducts: [],
    loading: true,
    singleProduct: {},
    cart: [],
    cartItems: 0,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    search: "",
    company: "all",
    price: 0,
    min: 0,
    max: 0,
    shipping: false,
  };

  componentDidMount = () => {
    this.setProducts(items);
  };

  // set Products
  setProducts = (items) => {
    const storeProducts = items.map((item) => {
      const id = item.sys.id;
      const image = item.fields.image.fields.file.url;
      const product = { id, ...item.fields, image };
      return product;
    });

    // featured products
    const featuredProducts = storeProducts.filter((item) => {
      return item.featured === true;
    });

    // max price
    const maxPrice = Math.max(...storeProducts.map((item) => item.price));

    this.setState(
      {
        storeProducts,
        filterdProducts: storeProducts,
        featuredProducts,
        loading: false,
        singleProduct: this.getSingleProduct(),
        cart: this.getStorageCart(),
        price: maxPrice,
        max: maxPrice,
      },
      () => {
        this.addTotals();
      }
    );
  };

  handleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };

  handleSidecart = () => {
    this.setState({ sidecart: !this.state.sidecart });
  };

  openSidecart = () => {
    this.setState({ sidecart: true });
  };

  // set single product
  setSingleProduct = (id) => {
    const product = this.state.storeProducts.find((item) => item.id === id);
    localStorage.setItem("singleProduct", JSON.stringify(product));
    this.setState({
      singleProduct: product,
      loading: false,
    });
  };

  // get single product from local storage
  getSingleProduct = () => {
    return localStorage.getItem("singleProduct")
      ? JSON.parse(localStorage.getItem("singleProduct"))
      : {};
  };

  //add to cart
  addToCart = (id) => {
    let tempCart = [...this.state.cart];
    let tempItem = tempCart.find((item) => item.id === id);

    if (!tempItem) {
      tempCart = [...this.state.storeProducts];
      tempItem = tempCart.find((item) => {
        return item.id === id;
      });
      const total = tempItem.price;
      const cartItem = { ...tempItem, count: 1, total };
      tempCart = [...this.state.cart, cartItem];
    } else {
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }

    this.setState(
      {
        cart: tempCart,
      },
      () => {
        this.addTotals();
        this.syncStorage();
        this.openSidecart();
      }
    );
  };

  // sync storage
  syncStorage = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  };

  // get cart from local storage
  getStorageCart = () => {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  };

  // get totals
  getTotals = () => {
    let cartItems = 0;
    let subTotal = 0;
    this.state.cart.forEach((item) => {
      cartItems += item.count;
      subTotal += item.total;
    });

    subTotal = parseFloat(subTotal.toFixed(2));
    let tax = subTotal * 0.2;
    tax = parseFloat(tax.toFixed(2));
    let total = subTotal + tax;
    total = parseFloat(total.toFixed(2));
    return {
      cartItems,
      subTotal,
      tax,
      total,
    };
  };

  //add totals
  addTotals = () => {
    const totals = this.getTotals();
    this.setState(() => {
      return {
        cartItems: totals.cartItems,
        cartSubTotal: totals.subTotal,
        cartTax: totals.tax,
        cartTotal: totals.total,
      };
    });
  };

  // cart faunctionality
  // increment
  increment = (id) => {
    const tempCart = this.state.cart;
    const tempItem = tempCart.find((item) => item.id === id);
    tempItem.count++;
    tempItem.total = tempItem.price * tempItem.count;
    tempItem.total = parseFloat(tempItem.total.toFixed(2));
    console.log(tempItem.count);
    this.setState({ cart: tempCart }, () => {
      this.addTotals();
      this.syncStorage();
    });
  };

  // decrement
  decrement = (id) => {
    const tempCart = this.state.cart;
    const tempItem = tempCart.find((item) => item.id === id);
    tempItem.count--;
    if (tempItem.count === 0) {
      this.removeItem(id);
    } else {
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
      this.setState({ cart: tempCart }, () => {
        this.addTotals();
        this.syncStorage();
      });
    }
  };

  //  remove
  removeItem = (id) => {
    const tempCart = this.state.cart;
    const tempItem = tempCart.filter((item) => {
      return item.id !== id;
    });
    this.setState({ cart: tempItem }, () => {
      this.addTotals();
      this.syncStorage();
    });
  };

  // clear cart
  clearCart = () => {
    this.setState({ cart: [] }, () => {
      this.addTotals();
      this.syncStorage();
    });
  };

  // filter faunctionality
  //handle filtering
  handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState(
      {
        [name]: value,
      },
      () => this.sortData()
    );
  };

  // sort data
  sortData = () => {
    const { storeProducts, search, price, company, shipping } = this.state;
    let tempProducts = [...storeProducts];

    // filtering based on search
    if (search.length > 0) {
      tempProducts = tempProducts.filter((item) => {
        let tempSearch = search.toLowerCase();
        let tempTitle = item.title.toLowerCase().slice(0, search.length);
        if (tempSearch === tempTitle) {
          return item;
        }
      });
    }

    // filtering based on price
    let tempPrice = parseInt(price);
    tempProducts = tempProducts.filter((item) => item.price <= tempPrice);

    // filtering based on company
    if (company !== "all") {
      tempProducts = tempProducts.filter((item) => item.company === company);
    }

    // filtering based on shipping
    if (shipping) {
      tempProducts = tempProducts.filter((item) => item.freeShipping === true);
    }

    this.setState({
      filterdProducts: tempProducts,
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleSidebar: this.handleSidebar,
          handleSidecart: this.handleSidecart,
          setSingleProduct: this.setSingleProduct,
          addToCart: this.addToCart,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
