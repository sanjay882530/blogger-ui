import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import BloggerPage from './components/BloggerPage';
import Navbar from './components/Navbar';
import Header from './components/Header';
import ContactUs from './components/ContactUs';
import BlogForm from './components/BlogForm';
import BlogListByUser from './components/BlogListByUser';
import BlogByItem from './components/BlogByItem';

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const [blogs, setBlogs] = useState([]);
    const [blogsByUsers, setBlogsByUsers] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Now this is inside a Router

    useEffect(() => {
        fetchBlogs();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const blogsByUser = JSON.parse(localStorage.getItem('blogsByUser'));
        console.log("User blog details", blogsByUser);
        if (storedUser) {
            setUser(storedUser);
            setBlogsByUsers(blogsByUser);
        }
    }, []);

    const fetchBlogs = () => {
        axios.get('https://3.110.92.7:9080/api/blogs')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the blogs!', error);
            });
    };

    const addBlog = (blog) => {
        setBlogs([...blogs, blog]);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('blogsByUser');
        navigate('/'); // Redirect to the home page after logout
    };

    return (
        <div className="App">
            <Header />
            <Navbar user={user} handleLogout={handleLogout} />
            <main>
                <Routes>
                    <Route path="/" element={<BlogByItem blogs={blogsByUsers}/>} />
                    <Route path="/blogs" element={<BlogList blogs={blogs} />} />
                    <Route path="/signup" element={<SignupForm setUser={setUser} />} />
                    <Route path="/signin" element={<LoginForm setUser={setUser} />} />
                    <Route path="/Contact" element={<ContactUs />} />
                    <Route path="/addBlog" element={<BlogForm addBlog={addBlog} user={user} />} />
                    <Route path="/userBlogs" element={<BlogListByUser blogs={blogsByUsers} />} />
                    {user && user.role === 'BLOGGER' && (
                        <Route path="/blogger" element={<BloggerPage addBlog={addBlog} user={user} />} />
                    )}
                </Routes>
            </main>
        </div>
    );
}

export default App;
