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
            className="w-2/5 px-10 m-auto py-16"
          >
            <h1 className="">Create your account</h1>
            <div className="flex flex-col">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id=""
                className="border-2 w-full"
              />

              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id=""
                onChange={(e) => setUsername(e.target.value)}
                className="border-2"
              />

              <label htmlFor="fname">First name</label>
              <input
                type="text"
                name="fname"
                id=""
                onChange={(e) => setfirstName(e.target.value)}
                className="border-2"
              />

              <label htmlFor="lname">Last name</label>
              <input
                type="text"
                name="lname"
                id=""
                onChange={(e) => setLastName(e.target.value)}
                className="border-2"
              />

              <label htmlFor="pwad">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="pwad"
                id=""
                className="border-2"
              />

              <label htmlFor="cpwad">Confirm password</label>
              <input
                type="password"
                name="cpwad"
                onChange={(e) => setConfirmPwad(e.target.value)}
                id=""
                className="border-2"
              />

              {error && <p>{error}</p>}
              <button type="submit" className="bg-black text-white">
                create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
