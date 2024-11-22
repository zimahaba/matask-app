import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Progress from '../common/Progress';
import { mataskAxios } from '../..';

function Project() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        started: '',
        ended: '',
        progress: 0,
    });
    const navigate = useNavigate();
    const {id} = useParams()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const method = id === undefined ? 'post' : 'put';
        const url = id === undefined ? '/projects' : '/projects/' + id;

        mataskAxios({
            method: method,
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            alert('Project saved successfully');
            navigate('/projects');
        })
        .catch(error => console.error('There was an error saving the project!', error));
    };

    const handleProgressUpdate = (value) => {
        setFormData({ ...formData, progress: value });
    }

    useEffect(() => {
        if (id !== undefined) {
            mataskAxios.get('/projects/' + id)
            .then((response) => {
                console.log(response.data)
                setFormData({
                    name: response.data.name,
                    description: response.data.description,
                    started: response.data.started,
                    ended: response.data.ended,
                    progress: response.data.progress
                })
            })
            .catch(e => {console.error('Project with id ' + id + 'not found.')})
        }
    }, [])

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
            <div className="card shadow-lg">
                <div className="card-header text-center bg-1 text-white">
                    {id === undefined 
                        ? (<h2>New Project</h2>) 
                        : (<h2>Edit Project</h2>)

                    }
                </div>
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row">
                        <div className="flex-grow-1">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3"/>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label">Started</label>
                                    <input type="date" className="form-control" name="started" value={formData.started} onChange={handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Finished</label>
                                    <input type="date" className="form-control" name="ended" value={formData.ended} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-7 mb-3 ms-1">
                            <Progress initProgress={formData.progress} onUpdate={handleProgressUpdate}/>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link className="btn btn-2 px-5 me-2" to="/projects">Cancel</Link>
                        <button type="submit" className="btn btn-1 px-5">Save</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}

export default Project;
