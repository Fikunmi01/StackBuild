import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/loginSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { username } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, username }))
      .then((res) => {
        console.log(res);
        if (res.payload && res.payload.token) {
          localStorage.setItem("token", res.payload.token);
          alert(`You're successfully logged in.`);
          navigate(`/user/login/${res.payload.username}`);
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((err) => console.log(err));
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
          <Link to='/user/create-account'>
            Create account
          </Link>
          <p>See screenlock page</p>
        </div>
      </div>
    </>
  );
};
