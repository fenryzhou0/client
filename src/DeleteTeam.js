import React from 'react';
import axios from 'axios';

const DeleteTeam = ({ teamId, onDelete }) => {
  const handleDelete = () => {
    axios.delete(`/api/teams/${teamId}`)
      .then(() => {
        console.log('Team deleted successfully');
        onDelete(teamId);
      })
      .catch(error => console.error('Error deleting team:', error));
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteTeam;