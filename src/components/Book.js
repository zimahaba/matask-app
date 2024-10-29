import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Book.css';

const Book = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch book list from backend server
      axios.get('https://api.example.com/books') // Replace with your actual backend URL
        .then(response => {
          setBooks(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the books!", error);
          setLoading(false);
        });
    }, []);
  
    return (
      <div className="container mt-4">
        <h2>Book List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-striped table-hover mt-3">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Started</th>
                <th>Finished</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book, index) => (
                  <tr key={index}>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                    <td>{book.genre}</td>
                    <td>{book.started}</td>
                    <td>{book.finished}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2">Update</button>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    );
}

export default Book;
