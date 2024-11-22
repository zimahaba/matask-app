import React, { useEffect, useState } from 'react';
import './Book.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../common/Pagination';
import { useDebouncedValue } from '../common/debounce';
import { mataskAxios } from '../..';

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
    const navigate = useNavigate()
    
    useEffect(() => {
        findBooks(debouncedSearchTerm, pagination)
    }, [debouncedSearchTerm, pagination])

    const findBooks = (f, p) => {
        mataskAxios.get('/books', {params: {
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
        if (property === 'page') {
            setPagination({ ...pagination, page: value });
        } else if (property === 'size') {
            setPagination({ ...pagination, page: 1, size: value });
        }
    }

    const handleUpdateBook = (id) => {
        navigate("/books/edit/" + id)
    }

    const handleDeleteBook = (id, name) => {
        if(window.confirm('Are you sure you want to delete the book \'' + name + '\'?')) {
            mataskAxios.delete('/books/' + id)
            .then(response => {
                console.log('Book deleted successfully.');
                findBooks(debouncedSearchTerm, pagination);
            })
            .catch(e => console.log('Error deleting book:', e))
        }
    }

    const handleRowClick = (id) => {
        navigate('/books/' + id);
    };

    const handleSort = (field) => {
        const { sortField, sortDirection } = pagination;

        let newSortDirection = 'ASC';
        if (sortField === field) {
            if (sortDirection === 'ASC') {
                newSortDirection = 'DESC';
            } else if (sortDirection === 'DESC') {
                newSortDirection = '';
            }
        }

        setPagination({
            ...pagination,
            page: '1',
            sortField: newSortDirection ? field : '',
            sortDirection: newSortDirection
        });
    };

    const renderSortIcon = (field) => {
        const { sortField, sortDirection } = pagination;
        if (sortField === field) {
            return sortDirection === 'ASC' ? '▲' : sortDirection === 'DESC' ? '▼' : '';
        }
        return '';
    };

    return (
      <div className="container mt-4">
        <h2>Book List</h2>

        <div className="d-flex justify-content-between align-items-end mb-3">
            <div className="d-flex gap-3">
                <div>
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleFilterChange}/>
                </div>
                <div>
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" name="author" onChange={handleFilterChange}/>
                </div>
                <div>
                    <label className="form-label">Progress</label>
                    <select className="form-select" name="progress" onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="0-20">0 - 20%</option>
                        <option value="20-40">20 - 40%</option>
                        <option value="40-60">40 - 60%</option>
                        <option value="60-80">60 - 80%</option>
                        <option value="80-100">80 - 100%</option>
                    </select>
                </div>
            </div>
            <Link className="btn btn-1 mb-3" to="/books/add">New Book</Link>
        </div>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
                <table className="table table-striped table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: '40%', cursor: 'pointer' }} onClick={() => handleSort('name')}>
                                Name {renderSortIcon('name')}
                            </th>
                            <th style={{ width: '35%', cursor: 'pointer' }} onClick={() => handleSort('author')}>
                                Author {renderSortIcon('author')}
                            </th>
                            <th style={{ width: '10%', cursor: 'pointer' }} onClick={() => handleSort('progress')}>
                                Progress {renderSortIcon('progress')}
                            </th>
                            <th style={{ width: '15%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {books.length > 0 ? (
                        books.map((book, index) => (
                        <tr key={index} onClick={() => handleRowClick(book.id)} style={{ cursor: 'pointer' }}>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.progress}</td>
                            <td>
                                <button className="btn btn-2 btn-sm me-2" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateBook(book.id);
                                    }}>
                                    Update
                                </button>
                                <button className="btn btn-danger btn-sm" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteBook(book.id, book.name);
                                    }}>
                                    Delete
                                </button>
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
                {pageResult.totalElements > 0 &&
                    <Pagination pageResult={pageResult} onChange={handlePaginationChange} elementName="books"/>
                }
            </>
        )}
      </div>
    );
}

export default BookList;
