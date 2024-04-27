import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Soccer Stats Tracker</h1>
      <div>
        <Link to="/edit-data">
          <button>Edit Data</button>
        </Link>
        <Link to="/generate-report">
          <button>Generate Report</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;