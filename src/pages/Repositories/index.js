import React, { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import './styles.css';
import { FiEye, FiStar } from "react-icons/fi";
import { GoRepoForked } from "react-icons/go";
import api from '../../services/api';

export default function Repositories() {
    const { params } = useRouteMatch();
    const { profile } = params;
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api
            .get(`/users/${params.profile}/repos`)
            .then(r => setRepositories(r.data));
    }, []);

    return (
        <>
            <h1>{profile} Repositories</h1>
            <div className="content">
                {
                    repositories.map(repository => (
                        <a key={repository.id} href={repository.html_url} target="_blank">
                            <div>
                                <strong>{repository.name}</strong>
                                <p>{repository.description}</p>
                                <div className="detail">
                                    <div className="detail-item">
                                        <FiEye />
                                        <span>{repository.watchers_count}</span>
                                    </div>
                                    <div className="detail-item">
                                        <FiStar />
                                        <span>{repository.stargazers_count}</span>
                                    </div>
                                    <div className="detail-item">
                                        <GoRepoForked />
                                        <span>{repository.forks_count}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))
                }
            </div>
        </>
    );
};