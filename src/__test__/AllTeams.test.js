import React from 'react';
import {
  act,
  render,
  fireEvent,
  cleanup,
  screen,
  waitForElement,
} from '@testing-library/react';

import AllTeams from 'pages/AllTeams';

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        teams: [
          {
            id: 'a0I1U00000FfwjzUAB',
            name: 'Aberdeen IronBirds',
            url: 'AberdeenIronBirds',
            established: 1977,
            photo: 'Orioles/IronBirds-Logo.jpg',
            photoColor: '#0376b8',
            league: 'SS',
            conference: 'New York–Penn League',
            division: 'McNamara',
            stadium: 'Leidos Field at Ripken Stadium',
            address: '873 Long Dr, Aberdeen, MD 21001',
            location: {
              latitude: 39.531,
              longitude: -76.1867,
            },
            capacity: 6300,
          },
        ],
      }),
  }),
);

it('opens navigation disclaimer modal then closes', async () => {
  render(<AllTeams />);
  //console.log(screen.debug());
  //console.log((await global.fetch()).json());
  //await waitForElement(() => screen.getByText('Aberdeen'));
});
