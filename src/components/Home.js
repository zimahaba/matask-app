import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        axios.get('http://localhost:8080/tasks', {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdWxvQHRvcnJlcy5jb20iLCJleHAiOjE3MzAxMzUxNjd9.qoh_U3hImuPr1CWHdUfQr0iZG-xznzwOTUUh8t0wQNS8fH8HYYunTD9-5pZfBRmk6whal1HcdLvzUNmjrVXRzw'
            }})
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
  
    return (
      <div className="container mt-4">
        <h2>Task List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-striped table-hover mt-3">
            <thead className="table-dark">
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
                  <tr key={index}>
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
