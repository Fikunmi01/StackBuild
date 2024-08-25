import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom"; // Import useLocation
import { searchPost } from "../features/searchSlice"; // Import searchPost action
import { loginUser } from "../features/user/loginSlice";

export const NavLogged = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const { q } = useParams();
  const [searchText, setSearchText] = useState(q || ""); // Initialize with query param if available
  const location = useLocation(); // Get the current location

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

  useEffect(() => {
    if (q) {
      setSearchText(q);
      dispatch(searchPost(q));
    }
  }, [q, dispatch]);

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
          <div className="flex items-center gap-10">
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

            <Link to="/user/login">
              <p className="border-2 border-solid border-black px-4 py-1 rounded-lg">
                Login
              </p>
            </Link>

            <img src="/assets/bell.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};