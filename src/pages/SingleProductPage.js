import React from "react";
import Hero from "../components/Hero";
import singleProductBcg from "../images/singleProductBcg.jpeg";
import InfoProduct from "../components/singleProductPage/InfoProduct";

export default function SingleProductPage() {
  return (
    <>
      <Hero img={singleProductBcg} title="single product" />
      <InfoProduct />
    </>
  );
}
