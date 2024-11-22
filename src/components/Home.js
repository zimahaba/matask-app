import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedValue } from './common/debounce';
import Pagination from './common/Pagination';
import { capitalize } from './common/utils';
import { mataskAxios } from '..';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
      });
    const [pagination, setPagination] = useState({
        page: '1',
        size: '20',
        sortField: 'id',
        sortDirection: 'DESC'
    })
    const [pageResult, setPageResult] = useState(null)
    const debouncedSearchTerm =  useDebouncedValue(filters, 500);
    const navigate = useNavigate()
  
    useEffect(() => {
        findTasks(debouncedSearchTerm, pagination)
    }, [debouncedSearchTerm, pagination])

    const findTasks = (f, p) => {
        mataskAxios.get('/tasks', {params: {
            name: f.name, 
            page: p.page,
            size: p.size,
            sortField: p.sortField,
            sortDirection: p.sortDirection
        }})
        .then(response => {
            setTasks(response.data.tasks);
            setPageResult({size: response.data.size, currentPage: response.data.page, totalPages: response.data.totalPages, totalElements: response.data.totalElements})
            setLoading(false);
        })
        .catch(error => {
            console.error("There was an error fetching the tasks!", error);
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

    const handleRowClick = (task) => {
        if (task.type === 'book') {
            navigate(`/books/${task.childId}?back=home`);
        } else if (task.type === 'movie') {
            navigate(`/movies/${task.childId}?back=home`);
        } else if (task.type === 'project') {
            navigate(`/projects/${task.childId}?back=home`);
        }
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
        <h2>Task List</h2>
        <div className="d-flex justify-content-between align-items-end mb-3">
            <div className="d-flex gap-3">
                <div>
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleFilterChange}/>
                </div>
            </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (<>
                <table className="table table-striped table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Started</th>
                            <th>Finished</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                            <tr key={index} onClick={() => handleRowClick(task)} style={{ cursor: 'pointer' }}>
                                <td>{task.name}</td>
                                <td>{capitalize(task.type)}</td>
                                <td>{task.started}</td>
                                <td>{task.ended}</td>
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
                {pageResult.totalElements > 0 &&
                    <Pagination pageResult={pageResult} onChange={handlePaginationChange} elementName="tasks"/>
                }
            </>
        )}
      </div>
    );
}

export default Home;
