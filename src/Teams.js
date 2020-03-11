import React, { useEffect, useState } from 'react';

import TeamCard from './TeamCard';
import { useHttpClient } from './hooks/http-hook';
import './Teams.css';

const Teams = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedTeams, setLoadedTeams] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/teams');
        console.log(responseData);
        setLoadedTeams(responseData.teams);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <div>loading...</div>}
      {!isLoading && loadedTeams && (
        <ul className="TeamList">
          {loadedTeams.map(team => (
            <TeamCard
              key={team.id}
              name={team.name}
              est={team.established}
              logo={'./images/' + team.photo}
              color={team.photoColor}
            />
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default Teams;
