import React from "react";
// Sections
import Header from "../componentsLanding/Sections/Header";
import Services from "../componentsLanding/Sections/Services";
import Projects from "../componentsLanding/Sections/Projects";
import Blog from "../componentsLanding/Sections/Blog";
import Pricing from "../componentsLanding/Sections/Pricing";
import Contact from "../componentsLanding/Sections/Contact";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function Landing() {

  //scroll on top
  const onTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <button className='onTop' onClick={onTop}>
        <FaArrowAltCircleUp />
      </button>
      <Header />
      <Services />
      <Projects />
      <Blog />
      <Pricing />
      <Contact />
    </>
  );
}


