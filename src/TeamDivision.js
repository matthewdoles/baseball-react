import React from "react";

import TeamCard from "./TeamCard";
import "./TeamDivision.css";

const TeamDivision = props => {
  return (
    <div>
      <p className="ConfereceTitle">{props.conference}</p>
      {props.divisions.map(division => (
        <div key={division.name}>
          <p class="DivisionTitle">
            <span>{division.name}</span>
            <div class="Line"></div>
          </p>
          <ul className="TeamList">
            {division.teams.map(team => (
              <TeamCard
                key={team.id}
                name={team.name}
                est={team.established}
                logo={"./images/" + team.photo}
                color={team.photoColor}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TeamDivision;
