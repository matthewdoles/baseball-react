import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './TeamDetailsNavigation.css';

const TeamDetailsNavigation = (props) => {
  const [currentIndex, setCurrentIndex] = useState();
  const [disablePrev, setDisablePrev] = useState();
  const [disableNext, setDisableNext] = useState();
  const history = useHistory();

  useEffect(() => {
    setDisablePrev(false);
    setDisableNext(false);

    const currentIndex = props.allTeams.findIndex(
      (team) => team.id === props.selectedTeam.id
    );

    if (currentIndex === props.allTeams.length - 1) {
      setDisableNext(true);
    }
    if (currentIndex === 0) {
      setDisablePrev(true);
    }

    setCurrentIndex(currentIndex);
  }, [props]);

  const findPrevTeam = () => {
    const previousTeam = props.allTeams[currentIndex - 1];
    history.push(`/team/${previousTeam.url}`);
  };

  const findRandomTeam = () => {
    const randomIndex = Math.floor(Math.random() * props.allTeams.length);
    const nextTeam = props.allTeams[randomIndex];
    history.push(`/team/${nextTeam.url}`);
  };

  const findNextTeam = () => {
    const nextTeam = props.allTeams[currentIndex + 1];
    history.push(`/team/${nextTeam.url}`);
  };

  return (
    <div
      className='TeamDetails-Navigation'
      style={{
        backgroundColor: props.selectedTeam.photoColor,
      }}
    >
      {disablePrev === false ? (
        <React.Fragment>
          <p className='TeamDetails-NavigationItem' onClick={findPrevTeam}>
            PREVIOUS
          </p>
          <p className='TeamDetails-NavigationItem'>|</p>
        </React.Fragment>
      ) : null}
      <p className='TeamDetails-NavigationItem' onClick={findRandomTeam}>
        RANDOM
      </p>
      {disableNext === false ? (
        <React.Fragment>
          <p className='TeamDetails-NavigationItem'>|</p>
          <p className='TeamDetails-NavigationItem' onClick={findNextTeam}>
            NEXT
          </p>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default TeamDetailsNavigation;
