import React from "react";
import { ProductConsumer } from "../../context/context";
import Title from "../Title";
import ProductFilter from "./ProductFilter";
import Product from "../Product";

export default function products() {
  return (
    <ProductConsumer>
      {(value) => {
        const { filterdProducts } = value;
        return (
          <section className="py-5">
            <div className="container">
              <Title title="our products" center="true" />
              <ProductFilter />
              <div className="row">
                <div className="col-10 mx-auto">
                  <h6 className="text-title">
                    total products : {filterdProducts.length}
                  </h6>
                </div>
              </div>
              <div className="row py-5">
                {filterdProducts.length === 0 ? (
                  <div className="col text-title text-center">
                    sorry, no items matched your search
                  </div>
                ) : (
                  filterdProducts.map((product) => {
                    return <Product key={product.id} product={product} />;
                  })
                )}
              </div>
            </div>
          </section>
        );
      }}
    </ProductConsumer>
  );
}
