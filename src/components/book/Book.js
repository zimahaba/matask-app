// AddBook.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Book() {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    year: '',
    genre: '',
    started: '',
    finished: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://api.example.com/books', formData)
      .then(() => {
        alert('Book added successfully');
        navigate('/');
      })
      .catch(error => console.error('There was an error adding the book!', error));
  };

  return (
    <div className="container mt-4">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="text"
            className="form-control"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Started</label>
          <input
            type="text"
            className="form-control"
            name="started"
            value={formData.started}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Finished</label>
          <input
            type="text"
            className="form-control"
            name="finished"
            value={formData.finished}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
}

export default Book;
