import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./TeamDetails.css";

const TeamDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState();
  const teamName = useParams().team;

  useEffect(() => {
    setIsLoading(true);
    const responseData = JSON.parse(sessionStorage.getItem("teams"));
    setSelectedTeam(responseData.teams.find(team => team.url === teamName));
    setIsLoading(false);
  }, [teamName]);

  return (
    <React.Fragment>{!isLoading && <p>{selectedTeam.name}</p>}</React.Fragment>
  );
};

export default TeamDetails;
