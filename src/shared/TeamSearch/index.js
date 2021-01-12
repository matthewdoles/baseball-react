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

const TeamSearch = (props) => {
  return (
    <div className="searchControls">
      <InputGroup className="teamSearch">
        <InputGroup.Prepend>
          <InputGroup.Text>Team</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={props.nameChange} id="TeamNameInput" />
      </InputGroup>
      <ButtonGroup className="searchButtons">
        <Button
          onClick={props.filterAlphabetical}
          className="searchButtonActive"
          id="AlphabeticalButton"
        >
          Alphabetical
        </Button>
        <Button onClick={props.filterEstablished} id="EstablishedButton">
          Established
        </Button>
        <DropdownButton
          as={ButtonGroup}
          title={props.league}
          id="LeagueDropdown"
          onSelect={props.filterLeague}
        >
          <div className="leagueDropdownItem hideLeague">
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Divider />
          </div>
          <Dropdown.Item eventKey="MLB" className="leagueDropdownItem">
            MLB
          </Dropdown.Item>
          <Dropdown.Item eventKey="AAA" className="leagueDropdownItem">
            AAA
          </Dropdown.Item>
          <Dropdown.Item eventKey="AA" className="leagueDropdownItem">
            AA
          </Dropdown.Item>
          <Dropdown.Item eventKey="A+" className="leagueDropdownItem">
            A+
          </Dropdown.Item>
          <Dropdown.Item eventKey="A" className="leagueDropdownItem">
            A
          </Dropdown.Item>
          <Dropdown.Item eventKey="SS" className="leagueDropdownItem">
            SS
          </Dropdown.Item>
          <Dropdown.Item eventKey="R" className="leagueDropdownItem">
            R
          </Dropdown.Item>
        </DropdownButton>
        {props.league !== 'League' && (
          <Button onClick={props.filterDivision} id="divisionButton">
            Division
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default TeamSearch;
