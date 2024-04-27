import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeamList from './TeamList';
import TeamForm from './TeamForm';

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const response = await axios.get('/team');
    setTeams(response.data);
  };

  return (
    <Router>
      <Switch>
        <Route path="/team/new" component={TeamForm} />
        <Route path="/team/:id/edit" component={TeamForm} />
        <Route path="/" render={() => <TeamList teams={teams} />} />
      </Switch>
    </Router>
  );
}

export default App;
