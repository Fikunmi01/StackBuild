import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Navbar } from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchPost } from "../features/searchSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchedItem);
  const { q } = useParams();

  useEffect(() => {
    if (q) {
      dispatch(searchPost(q));
    }
  }, [q]);

  console.log(search);

  return (
    <div>
      <Navbar />

      {search.map((item) => {
        return (
          <>
            <div className="flex relative flex-col items-center justify-center px-4 md:px-48 mb-4 md:mb-0 md:py-16 md:gap-10  ">
              <div className="w-80 flex items-center object-contain">
                <img src={item.imgSrc} alt="" className="w-full" />
              </div>

              <div className="w-full">
                <h2 className="text-xl text-lightGray lead font-sans">
                  {item.tag}
                </h2>
                <h1 className="text-3xl font-serif font-bold pb-2">
                  {item.title}
                </h1>

                <div className="flex gap-4 items-center pb-2">
                  <p className="text-base text-lightGray font-sans font-normal">
                    {item.author}
                  </p>
                  <img src="/assets/Ellipse1.png" alt="" />
                  <p className="text-base font-sans text-lightGray">
                    {item.createdAt}
                  </p>
                </div>

                <p className="text-base font-sans font-normal text-[#000]">
                  {item.description}
                </p>

                <Link
                  className="font-serif border-solid border-[#00] border-b-2"
                  key={item._id}
                  to={`/post/${item._id}`}
                >
                  Read more
                </Link>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
