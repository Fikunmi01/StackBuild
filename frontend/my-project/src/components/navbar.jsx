import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { searchPost } from "../features/searchSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.search.searchedItem);
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      dispatch(searchPost(searchText));
    }
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleClick = () => {
    setSearch(!search);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="flex px-4 pt-6 pb-7 font-bold font-serif items-center justify-between">
      <div className="flex justify-between md:gap-6 items-center">
        <Link to="/">
          <img src="/assets/Exclude1.png" alt="" />
        </Link>

        <ul>
          <Link to="/">
            <li className="text-xl hidden md:visible">Home</li>
          </Link>
        </ul>
      </div>

      <div className="md:flex">
        <div className="flex items-center gap-4">
          {isAuthenticated && location.pathname !== "/create-post" && (
            <div className="px-2 py-2 md:px-4 text-[10px] md:py-2 border-solid border-2 relative postBtn text-white rounded-full md:text-xs">
              <Link to="/create-post">Create Post</Link>
            </div>
          )}
          <div>
            {search ? (
              <div className="flex top-20 gap-4 items-center">
                <input
                  type="search"
                  className="outline-none left-6 m-4 top-20 md:top-0 absolute md:relative border-2 w-4/5  border-solid z-10 rounded-lg py-1"
                  value={searchText}
                  onChange={handleInputChange}
                />
                <Link
                  className="font-serif border-solid border-[#00] border-b-2"
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
              <img
                onClick={handleClick}
                src="/assets/searchIcon.png"
                alt=""
                className="cursor-pointer"
              />
            )}
          </div>

          <Link
            to="/user/login"
            className={isAuthenticated ? "hidden" : "visible"}
          >
            <p className="border-2 border-solid border-black px-4 py-1 rounded-lg">
              Login
            </p>
          </Link>

          {/* {isAuthenticated && <img src="/assets/bell.png" alt="" />} */}

          {isAuthenticated && (
            <Link to="/profile/">
              <img src="/assets/user 1.png" alt="" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};