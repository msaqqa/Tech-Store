import React from "react";
import { ProductConsumer } from "../../context/context";
import CartItem from "./CartItem";

export default function CartList() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <ProductConsumer>
            {(value) => {
              const { cart, increment, decrement, removeItem } = value;
              if (cart.length === 0) {
                return (
                  <h1 className="text-title text-center my-4">
                    your cart is currently empty
                  </h1>
                );
              }
              return (
                <div className="container-fluid">
                  {cart.map((item, index) => {
                    return (
                      <CartItem
                        key={item.id}
                        cartItem={item}
                        increment={increment}
                        decrement={decrement}
                        removeItem={removeItem}
                      />
                    );
                  })}
                </div>
              );
            }}
          </ProductConsumer>
        </div>
      </div>
    </div>
  );
}
