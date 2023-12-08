import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <div className="md:mx-10 bg-black h-72 relative ">
        <div className="flex gap-y-6 items-center flex-col pt-10 justify-center">
          <h1 className="z-10 text-3xl text-white font-serif">want to connect?</h1>
          <p className="text-white w-80 leading-normal font-sans text-center m-auto">
            Laboris consectetur sunt nulla eiusmod voluptate eiusmod dolor nisi
            qui..
          </p>
          <span className="flex items-center gap-5">
            <Link>
              <img src="/assets/twitter.png" alt="" />
            </Link>
            <Link>
              <img src="/assets/instagram.png" alt="" />
            </Link>
            <Link>
              <img src="/assets/linkedin.png" alt="" />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
