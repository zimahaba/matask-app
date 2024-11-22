import React, { useEffect, useState } from 'react';
import './Movie.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../common/Pagination';
import { useDebouncedValue } from '../common/debounce';
import { mataskAxios } from '../..';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
        director: '',
        year: '',
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
        findMovies(debouncedSearchTerm, pagination)
    }, [debouncedSearchTerm, pagination])

    const findMovies = (f, p) => {
        console.log('pagination:', p)
        mataskAxios.get('/movies', {params: {
            name: f.name, 
            director: f.director, 
            year: f.year,
            page: p.page,
            size: p.size,
            sortField: p.sortField,
            sortDirection: p.sortDirection
        }})
        .then(response => {
            setMovies(response.data.movies);
            setPageResult({size: response.data.size, currentPage: response.data.page, totalPages: response.data.totalPages, totalElements: response.data.totalElements})
            setLoading(false);
        })
        .catch(error => {
            console.error("There was an error fetching the movies!", error);
            setLoading(false);
        });
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handlePaginationChange = (name, value) => {
        const property = [name][0]
        if (property === 'page') {
            setPagination({ ...pagination, page: value });
        } else if (property === 'size') {
            setPagination({ ...pagination, page: 1, size: value });
        }
    }

    const handleUpdateMovie = (id) => {
        navigate("/movies/edit/" + id)
    }

    const handleDeleteMovie = (id, name) => {
        if(window.confirm('Are you sure you want to delete the movie \'' + name + '\'?')) {
            mataskAxios.delete('/movies/' + id)
            .then(response => {
                console.log('Movie deleted successfully.');
                findMovies(debouncedSearchTerm, pagination);
            })
            .catch(e => console.log('Error deleting movie:', e))
        }
    }

    const handleRowClick = (id) => {
        navigate('/movies/' + id);
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
        <h2>Movie List</h2>

        <div className="d-flex justify-content-between align-items-end mb-3">
            <div className="d-flex gap-3">
                <div>
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleFilterChange}/>
                </div>
                <div>
                    <label className="form-label">Director</label>
                    <input type="text" className="form-control" name="director" onChange={handleFilterChange}/>
                </div>
                <div>
                    <label className="form-label">Year</label>
                    <input type="text" className="form-control" name="year" onChange={handleFilterChange}/>
                </div>
            </div>
            <Link className="btn btn-1 mb-3" to="/movies/add">New Movie</Link>
        </div>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
                <table className="table table-striped table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: '30%', cursor: 'pointer' }} onClick={() => handleSort('name')}>
                                Name {renderSortIcon('name')}
                            </th>
                            <th style={{ width: '15%', cursor: 'pointer' }} onClick={() => handleSort('director')}>
                                Director {renderSortIcon('director')}
                            </th>
                            <th style={{ width: '35%', cursor: 'pointer' }}>
                                Actors 
                            </th>
                            <th style={{ width: '5%', cursor: 'pointer' }} onClick={() => handleSort('year')}>
                                Year {renderSortIcon('year')}
                            </th>
                            <th style={{ width: '15%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {movies.length > 0 ? (
                        movies.map((movie, index) => (
                        <tr key={index} onClick={() => handleRowClick(movie.id)} style={{ cursor: 'pointer' }}>
                            <td>{movie.name}</td>
                            <td>{movie.director}</td>
                            <td></td>
                            <td>{movie.year}</td>
                            <td>
                                <button className="btn btn-2 btn-sm me-2" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateMovie(movie.id);
                                    }}>
                                    Update
                                </button>
                                <button className="btn btn-danger btn-sm" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteMovie(movie.id, movie.name);
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
                    <Pagination pageResult={pageResult} onChange={handlePaginationChange} elementName="movies"/>
                }
            </>
        )}
      </div>
    );
}

export default MovieList;
