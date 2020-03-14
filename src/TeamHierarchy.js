import React, { useEffect } from "react";

import "./TeamHierarchy.css";

const TeamHierarchy = props => {
  return (
    <React.Fragment>
        <div key={props.id} className="TeamListItem">
          <img src={require(`${props.logo}`)} />
          <span className="ItemName">{props.name}</span>
          <span className="ItemLeague">{props.league}</span>
        </div>
        <ul className="AffiliateList">
          {props.affiliates.map(affiliate => (
            <div
              key={affiliate.id}
              className={`TeamListItem AffiliateItem ${affiliate.league.replace('+', '')}`}
            >
              <span className="ItemName">{affiliate.name}</span>
              <span className="ItemLeague">{affiliate.league}</span>
            </div>
          ))}
        </ul>
    </React.Fragment>
  );
};

export default TeamHierarchy;
