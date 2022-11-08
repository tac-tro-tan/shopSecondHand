import React from "react";
// Sections
import Header from "../componentsLanding/Sections/Header";
import Services from "../componentsLanding/Sections/Services";
import Projects from "../componentsLanding/Sections/Projects";
import Blog from "../componentsLanding/Sections/Blog";
import Pricing from "../componentsLanding/Sections/Pricing";
import Contact from "../componentsLanding/Sections/Contact";

export default function Landing() {
  return (
    <>
      <Header />
      <Services />
      <Projects />
      <Blog />
      <Pricing />
      <Contact />
    </>
  );
}


