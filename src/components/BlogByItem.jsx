import BlogListByUser from "./BlogListByUser";
import BlogList from "./BlogList";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogByItem = () => {
  const [user, setUser] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [allBlogsByUser, setAllBlogsByUser] = useState([]);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    // Load user-specific blogs from localStorage
    const blogsByUser = JSON.parse(localStorage.getItem("blogsByUser"));
    if (blogsByUser) {
      setAllBlogsByUser(blogsByUser);
    }

    // Fetch all blogs from the API
    const fetchBlogs = () => {
      axios
        .get("http://3.110.92.7:9080/api/blogs", {
          headers: {
            Origin: "https://blogger-ui.vercel.app/",
          },
        })
        .then((response) => {
          setAllBlogs(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the blogs!", error);
        });
    };

    fetchBlogs();
  }, []); // The empty array ensures this effect runs only once on component mount

  // Optional: Monitor state changes in allBlogsByUser
  useEffect(() => {
    console.log("User blog details updated:", allBlogsByUser);
  }, [allBlogsByUser]);

  console.log("BlogItem component all blogs:", allBlogs);

  return (
    <>
      {user ? (
        <BlogListByUser blogs={allBlogsByUser} />
      ) : (
        <BlogList blogs={allBlogs} />
      )}
    </>
  );
};

export default BlogByItem;
