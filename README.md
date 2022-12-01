# react-baseball

### Description

There are 30 teams in Major League Baseball, each one of those teams can have on average around 5 affilaite teams which they use to develop upcoming players. From high to low, these affilaite teams play in leagues such as Triple A (AAA), Double A (AA), High A (A+), Single A (A), Short-Season A (SS), and Rookie (R). This website serves up a directory of all Major League Baseball teams and their affiliates.

### Design

#### URL

- [baseball-react.vercel.app](https://baseball-react.vercel.app)

#### API

The team data is pulled from my own backend hosted on Heroku. To optimize performance and reduce laoding times, the team data is stored in Session Storage upon retrieval. For more information, please consult the backend repository: [baseball-node](https://github.com/matthewdoles/baseball-node).

#### Pages

##### All Teams

The [AllTeams](src/pages/AllTeams) page is the website's default home page. The page provides a grid view layout of nearly 200 teams in alphabetical order by default. Each team is rendered using the shared [TeamCard](src/shared/TeamCard/index.js) component which has special mobile CSS styles to adapt to rendering nicely on all screen sizes. The pages's [TeamSearch](src/shared/TeamSearch/index.js) component allows the user to apply additional filters such as Established, League, and Division (on the condition that a League is selected). The TeamSearch component also provides a text search input which works in tandem with the active filter except for when filtering by Division.

##### Hierarchy

The [Hierarchy](src/pages/Hierarchy) page lists the affiliate hierarchy for each MLB team. On larger device sizes, the page will render the [TeamSelection](src/pages/Hierarchy/components/TeamSelection) component which lists the team icons for all MLB teams in alphabetical order from left to right. Although by default it will show the organizational hierarchy for all teams, clicking on a team icon will filter results for that specific team. On smaller device sizes, the [TeamSearch](src/shared/TeamSearch/index.js) will render and allow the user to filter by text input. Each team's hierarchy is rendered in the resuable [TeamHierarchy](src/pages/Hierarchy/components/TeamHierarchy) component. On larger device sizes, the affiliate teams will be indented to indicate the overall level of the league the team plays in. On smaller devices, only the MLB team will render at full width and the remaining teams will be slightly indented. In either circumstance, the MLB team and their affiliates will be ordered by level from top to bottom.

##### Team Detail

The [TeamDetails](src/pages/TeamDetails) page is navigated to when clicking on either a [TeamCard](src/shared/TeamCard/index.js) on the [AllTeams](src/pages/AllTeams) page, or a list item (team) on the [TeamHierarchy](src/pages/Hierarchy/components/TeamHierarchy) component from the [Hierarchy](src/pages/Hierarchy) page. As self-described, the page gives details on the selected team such as year established, stadium, capacity, address, etc. The page also includes a [Map](src/shared/Map/index.js) component which uses the stadium's lattitude and logitude to plot the location on a Google Map. At the very top of the page is a [TeamDetailsHeader](src/pages/TeamDetails/components/TeamDetailsHeader) which allows the user to go to the next or previous team alphabetically or a random team altogether without having to navigate back to the TeamDetails or Hierarchy page.

#### Components

##### Navigation

The [Navigation](src/shared/Navigation/index.js) component is on every page and contains two links for navigating between the [AllTeams](src/pages/AllTeams) and [Hierarchy](src/pages/Hierarchy) pages. In addition, the far right corner contains a question mark icon which opens a disclaimer modal in regards to the trademarks of Major League Baseball.

##### ErrorModal

The [ErrorModal](src/shared/ErrorModal/index.js) is used on each page to show an error mesasge in the event the [http-hook](src/hooks/http-hook.js) fails to fetch data from the backend.
