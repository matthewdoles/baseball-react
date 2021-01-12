import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const TeamHierarchy = (props) => {
  return (
    <div className="teamOrgHierarchy">
      <p className="teamListTitle">
        <span>{props.name}</span>
      </p>
      <Link to={`/team/${props.url}`} className="teamLink">
        <div key={props.id} className="teamListItem">
          <img src={require(`../../../images/${props.photo}`)} alt="" />
          <span className="itemName">{props.name}</span>
          <span className="itemLeague">{props.league}</span>
        </div>
      </Link>
      <ul className="affiliateList">
        {props.affiliates.map((affiliate) => (
          <Link to={`/team/${affiliate.url}`} className="teamLink">
            <div
              key={affiliate.id}
              className={`teamListItem affiliateItem ${affiliate.league.replace(
                '+',
                '',
              )}`}
            >
              <img src={require(`../../../images/${affiliate.photo}`)} alt="" />
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
