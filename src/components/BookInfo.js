import React from 'react';
import cover from '../assets/lotr.jpg';

const BookInfo = () => {
  return (
    <>
        <div class="d-flex align-items-start mb-4">
            <img src={cover} alt="Book Cover" class="book-cover"/>
            <div class="book-info">
                <h4>Book Name: The Great Book</h4>
                <p>Author: John Doe</p>
                <p>Year: 2023</p>
                <p>Publisher: Book House</p>
                <p>Genre: Fiction</p>
            </div>
        </div>

        <div class="synopsis">
            <h5>Synopsis</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at quam non urna dictum aliquet. Vestibulum vel lacinia nunc. Etiam aliquam ornare nibh, ut congue tortor tempor ut...</p>
        </div>

        <div class="comments">
            <h5>Comments</h5>
            <p>Great book with intriguing storyline and captivating characters. A must-read for all fiction lovers...</p>
        </div>
    </>
  );
}

export default BookInfo;
