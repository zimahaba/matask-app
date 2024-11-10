import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Project from './components/project/Project';
import BookList from './components/book/BookList';
import Movie from './components/movie/Movie';
import BookInfo from './components/book/BookInfo';
import Login from './components/auth/Login';
import { useAuth } from './components/auth/AuthContext';
import Signup from './components/user/Signup';
import Book from './components/book/Book';
import MovieList from './components/movie/MovieList';
import MovieInfo from './components/movie/MovieInfo';
import ProjectList from './components/project/ProjectList';
import ProjectInfo from './components/project/ProjectInfo';

const globalRouter = { navigate: null };
const globalAuth = {setAuthenticated: null}

export {globalRouter, globalAuth}

function App() {
    const { isAuthenticated, setIsAuthenticated, logout } = useAuth();
    const navigate = useNavigate()
    globalAuth.setAuthenticated = setIsAuthenticated;
    globalRouter.navigate = navigate;
    
    const logoutHandler = () => {
        logout()
    }

    return (
        <>
            {isAuthenticated() &&
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
                            <Route path="/projects" element={<ProjectList />} />
                            <Route path="/projects/add" element={<Project />} />
                            <Route path="/projects/edit/:id" element={<Project />} />
                            <Route path="/projects/:id" element={<ProjectInfo />} />
                            <Route path="/books" element={<BookList />} />
                            <Route path="/books/add" element={<Book />} />
                            <Route path="/books/edit/:id" element={<Book />} />
                            <Route path="/books/:id" element={<BookInfo />} />
                            <Route path="/movies" element={<MovieList />} />
                            <Route path="/movies/add" element={<Movie />} />
                            <Route path="/movies/edit/:id" element={<Movie />} />
                            <Route path="/movies/:id" element={<MovieInfo />} />
                        </Routes>
                    </div>
                </div>
            }
            {!isAuthenticated() &&
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            }
        </>
    );
}

export default App;
