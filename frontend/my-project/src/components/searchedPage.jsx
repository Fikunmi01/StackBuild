import React, { useEffect } from "react";
import { Navbar } from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchPost } from "../features/searchSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.searchedItem);
  const { q } = useParams();

  useEffect(() => {
    dispatch(searchPost(q));
    console.log(search)
  }, [q]);

  return (
    <div>
      Hellov vjvuvbub
      {/* {search.searchedItem.map((item) => { */}
        {/* return ( */}
          <>
            {/* <Navbar /> */}

            {/* <img src={item.imgSrc} alt="" /> */}
          </>
        {/* ); */}
      {/* })} */}
    </div>
  );
};
