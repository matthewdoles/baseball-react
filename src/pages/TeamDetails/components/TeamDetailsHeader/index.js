import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './index.css';

const TeamDetailsHeader = (props) => {
  const [currentIndex, setCurrentIndex] = useState();
  const [disablePrev, setDisablePrev] = useState();
  const [disableNext, setDisableNext] = useState();
  const history = useHistory();

  useEffect(() => {
    setDisablePrev(false);
    setDisableNext(false);

    const currentIndex = props.allTeams.findIndex(
      (team) => team.id === props.selectedTeam.id,
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
      className="navigation"
      style={{
        backgroundColor: props.selectedTeam.photoColor,
      }}
    >
      {disablePrev === false ? (
        <React.Fragment>
          <p className="navigationItem" onClick={findPrevTeam}>
            PREVIOUS
          </p>
          <p className="navigationItem">|</p>
        </React.Fragment>
      ) : null}
      <p className="navigationItem" onClick={findRandomTeam}>
        RANDOM
      </p>
      {disableNext === false ? (
        <React.Fragment>
          <p className="navigationItem">|</p>
          <p className="navigationItem" onClick={findNextTeam}>
            NEXT
          </p>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default TeamDetailsHeader;
