import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Project from './components/Project';
import Book from './components/Book';
import Movie from './components/Movie';
import BookInfo from './components/BookInfo';
import Login from './components/Login';
import { useAuth } from './components/AuthContext';

function App() {
    const { isAuthenticated, logout } = useAuth();
    
    const logoutHandler = () => {
        logout()
    }

    return (
        <>
            {isAuthenticated &&
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container-fluid">
                            <div className="navbar-nav mx-auto">
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="/projects">Project</Link>
                                <Link className="nav-link" to="/books">Book</Link>
                                <Link className="nav-link" to="/movies">Movie</Link>
                            </div>
                            <a className="btn sign-in-btn" href="#" onClick={logoutHandler}>Log Out</a>
                        </div>
                    </nav>

                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/projects" element={<Project />} />
                            <Route path="/books" element={<Book />} />
                            <Route path="/books/:bookId" element={<BookInfo />} />
                            <Route path="/movies" element={<Movie />} />
                        </Routes>
                    </div>
                </div>
            }
            {!isAuthenticated &&
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            }
        </>
    );
}

export default App;
