import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Project from './components/project/Project';
import BookList from './components/book/BookList';
import Movie from './components/movie/Movie';
import BookInfo from './components/book/BookInfo';
import Login from './components/Login';
import { useAuth } from './components/AuthContext';
import Signup from './components/Signup';
import Book from './components/book/Book';
import MovieList from './components/movie/MovieList';

function App() {
    const { isAuthenticated, logout } = useAuth();
    
    const logoutHandler = () => {
        logout()
    }

    return (
        <>
            {isAuthenticated &&
                <div>
                    <nav className="navbar navbar-expand-lg">
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
                            <Route path="/books" element={<BookList />} />
                            <Route path="/books/add" element={<Book />} />
                            <Route path="/books/edit/:id" element={<Book />} />
                            <Route path="/books/:id" element={<BookInfo />} />
                            <Route path="/movies" element={<MovieList />} />
                        </Routes>
                    </div>
                </div>
            }
            {!isAuthenticated &&
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            }
        </>
    );
}

export default App;
