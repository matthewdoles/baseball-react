import React from "react";

import "./TeamSelection.css";

const TeamSelection = props => {
  return (
    <div className="TeamSelect">
      <ul className="TeamSelectList">
        {props.teams.map(team => (
          <img
            src={require(`./images/${team.photo}`)}
            alt=""
            key={team.name}
            id={team.name}
            value={team.name}
            onClick={props.teamSelected}
          />
        ))}
      </ul>
    </div>
  );
};

export default TeamSelection;
