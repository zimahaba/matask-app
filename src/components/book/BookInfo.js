import React, { useEffect, useState } from 'react';
import cover from '../../assets/lotr.jpg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Rate from '../common/Rate';
import Progress from '../common/Progress';

const BookInfo = () => {
    const [book, setBook] = useState(null)
    const [cover, setCover] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        axios.get('/books/cover/' + id, {responseType: 'blob'})
        .then(async response => {
            setCover(URL.createObjectURL(response.data));
            
        })
        .catch(e => {
            setCover("");
            console.log('Error getting book cover:', e)
        })
        axios.get('/books/' + id)
        .then(response => {
            console.log(response.data)
            setBook(response.data)

        })
        .catch(e => {
            console.log('Error finding book with is ' + id)
        })
    }, [])

    return (
        <>
            {book !== null &&
                <div className="container mt-5" style={{ maxWidth: '800px' }}>
                    <div className="card shadow-lg">
                        <div className="card-header text-center text-white" style={{backgroundColor: '#183758'}}>
                            <h2>Book Details</h2>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column flex-md-row">
                                <div className="text-center me-md-4 mb-3 mb-md-0">
                                    
                                    {book.cover ? (
                                        <img src={cover} alt="Book Cover" style={{ width: '260px', height: '360px', borderRadius: '5px', objectFit: 'cover' }} />
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
                                    <h5>Name:</h5>
                                    <p>{book.name}</p>
                                    <h5>Author:</h5>
                                    <p>{book.author}</p>
                                    <h5>Year:</h5>
                                    <p>{book.year}</p>
                                    <h5>Genre:</h5>
                                    <p>{book.genre}</p>
                                    <h5>Started:</h5>
                                    <p>{book.started}</p>
                                    <h5>Finished:</h5>
                                    <p>{book.ended}</p>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-4 mb-3 me-4">
                                    <h5>Rate:</h5>
                                    <Rate initRate={book.rate} readOnly />
                                </div>
                                <div className="col-md-7 mb-3 ms-1">
                                    <h5>Progress:</h5>
                                    <Progress initProgress={book.progress} readOnly />
                                </div>
                            </div>

                            <h5>Synopsis:</h5>
                            <p>{book.synopsis}</p>
                            <h5>Comments:</h5>
                            <p>{book.comments}</p>

                            <div className="text-center mt-4">
                                <Link className="btn btn-secondary px-5" to="/books">Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default BookInfo;
