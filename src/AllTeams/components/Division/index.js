import React from 'react';

import TeamCard from 'shared/TeamCard';
import './index.css';

const Division = (props) => {
  return (
    <div>
      <div className="m-auto leagueBanner">
        <img
          alt=""
          className="mr-4 leagueImage"
          src={require(`images/Leagues/${props.conference.replace(/\s/g, '')}.png`)}
        />
        <p className="m-0 leagueTitle">{props.conference}</p>
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
                color={team.photoColor}
                est={team.established}
                name={team.name}
                photo={team.photo}
                url={team.url}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Division;
