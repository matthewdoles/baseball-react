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
        <Button onClick={props.filterAlphabetical} id="AlphabeticalButton">
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
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="MLB">MLB</Dropdown.Item>
          <Dropdown.Item eventKey="AAA">AAA</Dropdown.Item>
          <Dropdown.Item eventKey="AA">AA</Dropdown.Item>
          <Dropdown.Item eventKey="A+">A+</Dropdown.Item>
          <Dropdown.Item eventKey="A">A</Dropdown.Item>
          <Dropdown.Item eventKey="SS">SS</Dropdown.Item>
          <Dropdown.Item eventKey="R">R</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </div>
  );
};

export default TeamSearch;
