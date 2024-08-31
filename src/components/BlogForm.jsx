import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BlogForm = ({ addBlog, user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(user.username);
  const [imageUrl, setImageUrl] = useState("");
  const [userId] = useState(user.userId);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!title || !content || !author || !imageUrl) {
      setError("All fields are required! Note Image url is valid");
      setSuccess("");
      return;
    }

    const blog = { title, content, author, imageUrl, userId }; // Include the userId
    console.log(blog);
    axios
      .post("http://3.110.92.7:9080/api/blogs/add", blog, {
        headers: {
          Origin: "https://blogger-ui.vercel.app/",
        },
      })
      .then((response) => {
        addBlog(response.data);
        setSuccess("Blog added successfully!");
        setError("");
        // Clear the form
        setTitle("");
        setContent("");
        setAuthor("");
        setImageUrl("");
      })
      .catch((error) => {
        setError("There was an error adding the blog!");
        setSuccess("");
      });
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <Link to="/userBlogs" className="btn btn-primary me-2">
          View Blogs
        </Link>
        <Link to="/userBlogs" className="btn btn-danger me-2">
          Delete Blogs
        </Link>
        <Link to="/editBlogs" className="btn btn-success">
          Edit Blogs
        </Link>
      </div>
      <h2>Add a new blog</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {success && navigate("/blogger")}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Live Image URL</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
