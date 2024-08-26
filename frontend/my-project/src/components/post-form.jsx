import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/post/postSlice";
import { Navbar } from "./navbar";
import TextEditor from "./textEditor";

export const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imgSrc: null,
    tag: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  console.log(user.user.data.user.firstName,'tesstt to see user'); // Log the user object to check its content

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imgSrc: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    postData.append("tag", formData.tag);
    postData.append("author", `${user.user.data.user.firstName} ${user.user.data.user.lastName}`);
    // if (formData.imgSrc) {
    //   postData.append("imgSrc", formData.imgSrc);
    // }
    console.log(postData, 'jcnjdnjbb');
    for (let [key, value] of postData.entries()) {
      console.log(`${key}: ${value}`);
    }
    dispatch(addPost(postData));
    console.log(postData, 'post formfhfsb d');

  };

  return (
    <>
      <div>
        <Navbar />
        <form className="mx-4 border-dashed border-4" onSubmit={handleSubmit}>
          <div className="flex justify-center border-double py-6 border-b-4">
            <h1 className="font-serif text-3xl font-medium">Create New Post</h1>
          </div>

          <div className="flex flex-col gap-y-4 w-96 mx-auto my-10">
            <div className="flex gap-x-20">
              <label htmlFor="title" className="w-48">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="italic w-96 p-2 border"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-x-20">
              <label className="w-48" htmlFor="content">Content</label>
              <input
                type="text"
                name="content"
                placeholder="Content"
                className="italic w-96 p-2 border"
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="image">Choose Image</label>
              <input type="file" name="image" onChange={handleFileChange} />
            </div>

            <div>
              <label htmlFor="tag">Select Tag</label>
              <input
                type="text"
                name="tag"
                placeholder="Tag"
                value={formData.tag}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <TextEditor/>

          <button
            type="submit"
            className="postBtn rounded-full border-solid border-2 px-4 py-1 mt-4 text-white font-serif text-base"
          >
            Submit Post
          </button>
        </form>
      </div>
    </>
  );
};