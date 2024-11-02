import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Book.css';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { useDebouncedValue } from '../debounce';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
        author: '',
        progress1: '-1',
        progress2: '-1'
      });
    const [pagination, setPagination] = useState({
        page: '1',
        size: '10',
        sortField: 'id',
        sortDirection: 'DESC'
    })
    const [pageResult, setPageResult] = useState(null)
    const debouncedSearchTerm =  useDebouncedValue(filters, 500);
    
    useEffect(() => {
        findBooks(debouncedSearchTerm, pagination)
    }, [debouncedSearchTerm, pagination])

    const findBooks = (f, p) => {
        axios.get('/books', {params: {
            name: f.name, 
            author: f.author, 
            progress1: f.progress1, 
            progress2: f.progress2,
            page: p.page,
            size: p.size,
            sortField: p.sortField,
            sortDirection: p.sortDirection
        }})
        .then(response => {
            console.log(response.data)
            setBooks(response.data.books);
            setPageResult({size: response.data.size, currentPage: response.data.page, totalPages: response.data.totalPages, totalElements: response.data.totalElements})
            setLoading(false);
        })
        .catch(error => {
            console.error("There was an error fetching the books!", error);
            setLoading(false);
        });
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'progress') {
            const progress = value.split('-');
            setFilters({ ...filters, 'progress1': progress[0], 'progress2': progress[1]});
        } else {
            setFilters({ ...filters, [name]: value });
        }
    };

    const handlePaginationChange = (name, value) => {
        const property = [name][0]
        console.log(property)
        if (property === 'page') {
            setPagination({ ...pagination, page: value });
        } else if (property === 'size') {
            setPagination({ ...pagination, page: 1, size: value });
        }
    }

    return (
      <div className="container mt-4">
        <h2>Book List</h2>

        <div className="d-flex justify-content-between align-items-end mb-3">
            <div className="d-flex gap-3">
                <div>
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={filters.name} onChange={handleFilterChange}/>
                </div>
                <div>
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" name="author" value={filters.author} onChange={handleFilterChange}/>
                </div>
                <div>
                    <label className="form-label">Progress</label>
                    <select className="form-select" name="progress" value={filters.progress} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="0-20">0 - 20%</option>
                        <option value="20-40">20 - 40%</option>
                        <option value="40-60">40 - 60%</option>
                        <option value="60-80">60 - 80%</option>
                        <option value="80-100">80 - 100%</option>
                    </select>
                </div>
            </div>
            <Link className="btn btn-success mb-3" to="/books/add">New Book</Link>
        </div>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
                <table className="table table-striped table-hover mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Progress</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {books.length > 0 ? (
                        books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.progress}</td>
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
                <Pagination pageResult={pageResult} onChange={handlePaginationChange}/>
            </>
        )}
      </div>
    );
}

export default BookList;
