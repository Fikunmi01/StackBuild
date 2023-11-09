import React, { useEffect, useRef } from "react";
import "../css/textEditor.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = ({ comment, setComment, handleComment }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill("#editor-container", {
        modules: {
          toolbar: [
            ["bold", "italic"],
            ["link", "blockquote", "code-block", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
        placeholder: "Compose an epic...",
        theme: "snow",
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = quillRef.current.getText();
    setComment(text);
    handleComment(text);
    quillRef.current.setText(""); // Clear the Quill editor's content
  };

  return (
    <div className="px-80 flex flex-col">
      <div id="editor-container" className="relative border-2 "></div>
      <button
        onClick={handleSubmit}
        className="w-24 mt-6 px-4 py-2 font-serif border-2 border-[#ccc] rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default TextEditor;
