import React from "react";
import { Homepage } from "./pages/homepage";
import { Route, Routes } from "react-router-dom";
import { SinglePost } from "./pages/singlepage";
import { Search } from "./components/searchedPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/search/:q" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
