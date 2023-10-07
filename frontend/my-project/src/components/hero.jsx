import React from "react";

export const Hero = () => {
  return (
    <>
      <div className="relative px-4">
      <div className="absolute w-[38rem] z-10 bg-white left-16 py-20 px-16">
          <h2 className="text-xl font-sans pb-2 text-lightGray">FEATURED ARTICLE</h2>
          <h1 className="font-serif text-4xl pb-2 font-bold leading-tight">World's Most Dangerous Techcnology Ever Made.</h1>
          <div className="flex gap-4 items-center pb-2 font-sans">
            <p className="text-base text-lightGray font-normal">Ralph Hawkins</p>
            <img src="/assets/Ellipse1.png" alt="" />
            <p className="text-base text-lightGray">May 7, 2019 (10 mins read)</p>
          </div>
          <p className="text-base font-normal text-[#000]">
            Proident aliquip velit qui commodo officia qui consectetur dolor
            ullamco aliquip elit incididunt. Ea minim ex consectetur excepteur.
            Ex laborum nostrud mollit sint consectetur Lorem amet aliqua do
            enim. Commodo duis dolor anim excepteur. In aliquip mollit nulla
            consequat velit magna.
          </p>
        </div>
        <img  src="/assets/hero.png" className="" alt="" />
       
      </div>
    </>
  );
};
