import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const BlogList = ({ blogs }) => {
  // Ensure blogs is an array, or use an empty array as a fallback
  const blogArray = Array.isArray(blogs) ? blogs : [];

  return (
    <div className="blogItem-wrap">
      <Container>
        <Row>
          {blogArray.length > 0 ? (
            blogArray.map((blog) => (
              <Col key={blog.id} xs={12} md={4}>
                <div className="card">
                  <img
                    src={blog.imageUrl}
                    className="card-img-top"
                    alt={blog.title || "Blog Image"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.content}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Author: {blog.author}
                      </small>
                    </p>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p>No blogs available</p> // Display this message if blogs array is empty
          )}
        </Row>
      </Container>
    </div>
  );
};

export default BlogList;
