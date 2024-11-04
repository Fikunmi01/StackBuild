import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <div className="md:mx-10 bg-black h-72 relative ">
        <img src="/assets/Exclude.png" className="p-4" alt="logo image" />

        <div className="flex gap-y-6 items-center flex-col pt-5 justify-center">
          <p className="text-white w-80 leading-normal font-pop text-center m-auto">
            For ads and other information you can reach out to us.
          </p>
          <p className="font-ser text-white">Contact Us</p>

          <span className="flex items-center gap-5">
            <Link
              to="https://x.com/Kvng_Fikunmi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/twitter.png" alt="" />
            </Link>
            <Link
              to="https://www.instagram.com/fikunmi_a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/instagram.png" alt="" />
            </Link>
            <Link
              to="https://www.linkedin.com/in/fikunmi-adekunle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/linkedin.png" alt="" />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
