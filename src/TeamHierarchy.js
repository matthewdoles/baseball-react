import React from "react";

import "./TeamHierarchy.css";

const TeamHierarchy = props => {
  return (
    <div className="TeamHierarchy">
      <p className="TeamListItemTitle">
        <span>{props.name}</span>
      </p>
      <div key={props.id} className="TeamListItem">
        <img src={require(`${props.logo}`)} alt="" />
        <span className="ItemName">{props.name}</span>
        <span className="ItemLeague">{props.league}</span>
      </div>
      <ul className="AffiliateList">
        {props.affiliates.map(affiliate => (
          <div
            key={affiliate.id}
            className={`TeamListItem AffiliateItem ${affiliate.league.replace(
              "+",
              ""
            )}`}
          >
            <img src={require(`./images/${affiliate.photo}`)} alt="" />
            <span className="ItemName">{affiliate.name}</span>
            <span className="ItemLeague">{affiliate.league}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TeamHierarchy;
