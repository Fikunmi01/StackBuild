import React from "react";
import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <>
      <div>You've successfully created your account nigger</div>
      <Link to='/'>
        Home
      </Link>
      <Link to='/user/login'>return to login</Link>
    </>
  );
};
