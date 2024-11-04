import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
  
    useEffect(() => {
        axios.get('/tasks')
            .then(response => {
                console.log(response.data.Tasks)
                setTasks(response.data.Tasks);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the tasks!", error);
                setLoading(false);
            });
    }, []);

    const handleRowClick = (task) => {
        if (task.type === 'book') {
            navigate(`/books/${task.childId}`);
        }
    };
  
    return (
      <div className="container mt-4">
        <h2>Task List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                    <td>{task.type}</td>
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
        )}
      </div>
    );
}

export default Home;
