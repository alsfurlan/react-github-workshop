import React from 'react';
import { FiChevronRight } from "react-icons/fi";
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {

    const [newProfile, setNewProfile] = React.useState('');
    const [profiles, setProfiles] = React.useState([]);

    async function addProfile(event) {
        event.preventDefault();

        const response = await api.get(`/users/${newProfile}`);
        const profile = response.data;
        setProfiles([...profiles, profile]);
        setNewProfile('');
    }

    function onChange(e) {
        setNewProfile(e.target.value);
    }

    return (
        <>
            <form onSubmit={addProfile}>
                <input onChange={onChange} value={newProfile} type="text" placeholder="Digite um perfil válido no github" />
                <button type="submit">Pesquisar</button>
            </form>
            <div className="content">
                {
                    profiles.map(profile => (
                        <a key={profile.login} href="#">
                            <img src={profile.avatar_url} alt="Facebook" />
                            <div>
                                <strong>{profile.name}</strong>
                                <p>{profile.bio}</p>
                            </div>
                            <FiChevronRight size={24} />
                        </a>
                    ))
                }
            </div>
        </>
    );
};