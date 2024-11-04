// AddBook.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rate from '../common/Rate';
import Progress from '../common/Progress';

function Book() {
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        year: '',
        genre: '',
        started: '',
        ended: '',
        comments: '',
        synopsis: '',
        rate: 0,
        progress: 0,
        cover: null
    });
    const [cover, setCover] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, cover: file });
            setCover(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        
        const method = id === undefined ? 'post' : 'put';
        const url = id === undefined ? '/books' : '/books/' + id;
        console.log('url:', url)

        axios({
            method: method,
            url: url,
            data: formDataToSend,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Book saved successfully');
            navigate('/books');
        })
        .catch(error => console.error('There was an error saving the book!', error));
    };

    const handleRateUpdate = (value) => {
        setFormData({ ...formData, rate: value });
    }

    const handleProgressUpdate = (value) => {
        setFormData({ ...formData, progress: value });
    }

    useEffect(() => {
        if (id !== undefined) {
            axios.get('/books/cover/' + id, {responseType: 'blob'})
            .then(async response => {
                setCover(URL.createObjectURL(response.data));
                
            })
            .catch(e => {
                setCover("");
                console.log('Error getting book cover:', e)
            })
            axios.get('/books/' + id)
            .then((response) => {
                console.log(response.data)
                setFormData({
                    name: response.data.name,
                    author: response.data.author,
                    year: response.data.year,
                    genre: response.data.genre,
                    started: response.data.started,
                    ended: response.data.ended,
                    comments: response.data.comments,
                    synopsis: response.data.synopsis,
                    rate: response.data.rate,
                    progress: response.data.progress,
                    cover: null
                })
            })
            .catch(e => {console.error('Book with id ' + id + 'not found.')})
        }
    }, [])

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
            <div className="card shadow-lg">
                <div className="card-header text-center bg-1 text-white">
                    {id === undefined 
                        ? (<h2>New Book</h2>) 
                        : (<h2>Edit Book</h2>)

                    }
                </div>
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row">
                        <div className="text-center me-md-4 mb-3 mb-md-0">
                            <label htmlFor="coverInput" className="d-block">
                                <div style={{width: '260px', height: '360px', border: '2px dashed #ccc', borderRadius: '5px', display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', cursor: 'pointer'}}>
                                    <img id="coverPreview" src={cover} alt="Book Cover" 
                                        style={{width: '100%', height: '100%', borderRadius: '5px', objectFit: 'cover', display: cover ? 'block' : 'none'}}/>
                                    {!cover && (
                                        <svg id="cameraIcon" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#ccc" viewBox="0 0 16 16">
                                            <path d="M10.5 2a.5.5 0 0 1 .5.5v1H12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2h1V2.5a.5.5 0 0 1 .5-.5h5zm-1 1H6v1h3.5a.5.5 0 0 0 .5-.5v-.5zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm1 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm3 4.5a.5.5 0 0 1 .5.5v.5H6v-.5a.5.5 0 0 1 .5-.5h2z" />
                                        </svg>
                                    )}
                                </div>
                            </label>
                            <input type="file" id="coverInput" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }}/>
                        </div>

                        <div className="flex-grow-1">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Author</label>
                                <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} required/>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label">Year</label>
                                    <input type="number" className="form-control" name="year" value={formData.year} onChange={handleChange} min="1000" max="9999"/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Genre</label>
                                    <input type="text" className="form-control" name="genre" value={formData.genre} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label">Started</label>
                                    <input type="date" className="form-control" name="started" value={formData.started} onChange={handleChange}/>
                                </div>
                                <div className="col-6">
                                <label className="form-label">Finished</label>
                                <input type="date" className="form-control" name="ended" value={formData.ended} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-4 mb-3 me-4">
                            <label className="form-label">Rate</label>
                            <Rate initRate={formData.rate} onUpdate={handleRateUpdate}/>
                        </div>
                        <div className="col-md-7 mb-3 ms-1">
                            <Progress initProgress={formData.progress} onUpdate={handleProgressUpdate}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Synopsis</label>
                        <textarea className="form-control" name="synopsis" value={formData.synopsis} onChange={handleChange} rows="3"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Comments</label>
                        <textarea className="form-control" name="comments" value={formData.comments} onChange={handleChange} rows="3"/>
                    </div>

                    <div className="text-center">
                        <Link className="btn btn-2 px-5 me-2" to="/books">Cancel</Link>
                        <button type="submit" className="btn btn-1 px-5">Save</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}

export default Book;
