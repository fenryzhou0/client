import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEditTeam = ({ mode, teamId }) => {
  const [team, setTeam] = useState({
    team_name: '',
    club_name: '',
    coach: '',
    stadium: '',
    city: '',
  });

  useEffect(() => {
    if (mode === 'edit' && teamId) {
      axios.get(`/api/teams/${teamId}`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching team:', error));
    }
  }, [mode, teamId]);

  const handleChange = (event) => {
    setTeam({ ...team, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mode === 'add') {
      axios.post('/api/teams', team)
        .then(response => {
          console.log('Team added:', response.data);
          // Optionally, you can navigate or update the team list
        })
        .catch(error => console.error('Error adding team:', error));
    } else if (mode === 'edit') {
      axios.put(`/api/teams/${teamId}`, team)
        .then(response => {
          console.log('Team updated:', response.data);
          // Optionally, you can navigate or update the team list
        })
        .catch(error => console.error('Error updating team:', error));
    }
  };

  return (
    <div>
      <h2>{mode === 'add' ? 'Add Team' : 'Edit Team'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="team_name">Team Name</label>
          <input
            type="text"
            id="team_name"
            name="team_name"
            value={team.team_name}
            onChange={handleChange}
          />
        </div>
        {/* Add other input fields for club_name, coach, stadium, city */}
        <button type="submit">{mode === 'add' ? 'Add Team' : 'Update Team'}</button>
      </form>
    </div>
  );
};

export default AddEditTeam;