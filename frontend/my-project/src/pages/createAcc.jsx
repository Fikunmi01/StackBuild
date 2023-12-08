import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/user/createSlice";
import { useNavigate, Link } from "react-router-dom";

export const CreateAcc = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.create.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwad, setConfirmPwad] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = (event) => {
    event.preventDefault(); // Prevent the default form submit behavior

    if (password !== confirmPwad) {
      setError("Passwords do not match");
      return;
    }
    

    if (email && username && firstName && lastName && password) {
      dispatch(createUser({ email, username, firstName, lastName, password }))
        .then(() => {
          console.log("User created successfully");
          navigate('/welcome')
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };

  // console.log(user, "User created ");

  return (
    <>
      <div>
        <Navbar />
        <div>
          <form
            id="form1"
            onSubmit={createAccount}
            className="md:w-2/5 px-10 m-auto py-6"
          >
            <h1 className="font-serif md:text-2xl mb-4">Create your account</h1>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm italic font-medium font-serif">Email address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id=""
                className="border-2 md:mb-2 outline-none p-2 rounded-lg mb-2"
              />

              <label htmlFor="username" className="text-sm italic font-medium font-serif">Username</label>
              <input
                type="text"
                name="username"
                id=""
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 md:mb-2 outline-none p-2 rounded-lg mb-2"
              />

              <label htmlFor="fname" className="text-sm italic font-medium font-serif">First name</label>
              <input
                type="text"
                name="fname"
                id=""
                onChange={(e) => setfirstName(e.target.value)}
                className="border-2 md:mb-2 outline-none p-2 rounded-lg mb-2"
              />

              <label htmlFor="lname" className="text-sm italic font-medium font-serif">Last name</label>
              <input
                type="text"
                name="lname"
                id=""
                onChange={(e) => setLastName(e.target.value)}
                className="border-2 md:mb-2 outline-none p-2 rounded-lg mb-2"
              />

              <label htmlFor="pwad" className="text-sm italic font-medium font-serif">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="pwad"
                id=""
                className="border-2 md:mb-2 outline-none p-2 rounded-lg mb-2"
              />

              <label htmlFor="cpwad" className="text-sm italic font-medium font-serif">Confirm password</label>
              <input
                type="password"
                name="cpwad"
                onChange={(e) => setConfirmPwad(e.target.value)}
                id=""
                className="border-2 md:mb-2 outline-none p-2 rounded-lg "
              />

              {error && <p>{error}</p>}
              <button type="submit" className="bg-black text-white mt-5 p-4 rounded-lg">
                create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
