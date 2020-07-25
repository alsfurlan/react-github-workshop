import React, { useState } from 'react';
import { FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {

    const keyStorage = 'profiles';
    const [newProfile, setNewProfile] = useState('');
    const [inputError, setInputError] = useState('');
    const [profiles, setProfiles] = useState(() => {
        const storageProfiles = localStorage.getItem(keyStorage);
        if (storageProfiles) {
            return JSON.parse(storageProfiles)
        } else {
            return [];
        }
    });

    async function addProfile(event) {
        event.preventDefault();

        if (!newProfile) {
            setInputError('Digite um perfil do Github');
            return
        }

        try {
            const response = await api.get(`/users/${newProfile}`);
            const profile = response.data;
            const updatedProfiles = [...profiles, profile];

            localStorage.setItem(keyStorage, JSON.stringify(updatedProfiles));

            setProfiles(updatedProfiles);
            setNewProfile('');
            setInputError('');
        } catch (error) {
            setInputError('Ocorreu um erro ao buscar o perfil');
        }
    }

    function onChange(e) {
        setNewProfile(e.target.value);
    }

    return (
        <>
            <form onSubmit={addProfile} >
                <input onChange={onChange}
                    value={newProfile}
                    type="text"
                    placeholder="Digite um perfil válido no github" />
                <button type="submit" > Pesquisar </button>
            </form>

            {inputError && <p id="error-message"> {inputError}</p>}

            <div className="content">
                {
                    profiles.map(profile => (
                        <Link key={profile.login}
                            to={`/repositories/${profile.login}`}>
                            <img src={profile.avatar_url}
                                alt="Facebook" />
                            <div>
                                <strong> {profile.name} </strong>
                                <p> {profile.bio} </p>
                            </div>
                            <FiChevronRight size={24} />
                        </Link>
                    )
                    )
                }
            </div>
        </>
    );
};