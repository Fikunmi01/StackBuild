import React from "react";
import { Navbar } from '../components/navbar'
import { Hero } from '../components/hero'
import { Editor } from "../components/editor";

export const Homepage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Editor />
        </div>
    )
}