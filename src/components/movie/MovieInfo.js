import React, { useEffect, useState } from 'react';
import cover from '../../assets/lotr.jpg';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Rate from '../common/Rate';
import Progress from '../common/Progress';

const MovieInfo = () => {
    const [movie, setMovie] = useState(null)
    const [poster, setPoster] = useState(null);
    const [watched, setWatched] = useState(false);
    const {id} = useParams()
    const location = useLocation();
    const back = new URLSearchParams(location.search).get('back');

    useEffect(() => {
        axios.get('/movies/poster/' + id, {responseType: 'blob'})
        .then(async response => {
            console.log('got picture')
            setPoster(URL.createObjectURL(response.data));
            
        })
        .catch(e => {
            setPoster("");
            console.log('Error getting movie poster:', e)
        })
        axios.get('/movies/' + id)
        .then(response => {
            console.log(response.data)
            setMovie(response.data)
            setWatched(response.data.started !== '')
        })
        .catch(e => {
            console.log('Error finding movie with is ' + id)
        })
    }, [])

    return (
        <>
            {movie !== null &&
                <div className="container mt-5" style={{ maxWidth: '800px' }}>
                    <div className="card shadow-lg">
                        <div className="card-header text-center bg-1 text-white">
                            <h2>Movie Details</h2>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column flex-md-row">
                                <div className="text-center me-md-4 mb-3 mb-md-0">
                                    {poster ? (
                                        <img src={poster} alt="Movie Poster" style={{ width: '260px', height: '360px', borderRadius: '5px', objectFit: 'poster' }} />
                                    ) : (
                                        <div style={{
                                            width: '260px', height: '360px', border: '2px dashed #ccc', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#ccc" viewBox="0 0 16 16">
                                                <path d="M10.5 2a.5.5 0 0 1 .5.5v1H12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2h1V2.5a.5.5 0 0 1 .5-.5h5zm-1 1H6v1h3.5a.5.5 0 0 0 .5-.5v-.5zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm1 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm3 4.5a.5.5 0 0 1 .5.5v.5H6v-.5a.5.5 0 0 1 .5-.5h2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-grow-1">
                                    <div className="mb-4">
                                        <h5>Name:</h5>
                                        <p>{movie.name}</p>
                                    </div>
                                
                                    <div className="mb-4">
                                        <h5>Director:</h5>
                                        <p>{movie.director}</p>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <h5>Year:</h5>
                                            <p>{movie.year}</p>
                                        </div>
                                        <div className="col-6">
                                            <h5>Genre:</h5>
                                            <p>{movie.genre}</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h5>Rate:</h5>
                                        <Rate initRate={movie.rate} readOnly />
                                    </div>
                                    <div className="row mb-3 pt-3 align-items-center">
                                        <div className="col-3">
                                            <input type="checkbox" className="form-check-input" id="watchedCheckbox" name="watched" checked={watched} disabled/>
                                            <label className="form-check-label ms-2" htmlFor="watchedCheckbox">Watched</label>
                                        </div>
                                        <div className="col-9">
                                            {watched &&  <p style={{margin: '0'}}>{movie.ended}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <h5>Actors / Actresses:</h5>
                            <p>{movie.actors}</p>
                            <h5>Synopsis:</h5>
                            <p>{movie.synopsis}</p>
                            <h5>Comments:</h5>
                            <p>{movie.comments}</p>

                            <div className="text-center mt-4">
                                <Link className="btn btn-secondary px-5" to={back === 'home' ? '/' : '/movies'}>Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default MovieInfo;
