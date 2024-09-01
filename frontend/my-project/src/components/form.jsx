import React, { useState } from "react";
import "./DemoPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/post/postSlice";

export const DemoPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imgSrc: null,
    tag: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  console.log(user.user.data.user.firstName, "tesstt to see user"); // Log the user object to check its content

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // const postData = new FormData();
//     // postData.append("title", formData.title);
//     // postData.append("content", formData.content);
//     // postData.append("tag", formData.tag);
//     // postData.append(
//     //   "author",
//     //   `${user.user.data.user.firstName} ${user.user.data.user.lastName}`
//     // );
//     const postData = {
//         title: formData.title,
//         content: formData.content,
//         tag: formData.tag,
//         author: `${user.user.data.user.firstName} `
//       };

//     console.log(postData, "jcnjdnjbb");
//     for (let [key, value] of postData.entries()) {
//       console.log(`${key}: ${value}`);
//     }
//     dispatch(addPost(postData));
//     console.log(postData, "post formfhfsb d");
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postData = {
      title: formData.title,
      content: formData.content,
      tag: formData.tag,
      author: `${user.user.data.user.firstName} ${user.user.data.user.lastName}`
    };
  
    console.log(postData, "jcnjdnjbb");
  
    // Use Object.entries to iterate over the key-value pairs of the plain object
    for (let [key, value] of Object.entries(postData)) {
      console.log(`${key}: ${value}`);
    }
  
    try {
      await dispatch(addPost(postData)).unwrap();
      console.log("Post submitted successfully");
    } catch (error) {
      console.error("Failed to submit post:", error);
    }
  };

  return (
    <div className="demo-page">
      <section>
        <div className="href-target" id="structure"></div>
        <h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-layers"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          Create a New Post
        </h1>
        <p>
          Use the form below to create and share a new post. Ensure your content
          is clear and concise, and remember to include all necessary details to
          make your post engaging and informative.
        </p>

        <form action="" onSubmit={handleSubmit}>
          <div className="nice-form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.title}
                name="title"
              placeholder="Enter your post title"
            />
          </div>

          <div className="nice-form-group">
            <label htmlFor="content">Content</label>
            <small>Write the main content of your post here.</small>
            <textarea
              value={formData.content}
              onChange={handleInputChange}
              name="content"
              placeholder="Enter your post content"
            ></textarea>
          </div>

          {/* <div className="nice-form-group">
            <label>Image</label>
            <small>Select an image to accompany your post.</small>
            <input type="file" name="image" onChange={handleFileChange} />
          </div> */}

          <div className="nice-form-group">
            <label htmlFor="tag">Tag</label>
            <input
              value={formData.tag}
              onChange={handleInputChange}
              name="tag"
              type="text"
              placeholder="Enter relevant tags"
            />
            <small>Add relevant tags to categorize your post.</small>
          </div>

          <details>
            <summary>
              <button className="toggle-code">Submit Post</button>
            </summary>
          </details>
        </form>
      </section>
    </div>
  );
};
