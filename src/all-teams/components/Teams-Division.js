import React from 'react';

import TeamCard from '../../shared/TeamCard';
import './Teams-Division.css';

const TeamDivision = (props) => {
  return (
    <div>
      <div className='ConferenceBanner'>
        <img
          src={require(`../../images/Leagues/${props.conference.replace(
            /\s/g,
            ''
          )}.png`)}
          alt=''
          className='ConferenceImage'
        />
        <p className='ConfereceTitle'>{props.conference}</p>
      </div>
      {props.divisions.map((division) => (
        <div key={division.name}>
          <p class='DivisionTitle'>
            <span>{division.name}</span>
            <div class='Line'></div>
          </p>
          <ul className='TeamList'>
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

export default TeamDivision;
