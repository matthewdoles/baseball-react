import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const TeamHierarchy = ({ id, name, url, photo, league, affiliates }) => {
  return (
    <div className="py-3">
      <p className="teamListTitle">
        <span>{name}</span>
      </p>
      <Link to={`/team/${url}`} className="teamLink">
        <div key={id} className="teamListItem">
          <img src={require(`images/${photo}`)} alt="" />
          <span className="itemName">{name}</span>
          <span className="itemLeague">{league}</span>
        </div>
      </Link>
      <ul>
        {affiliates.map((affiliate) => (
          <Link to={`/team/${affiliate.url}`} className="teamLink">
            <div
              key={affiliate.id}
              className={`teamListItem ml-auto mr-0 ${affiliate.league.replace(
                '+',
                '',
              )}`}
            >
              <img src={require(`images/${affiliate.photo}`)} alt="" />
              <span className="itemName">{affiliate.name}</span>
              <span className="itemLeague">{affiliate.league}</span>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TeamHierarchy;
