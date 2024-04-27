import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeagueReport = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [report, setReport] = useState(null);

  useEffect(() => {
    axios.get('/api/leagues')
      .then(response => setLeagues(response.data))
      .catch(error => console.error('Error fetching leagues:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`/api/reports/${selectedLeague}`)
      .then(response => setReport(response.data))
      .catch(error => console.error('Error fetching report:', error));
  };

  return (
    <div>
      <h2>League Report</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="league">Select League</label>
          <select
            id="league"
            value={selectedLeague}
            onChange={(event) => setSelectedLeague(event.target.value)}
          >
            <option value="">-- Select League --</option>
            {leagues.map(league => (
              <option key={league.league_id} value={league.league_id}>
                {league.league_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Generate Report</button>
      </form>
      {report && (
        <div>
          <h3>League Standings</h3>
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Matches Played</th>
                <th>Wins</th>
                <th>Draws</th>
                <th>Losses</th>
                <th>Goals Scored</th>
                <th>Goals Conceded</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {report.standings.map(standing => (
                <tr key={standing.team_id}>
                  <td>{standing.team_name}</td>
                  <td>{standing.matches_played}</td>
                  <td>{standing.wins}</td>
                  <td>{standing.draws}</td>
                  <td>{standing.losses}</td>
                  <td>{standing.goals_scored}</td>
                  <td>{standing.goals_conceded}</td>
                  <td>{standing.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeagueReport;