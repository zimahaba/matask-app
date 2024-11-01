import React, { useEffect, useState } from 'react';
import cover from '../../assets/lotr.jpg';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
            {book !== null && cover !== null && 
            <>
                <div className="d-flex align-items-start mb-4">
                    {/* <img src="http://localhost:8080/books/cover" alt="Book Cover" className="book-cover"/> */}
                    {cover != null && <img src={cover} alt="Book Cover" className="book-cover"/>}
                    <div className="book-info">
                        <h4><label>{book.name}</label></h4>
                        <p>Author: {book.author}</p>
                        <p>Year: {book.year}</p>
                        <p>Publisher: {book.publisher}</p>
                        <p>Genre: {book.genre}</p>
                        <p>Started: {book.started}</p>
                        <p>Finished: {book.ended}</p>
                        <p>Rate: {book.rate}</p>
                        <p>Progress: {book.progress}</p>
                    </div>
                </div>

                <div className="synopsis">
                    <h5>Synopsis</h5>
                    <p>{book.synopsis}</p>
                </div>

                <div className="comments">
                    <h5>Comments</h5>
                    <p>{book.comments}</p>
                </div>
            </>
            }
        </>
    );
}

export default BookInfo;
