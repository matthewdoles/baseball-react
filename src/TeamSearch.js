import React from "react";

import {
  InputGroup,
  FormControl,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import "./TeamSearch.css";

const TeamSearch = props => {
  return (
    <div className="SearchControls">
      <InputGroup className="TeamSearch">
        <InputGroup.Prepend>
          <InputGroup.Text>Team</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={props.nameChange} id="TeamNameInput" />
      </InputGroup>
      <ButtonGroup className="SearchButtons">
        <Button
          onClick={props.filterAlphabetical}
          className="SearchButtonActive"
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
          <div className="LeagueDropdownItem HideLeague">
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Divider />
          </div>
          <Dropdown.Item eventKey="MLB" className="LeagueDropdownItem">
            MLB
          </Dropdown.Item>
          <Dropdown.Item eventKey="AAA" className="LeagueDropdownItem">
            AAA
          </Dropdown.Item>
          <Dropdown.Item eventKey="AA" className="LeagueDropdownItem">
            AA
          </Dropdown.Item>
          <Dropdown.Item eventKey="A+" className="LeagueDropdownItem">
            A+
          </Dropdown.Item>
          <Dropdown.Item eventKey="A" className="LeagueDropdownItem">
            A
          </Dropdown.Item>
          <Dropdown.Item eventKey="SS" className="LeagueDropdownItem">
            SS
          </Dropdown.Item>
          <Dropdown.Item eventKey="R" className="LeagueDropdownItem">
            R
          </Dropdown.Item>
        </DropdownButton>
        {props.league !== "League" && (
          <Button onClick={props.filterDivision} id="EstablishedButton">
            Division
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default TeamSearch;
