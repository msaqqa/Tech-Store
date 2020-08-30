import React from "react";
import Hero from "../components/Hero";
import aboutBcg from "../images/aboutBcg.jpeg";
import Info from "../components/aboutPage/Info";

export default function AboutPage() {
  return (
    <>
      <Hero img={aboutBcg} />
      <Info />
    </>
  );
}
