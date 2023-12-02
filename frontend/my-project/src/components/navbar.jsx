import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { searchPost } from "../features/searchSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.searchedItem);
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const { q } = useParams();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      // Only dispatch the search if searchText is not empty
      dispatch(searchPost(searchText));
    }
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  console.log(user);


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
          <img src="/assets/Logo3.png" alt="" />

          <ul>
            <Link to="/">
              <li className="text-xl">Home</li>
            </Link>
          </ul>
        </div>

        <div className="flex">
          <div className="flex items-center gap-6">
            <div>
              {search ? (
                <div className="flex gap-4 items-center">
                  <input
                    type="search"
                    className="outline-none border-2 border-solid z-10 rounded-lg py-1"
                    name=""
                    id=""
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

            {isAuthenticated && <img src="/assets/bell.png" alt="" />}

            {isAuthenticated && (
              <Link to="/profile">
                <img src="/assets/user 1.png" alt="" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
