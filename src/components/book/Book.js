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
    ended: '',
    cover: null
  });
  const [coverPreview, setCoverPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, cover: file });
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    axios.post('http://localhost:8080/books', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        alert('Book added successfully');
        navigate('/');
      })
      .catch(error => console.error('There was an error adding the book!', error));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
        <div className="card shadow-lg">
            <div className="card-header text-center bg-primary text-white">
            <h2>Add New Book</h2>
            </div>
            <div className="card-body">
            <div className="d-flex flex-column flex-md-row">
                <div className="text-center me-4 mb-3 mb-md-0">
                <label htmlFor="coverInput" className="d-block">
                    <div
                    style={{
                        width: '260px',
                        height: '360px',
                        border: '2px dashed #ccc',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                    >
                    {coverPreview ? (
                        <img
                        src={coverPreview}
                        alt="Book Cover Preview"
                        style={{ width: '100%', height: '100%', borderRadius: '5px', objectFit: 'cover' }}
                        />
                    ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="#ccc"
                        viewBox="0 0 16 16"
                        style={{ position: 'absolute' }}
                        >
                        <path d="M4.5 1a1 1 0 0 0-1 1v1h-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-1V2a1 1 0 0 0-1-1h-1.5a1 1 0 0 0-.8.4l-1.2 1.6H8.5L7.3 1.4A1 1 0 0 0 6.5 1H4.5zM1 4h14v10H1V4zM4 6h8v2H4V6zm0 3h8v2H4V9z" />
                        </svg>
                    )}
                    </div>
                </label>
                <input
                    type="file"
                    id="coverInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                </div>
                <div className="flex-grow-1">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ minWidth: '300px' }} // Increased width
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
                        style={{ minWidth: '300px' }} // Increased width
                    />
                    </div>
                    <div className="row mb-3">
                    <div className="col-6 col-md-6">
                        <label className="form-label">Year</label>
                        <input
                        type="number"
                        className="form-control"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        min="1000"
                        max="9999"
                        style={{ width: '100%' }} // Full width of column
                        />
                    </div>
                    <div className="col-6 col-md-6">
                        <label className="form-label">Genre</label>
                        <input
                        type="text"
                        className="form-control"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        style={{ minWidth: '100%' }} // Full width of column
                        />
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-6 col-md-6">
                        <label className="form-label">Started</label>
                        <input
                        type="date"
                        className="form-control"
                        name="started"
                        value={formData.started}
                        onChange={handleChange}
                        style={{ width: '100%' }} // Full width of column
                        />
                    </div>
                    <div className="col-6 col-md-6">
                        <label className="form-label">Finished</label>
                        <input
                        type="date"
                        className="form-control"
                        name="ended"
                        value={formData.ended}
                        onChange={handleChange}
                        style={{ width: '100%' }} // Full width of column
                        />
                    </div>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-primary px-5">
                        Add Book
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    </div>

  );
}

export default Book;
