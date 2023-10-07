import React, { useState } from "react";

export const Navbar = () => {
  const [search, setSearch] = useState(false);

  const handleClick = () => {
    setSearch(!search);
  };

  return (
    <>
      <div className="flex px-4 pt-6 pb-7 font-bold font-serif items-center justify-between ">
        <div className="flex gap-6 items-center">
          <img src="/assets/Logo.png" alt="" />

          <ul>
            <li className="text-xl">Home</li>
          </ul>
        </div>

        <div className="flex">
          <input
            type="search"
            className="border-2 border-solid border-black z-10"
            name=""
            id=""
            onClick={handleClick}
          />
            <img src="/assets/searchIcon.png" alt="" />
        </div>
      </div>
    </>
  );
};c
