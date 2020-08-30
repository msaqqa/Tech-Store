import React from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import Services from "../components/homePage/Services";
import Featured from "../components/homePage/Featured";

export default function HomePage() {
  return (
    <>
      <Hero max="true" title="awesome gadgets">
        <Link to="/products" className="main-link">
          Our Products
        </Link>
      </Hero>
      <Services />
      <Featured />
    </>
  );
}
