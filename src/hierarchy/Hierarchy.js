import React, { useEffect, useState } from "react";

import Navigation from "../shared/Navigation";
import TeamOrgHierarchy from "./components/TeamOrgHierarchy";
import TeamSelection from "./components/TeamSelection";
import { useHttpClient } from "../hooks/http-hook";
import "./Hierarchy.css";

const Hierarchy = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [allAffiliates, setAllAffiliates] = useState(null);
  const [selectableTeams, setSelectableTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("MLB");
  const [filteredTeams, setFilteredTeams] = useState();

  useEffect(() => {
    const fetchTeams = async () => {
      let responseData;
      if (sessionStorage.getItem("affiliates") === null) {
        try {
          responseData = await sendRequest(
            "http://localhost:5000/teams/affiliates"
          );
          sessionStorage.setItem("affiliates", JSON.stringify(responseData));
        } catch (error) {}
      } else {
        responseData = JSON.parse(sessionStorage.getItem("affiliates"));
      }
      setAllAffiliates(responseData.teams);
      setFilteredTeams(responseData.teams);
      const mlbTeams = responseData.teams.filter(team => team.league === "MLB");
      setSelectableTeams(mlbTeams);
    };
    fetchTeams();
  }, [sendRequest]);

  const onTeamSelected = event => {
    const teamLogo = document.getElementById(selectedTeam);
    if (
      selectedTeam !== event.target.getAttribute("value") &&
      event.target.getAttribute("value") !== "MLB"
    ) {
      const teams = [...allAffiliates];
      if (document.getElementById(selectedTeam) !== null) {
        teamLogo.classList.remove("SelectedTeam");
      }
      event.target.classList.add("SelectedTeam");
      setFilteredTeams(
        teams.filter(team => team.name === event.target.getAttribute("value"))
      );
      setSelectedTeam(event.target.getAttribute("value"));
    } else {
      teamLogo.classList.remove("SelectedTeam");
      document.getElementById("MLB").classList.add("SelectedTeam");
      setFilteredTeams(allAffiliates);
      setSelectedTeam("MLB");
    }
  };

  return (
    <React.Fragment>
      <Navigation hierarchyActive={true} />
      {isLoading && <div>loading...</div>}
      {!isLoading && filteredTeams && selectableTeams && (
        <React.Fragment>
          <TeamSelection
            teams={selectableTeams}
            teamSelected={onTeamSelected}
          />
          <ul className="TeamList">
            {filteredTeams.map(team => (
              <TeamOrgHierarchy
                key={team.id}
                name={team.name}
                photo={team.photo}
                league={team.league}
                affiliates={team.affiliates}
                url={team.url}
              />
            ))}
          </ul>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Hierarchy;
