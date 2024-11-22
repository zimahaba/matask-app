import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rate from '../common/Rate';
import { mataskAxios } from '../..';

function Movie() {
    const [formData, setFormData] = useState({
        name: '',
        director: '',
        year: '',
        genre: '',
        started: '',
        ended: '',
        comments: '',
        synopsis: '',
        actors: [],
        rate: 0,
        poster: null
    });
    const [poster, setPoster] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams()
    const [watched, setWatched] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'watched') {
            setWatched(e.target.checked)
            let started = '';
            let ended = formData.ended;
            if (e.target.checked) {
                started = new Date().toISOString().split('T')[0];
            } else {
                ended = '';
            }
            setFormData({ ...formData, started: started, ended: ended});
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, poster: file });
            setPoster(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        
        const method = id === undefined ? 'post' : 'put';
        const url = id === undefined ? '/movies' : '/movies/' + id;

        formDataToSend.forEach((v, k) => console.log(k, ':', v))

        mataskAxios({
            method: method,
            url: url,
            data: formDataToSend,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Movies saved successfully');
            navigate('/movies');
        })
        .catch(error => console.error('There was an error saving the movie!', error));
    };

    const handleRateUpdate = (value) => {
        setFormData({ ...formData, rate: value });
    }

    useEffect(() => {
        if (id !== undefined) {
            mataskAxios.get('/movies/poster/' + id, {responseType: 'blob'})
            .then(async response => {
                setPoster(URL.createObjectURL(response.data));
                
            })
            .catch(e => {
                setPoster("");
                console.log('Error getting movie poster:', e)
            })
            mataskAxios.get('/movies/' + id)
            .then((response) => {
                setFormData({
                    name: response.data.name,
                    director: response.data.director,
                    year: response.data.year,
                    genre: response.data.genre,
                    started: response.data.started,
                    ended: response.data.ended,
                    comments: response.data.comments,
                    synopsis: response.data.synopsis,
                    rate: response.data.rate,
                    actors: response.data.actors,
                    poster: null
                });
                setWatched(response.data.started !== '')
            })
            .catch(e => {console.error('Movie with id ' + id + 'not found.')})
        }
    }, [])

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
            <div className="card shadow-lg">
                <div className="card-header text-center bg-1 text-white">
                    {id === undefined 
                        ? (<h2>New Movie</h2>) 
                        : (<h2>Edit Movie</h2>)

                    }
                </div>
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row">
                        <div className="text-center me-md-4 mb-3 mb-md-0">
                            <label htmlFor="posterInput" className="d-block">
                                <div style={{width: '260px', height: '360px', border: '2px dashed #ccc', borderRadius: '5px', display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', cursor: 'pointer'}}>
                                    <img id="posterPreview" src={poster} alt="Movie Poster" 
                                        style={{width: '100%', height: '100%', borderRadius: '5px', objectFit: 'poster', display: poster ? 'block' : 'none'}}/>
                                    {!poster && (
                                        <svg id="cameraIcon" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#ccc" viewBox="0 0 16 16">
                                            <path d="M10.5 2a.5.5 0 0 1 .5.5v1H12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2h1V2.5a.5.5 0 0 1 .5-.5h5zm-1 1H6v1h3.5a.5.5 0 0 0 .5-.5v-.5zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm1 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm3 4.5a.5.5 0 0 1 .5.5v.5H6v-.5a.5.5 0 0 1 .5-.5h2z" />
                                        </svg>
                                    )}
                                </div>
                            </label>
                            <input type="file" id="posterInput" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }}/>
                        </div>

                        <div className="flex-grow-1">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Director</label>
                                <input type="text" className="form-control" name="director" value={formData.director} onChange={handleChange}/>
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
                                <label className="form-label">Rate</label>
                                <Rate initRate={formData.rate} onUpdate={handleRateUpdate}/>
                            </div>
                            <div className="row mb-3 pt-3 align-items-center">
                                <div className="col-3">
                                    <input type="checkbox" className="form-check-input" id="watchedCheckbox" name="watched" checked={watched}
                                        onChange={handleChange}/>
                                    <label className="form-check-label ms-2" htmlFor="watchedCheckbox">Watched</label>
                                </div>
                                <div className="col-9">
                                    {watched &&
                                        <input type="date" className="form-control w-50" name="ended" value={formData.ended} onChange={handleChange}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Actors / Actresses</label>
                        <textarea className="form-control" name="actors" value={formData.actors} onChange={handleChange} rows="3"/>
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
                        <Link className="btn btn-2 px-5 me-2" to="/movies">Cancel</Link>
                        <button type="submit" className="btn btn-1 px-5">Save</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}

export default Movie;
