import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogListByUser = ({ blogs }) => {
  const [userBlogs, setUserBlogs] = useState(blogs);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUserBlogs(blogs); // Update state when blogs prop changes
  }, [blogs]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://3.110.92.7:9080/api/blogs/${id}`
      );

      if (response.status === 200) {
        setMessage("Blog deleted successfully!");
        setUserBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      } else {
        setMessage("Failed to delete the blog.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while deleting the blog.");
    }
  };

  return (
    <div className="blogItem-wrap">
      <Container>
        {message && <div className="alert alert-info">{message}</div>}
        <Row>
          {userBlogs.map((blog) => (
            <Col key={blog.id} xs={12} md={4}>
              <div className="card-body">
                <img
                  src={blog.imageUrl}
                  className="card-img-top"
                  alt={blog.title}
                />
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content}</p>
                <p className="card-text">
                  <small className="text-muted">Author: {blog.author}</small>
                </p>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete this Blog
                </button>
                <Link to="/addBlog" className="btn btn-primary me-2">
                  Add Blog
                </Link>
                <Link to="/addEdit" className="btn btn-info me-2">
                  Edit Blog
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BlogListByUser;
