import React from 'react';

import TeamCard from '../../../shared/TeamCard';
import './index.css';

const Division = (props) => {
  return (
    <div>
      <div className="leagueBanner">
        <img
          src={require(`../../../images/Leagues/${props.conference.replace(
            /\s/g,
            '',
          )}.png`)}
          alt=""
          className="leagueImage"
        />
        <p className="leagueTitle">{props.conference}</p>
      </div>
      {props.divisions.map((division) => (
        <div key={division.name}>
          <p class="divisionTitle">
            <span>{division.name}</span>
            <div class="line"></div>
          </p>
          <ul className="teamList">
            {division.teams.map((team) => (
              <TeamCard
                key={team.id}
                name={team.name}
                url={team.url}
                est={team.established}
                photo={team.photo}
                color={team.photoColor}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Division;
