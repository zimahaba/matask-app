import React, { useEffect, useState } from 'react';
import cover from '../../assets/lotr.jpg';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Rate from '../common/Rate';
import Progress from '../common/Progress';

const ProjectInfo = () => {
    const [project, setProject] = useState(null)
    const {id} = useParams()
    const location = useLocation();
    const back = new URLSearchParams(location.search).get('back');

    useEffect(() => {
        axios.get('/projects/' + id)
        .then(response => {
            console.log(response.data)
            setProject(response.data)

        })
        .catch(e => {
            console.log('Error finding project with is ' + id)
        })
    }, [])

    return (
        <>
            {project !== null &&
                <div className="container mt-5" style={{ maxWidth: '800px' }}>
                    <div className="card shadow-lg">
                        <div className="card-header text-center bg-1 text-white">
                            <h2>Projects Details</h2>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column flex-md-row">
                                <div className="flex-grow-1">
                                    <div className="mb-4">
                                        <h5>Name:</h5>
                                        <p>{project.name}</p>
                                    </div>
                                
                                    <div className="mb-4">
                                        <h5>Description:</h5>
                                        <p>{project.description}</p>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <h5>Started:</h5>
                                            <p>{project.started}</p>
                                        </div>
                                        <div className="col-6">
                                            <h5>Finished:</h5>
                                            <p>{project.ended}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="row mt-3">
                                <div className="col-md-7 mb-3 ms-1">
                                    <h5>Progress: {project.progress}%</h5>
                                    <Progress initProgress={project.progress} readOnly />
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                <Link className="btn btn-secondary px-5" to={back === 'home' ? '/' : '/projects'}>Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ProjectInfo;
