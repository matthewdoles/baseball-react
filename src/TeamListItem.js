import React from "react";

import "./TeamListItem.css";

const TeamListItem = props => {
  return (
    <div key={props.id} className="TeamListItem">
      <img src={require(`${props.logo}`)} />
      <span className="ItemName">{props.name}</span>
      <span className="ItemLeague">{props.league}</span>
    </div>
  );
};

export default TeamListItem;
