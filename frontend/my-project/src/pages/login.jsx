import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/loginSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.data ?? {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { username } = useParams();

  const navigate = useNavigate();
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, username }))
      .then(unwrapResult) // This ensures we're working with the action payload directly
      .then((res) => {
        // Now, res directly contains the payload
        const accessToken = res.data.token?.accessToken;
        const userId = res.data.user?._id;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userId", userId);
        }
        if (userId) {
          alert(`You're successfully logged in.`);
          navigate(`/user/profile/${userId}`);
        } else {
          // Handle case where userId is undefined
          navigate(`/`);
        }
        console.log("token ", accessToken);
        console.log("iddd ", userId);
        console.log("user two", res);
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during login.");
      });
  };
  return (
    <>
      <div>
        <Navbar />

        <div className="flex items-center justify-center relative mt-4 md:mt-20 px-5 md:w-1/2 m-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-3xl font-serif font-bold leading-relaxed">
              Welcome back!
            </h2>
            <p className="font-sans md:text-xl pb-4 text-md  m-auto">
              Sign in to get the most out of 3FK5
            </p>

            <div className="flex gap-y-4 flex-col">
              <span className="flex font-sans">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#F8F8F8] w-full pl-10 py-3 outline-none rounded-xl relative placeholder-shown:text-sm md:placeholder-shown:text-base text-sm md:text-base"
                />
                <img
                  src="/assets/avatar.png"
                  className="pl-3 w-8 pt-3.5 absolute"
                  alt=""
                />
              </span>

              <span className="flex font-sans">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-[#F8F8F8] w-full pl-10 py-3 outline-none rounded-xl relative placeholder-shown:text-sm md:placeholder-shown:text-md text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  src="/assets/key.png"
                  className="pl-3 w-8 pt-3.5 absolute"
                  alt=""
                />
              </span>

              <div className="flex justify-between items-center">
                <span className="flex text-lightGray gap-2">
                  <input type="checkbox" name="check" id="" />
                  <label htmlFor="check" className="text-sm font-sans">
                    Remember me
                  </label>
                </span>

                <span className="text-lightGray">
                  <Link to="">
                    <p className="text-sm">forgot password?</p>
                  </Link>
                </span>
              </div>

              <button className="font-serif text-2xl border-2 py-3 rounded-lg border-black border-solid">
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="md:top-36 top-24 flex justify-between mx-4 relative">
          <Link to="/user/create-account">Create account</Link>
          <p>See screenlock page</p>
        </div>
      </div>
    </>
  );
};
