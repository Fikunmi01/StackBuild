import React from "react";

export const Hero = () => {
  return (
    <>
      <div className="relative px-4 flex flex-col-reverse md:block">
        <div className="md:absolute md:w-[38rem] z-10 bg-white md:left-16 md:py-20 md:px-16">
          <h2 className="text-xl font-ser pb-2 text-lightGray">FEATURED:</h2>
          <h1 className="font-ser text-xl  md:w-full md:text-4xl pb-2 font-bold leading-tight">
            World's Most Dangerous Techcnology Ever Made.
          </h1>
          <div className="flex flex-row md:flex gap-4 items-center pb-2 font-ser">
            <p className="text-[15px] text-[#1D1B20] font-normal">
              Ralph Hawkins
            </p>
            {/* <img src="/assets/Ellipse1.png" className="hidden md:block" alt="" /> */}
            <p className="text-[15px] font-normal text-[#1D1B20]">
              May 7, 2019 (10 mins read)
            </p>
          </div>
          <p className="text-lg font-normal text-[#000] font-pop">
            The world is filled with dangerous technologies which is now
            integrated with AI making it more dangerous than ever ... <span className="text-[10px] text-[#1D1B20]">
              Read more
            </span>
          </p>
        </div>
        <img
          src="/assets/hero.png"
          className="h-60 md:h-full mb-4 md:mb-0 rounded-2xl"
          alt=""
        />
      </div>
    </>
  );
};
