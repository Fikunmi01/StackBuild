import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { searchPost } from "../features/searchSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.searchedItem);
  const [search, setSearch] = useState(false);
  const { q } = useParams();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      // Only dispatch the search if searchText is not empty
      dispatch(searchPost(searchText));
    }
  };

  const handleClick = () => {
    setSearch(!search);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <div className="flex px-4 pt-6 pb-7 font-bold font-serif items-center justify-between">
        <div className="flex gap-6 items-center">
          <img src="/assets/Logo.png" alt="" />

          <ul>
            <Link to="/">
              <li className="text-xl">Home</li>
            </Link>
          </ul>
        </div>

        <div className="flex">
          {search ? (
            <div className="flex gap-4 items-center">
              <input
                type="search"
                className="outline-none border-2 border-solid z-10"
                name=""
                id=""
                value={searchText}
                onChange={handleInputChange}
              />

              <Link
                className="font-serif border-solid border-[#00] border-b-2"
                key={post.postId}
                to={`/search?q=${searchText}`}
              >
                <img
                  onClick={handleSearch}
                  className="cursor-pointer"
                  src="/assets/searchIcon.png"
                  alt=""
                />
              </Link>
            </div>
          ) : (
            <img onClick={handleClick} src="/assets/searchIcon.png" alt="" />
          )}
        </div>
      </div>
    </>
  );
};
