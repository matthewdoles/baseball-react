import React from 'react';

import './index.css';

const TeamSelection = ({ teamSelected, teams }) => {
  return (
    <div className="mb-3 teamSelect">
      <ul className="m-auto p-0 teamSelectList">
        <img
          src={require('images/Leagues/MLB.png')}
          alt=""
          id="MLB"
          value="MLB"
          onClick={teamSelected}
          className="selectedTeam"
        />
        {teams.map((team) => (
          <img
            src={require(`images/${team.photo}`)}
            alt=""
            key={team.name}
            id={team.name}
            value={team.name}
            onClick={teamSelected}
          />
        ))}
      </ul>
    </div>
  );
};

export default TeamSelection;
