import React from "react";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Editor } from "./components/editor";

function App() {
  return (
      <div>
        <Navbar/>
        <Hero/>
        <Editor/>
      </div>
  );
}

export default App;
