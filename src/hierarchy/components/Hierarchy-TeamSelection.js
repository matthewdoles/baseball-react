import React from "react";

import "./Hierarchy-TeamSelection.css";

const TeamSelection = props => {
  return (
    <div className="TeamSelect">
      <ul className="TeamSelectList">
        <img
          src={require("../../images/Leagues/MLB.png")}
          alt=""
          id="MLB"
          value="MLB"
          onClick={props.teamSelected}
          className="SelectedTeam"
        />
        {props.teams.map(team => (
          <img
            src={require(`../../images/${team.photo}`)}
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
