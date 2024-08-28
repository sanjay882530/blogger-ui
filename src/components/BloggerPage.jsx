import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BloggerPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch the user's blogs
      const fetchUserBlogs = async () => {
        try {
          const response = await axios.get(
            `https://3.110.92.7:9080/api/blogs/user/${parsedUser.userId}`
          );
          const blogsList = response.data;
          localStorage.setItem("blogsByUser", JSON.stringify(blogsList));
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };

      fetchUserBlogs();
    } else {
      setUser(null); // Ensure user is null if not found in localStorage
    }
  }, []);

  useEffect(() => {
    console.log("Show user or not:", user);
  }, [user]);

  return (
    <div className="container mt-4">
      {user ? (
        <>
          <div>
            <button className="btn btn-secondary">
              <Link className="nav-link text-white" to="/addBlog">
                Add Blog
              </Link>
            </button>
          </div>
          <div>
            <button className="btn btn-secondary">
              <Link className="nav-link text-white" to="/userBlogs">
                View Blogs
              </Link>
            </button>
          </div>
          <div>
            <button className="btn btn-secondary">
              <Link className="nav-link text-white" to="/userBlogs">
                Delete Blogs
              </Link>
            </button>
            <button className="btn btn-secondary">
              <Link className="nav-link text-white" to="/editBlogs">
                Edit Blogs
              </Link>
            </button>
          </div>
        </>
      ) : (
        <div>
          <strong>Please log in to view your blogs.</strong>
        </div>
      )}
    </div>
  );
};

export default BloggerPage;
