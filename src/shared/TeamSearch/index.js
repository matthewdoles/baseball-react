import React from 'react';

import {
  InputGroup,
  FormControl,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import './index.css';

const TeamSearch = ({
  league,
  nameChange,
  filterAlphabetical,
  filterDivision,
  filterEstablished,
  filterLeague,
}) => {
  const leagues = ['MLB', 'AAA', 'AA', 'A+', 'A', 'SS', 'R'];

  return (
    <div className="searchControls">
      <InputGroup className="teamSearch">
        <InputGroup.Prepend>
          <InputGroup.Text>Team</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={nameChange} id="TeamNameInput" />
      </InputGroup>
      <ButtonGroup className="searchButtons">
        <Button
          onClick={filterAlphabetical}
          className="searchButtonActive"
          id="AlphabeticalButton"
        >
          Alphabetical
        </Button>
        <Button onClick={filterEstablished} id="EstablishedButton">
          Established
        </Button>
        <DropdownButton
          as={ButtonGroup}
          title={league}
          id="LeagueDropdown"
          onSelect={filterLeague}
        >
          <div className="leagueDropdownItem hideLeague">
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Divider />
          </div>
          {leagues.map((league) => (
            <Dropdown.Item eventKey={league} className="leagueDropdownItem">
              {league}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {league !== 'League' && (
          <Button onClick={filterDivision} id="DivisionButton">
            Division
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default TeamSearch;
