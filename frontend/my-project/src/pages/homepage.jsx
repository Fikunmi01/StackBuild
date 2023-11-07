import React from "react";
import { Navbar } from "../components/navbar";
import { Hero } from "../components/hero";
import { Editor } from "../components/editor";
import { Footer } from "../components/footer";

export const Homepage = () => {
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <Editor />
        <Footer />
      </div>
    </>
  );
};
