import React from 'react';

import { Card } from 'react-bootstrap';
import BravesLogo from './images/Braves-Logo.jpg';
import CubsLogo from './images/Cubs-Logo.png';
import RaysLogo from './images/Rays-Logo.png';
import PrincetonLogo from './images/Princeton-Rays.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Card className="TeamCard">
        <Card.Img variant="top" src={BravesLogo} style={{ width: '90%', height: '250px', padding: '5px', margin: 'auto' }}/>
        <Card.Body className="TeamCardBody">
          <Card.Title>Atlanta Braves</Card.Title>
          <Card.Text>Est. ???</Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={CubsLogo} style={{ width: '90%', height: '250px', padding: '5px', margin: 'auto' }}/>
        <Card.Body className="TeamCardBody">
          <Card.Title>Chicago Cubs</Card.Title>
          <Card.Text>Est. 1876</Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={RaysLogo} style={{ width: '90%', height: '250px', padding: '5px', margin: 'auto' }} />
        <Card.Body className="TeamCardBody">
          <Card.Title>Tampa Bay Rays</Card.Title>
          <Card.Text>
            Est. 1996
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={PrincetonLogo} style={{ width: '90%', height: '250px', padding: '5px', margin: 'auto' }} />
        <Card.Body className="TeamCardBody">
          <Card.Title>Princeton Rays</Card.Title>
          <Card.Text>
            Est. 1996
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={CubsLogo} />
        <Card.Body className="TeamCardBody">
          <Card.Title>Chicago Cubs</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={CubsLogo} />
        <Card.Body className="TeamCardBody">
          <Card.Title>Chicago Cubs</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={CubsLogo} />
        <Card.Body className="TeamCardBody">
          <Card.Title>Chicago Cubs</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={CubsLogo} />
        <Card.Body className="TeamCardBody">
          <Card.Title>Chicago Cubs</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={CubsLogo} />
        <Card.Body className="TeamCardBody">
          <Card.Title>Chicago Cubs</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={CubsLogo} />
        <Card.Body className="TeamCardBody">
          <Card.Title>Chicago Cubs</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="TeamCard">
        <Card.Img variant="top" src={CubsLogo} />
        <Card.Body className="TeamCardBody">
          <Card.Title>Chicago Cubs</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
