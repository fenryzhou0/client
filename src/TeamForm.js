import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function TeamForm() {
  const [team, setTeam] = useState({ team_name: '', club_name: '' });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      fetchTeam();
    }
  }, [id]);

  const fetchTeam = async () => {
    const response = await axios.get(`/team/${id}`);
    setTeam(response.data);
  };

  const handleChange = e => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) {
      await axios.put(`/team/${id}`, team);
    } else {
      await axios.post('/team', team);
    }
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Team Name:
        <input type="text" name="team_name" value={team.team_name} onChange={handleChange} />
      </label>
      <label>
        Club Name:
        <input type="text" name="club_name" value={team.club_name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TeamForm;
