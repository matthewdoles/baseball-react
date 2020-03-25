import React from "react";
import { Link } from "react-router-dom";

import "./TeamOrgHierarchy.css";

const TeamHierarchy = props => {
  return (
    <div className="TeamOrgHierarchy">
      <p className="TeamListTitle">
        <span>{props.name}</span>
      </p>
      <Link to={`/team/${props.url}`} className="TeamLink">
        <div key={props.id} className="TeamListItem">
          <img src={require(`../../images/${props.photo}`)} alt="" />
          <span className="ItemName">{props.name}</span>
          <span className="ItemLeague">{props.league}</span>
        </div>
      </Link>
      <ul className="AffiliateList">
        {props.affiliates.map(affiliate => (
          <Link to={`/team/${affiliate.url}`} className="TeamLink">
            <div
              key={affiliate.id}
              className={`TeamListItem AffiliateItem ${affiliate.league.replace(
                "+",
                ""
              )}`}
            >
              <img src={require(`../../images/${affiliate.photo}`)} alt="" />
              <span className="ItemName">{affiliate.name}</span>
              <span className="ItemLeague">{affiliate.league}</span>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TeamHierarchy;
