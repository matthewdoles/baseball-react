# react-baseball

### Description

There are 30 teams in Major League Baseball, each one of those teams can have on average around 5 affilaite teams which they use to develop upcoming players. From high to low, these affilaite teams play in leagues such as Triple A (AAA), Double A (AA), High A (A+), Single A (A), Short-Season A (SS), and Rookie (R). This website serves up a directory of all Major League Baseball teams and their affiliates.

### Design

#### URL

- [baseballaffiliates.web.app](https://baseballaffiliates.web.app/)
- [baseballaffiliates.firebaseapp.com](https://baseballaffiliates.firebaseapp.com/)

#### Deployment

The site is hosted on [Firebase](https://firebase.google.com/), and can be deployed on-demand via the CLI. However, there is a Github Action setup ([main.yml](/.github/workflows/main.yml)) to build and deploy the code to Firebase. Development is done on the develop branch, and then the Github Action is kicked off on merge with master.

#### API

The team data is pulled from my own backend hosted on Heroku. To optimize performance and reduce laoding times, the team data is stored in Session Storage upon retrieval. For more information, please consult the backend repository: [baseball-node](https://github.com/matthewdoles/baseball-node).

#### Pages

##### All Teams

The [AllTeams](src/pages/AllTeams) page is the website's default home page. The page provides a grid view layout of nearly 200 teams in alphabetical order by default. Each team is rendered using the shared [TeamCard](src/shared/TeamCard/index.js) component which has special mobile CSS styles to adapt to rendering nicely on all screen sizes. The pages's [TeamSearch](src/shared/TeamSearch/index.js) component allows the user to apply additional filters such as Established, League, and Division (on the condition that a League is selected). The TeamSearch component also provides a text search input which works in tandem with the active filter except for when filtering by Division.

##### Hierarchy

The [Hierarchy](src/pages/Hierarchy) page lists the affiliate hierarchy for each MLB team. On larger device sizes, the page will render the [TeamSelection](src/pages/Hierarchy/TeamSelection) component which lists the team icons for all MLB teams in alphabetical order from left to right. Although by default it will show the organizational hierarchy for all teams, clicking on a team icon will filter results for that specific team. On smaller device sizes, the [TeamSearch](src/shared/TeamSearch/index.js) will render and allow the user to filter by text input. Each team's hierarchy is rendered in the resuable [TeamHierarchy](src/pages/Hierarchy/TeamHierarchy) component. On larger device sizes, the affiliate teams will be indented to indicate the overall level of the league the team plays in. On smaller devices, only the MLB team will render at full width and the remaining teams will be slightly indented. In either circumstance, the MLB team and their affiliates will be ordered by level from top to bottom.

##### Team Detail
