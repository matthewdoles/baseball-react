# react-baseball

### Description

There are 30 teams in Major League Baseball, each one of those teams can have on average around 5 affilaite teams which they use to develop upcoming players. From high to low, these affilaite teams play in leagues such as Triple A (AAA), Double A (AA), High A (A+), Single A (A), Short-Season A (SS), and Rookie (R). This website serves up a directory of all Major League Baseball teams and their affiliates.

### Design

#### URL

- [baseballaffiliates.web.app](https://baseballaffiliates.web.app/)
- [baseballaffiliates.firebaseapp.com](https://baseballaffiliates.firebaseapp.com/)

#### Deploy

The site is hosted on [Firebase](https://firebase.google.com/), and can be deployed on-demand via the CLI. However, there is a Github Action setup ([main.yml](/.github/workflows/main.yml)) to build and deploy the code to Firebase. Development is done on the develop branch, and then the Github Action is kicked off on merge with master.

#### API

The team data is pulled from my own backend hosted on Heroku. To optimize performance and reduce laoding times, the team data is stored in Session Storage upon retrieval. For more information, please consult the backend repository: [baseball-node](https://github.com/matthewdoles/baseball-node).

#### Pages

##### All Teams

##### Hierarchy

##### Team Detail
