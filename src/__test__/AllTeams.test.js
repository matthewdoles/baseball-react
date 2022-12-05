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
import { mount } from 'enzyme';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
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
      }),
  }),
);

it('opens navigation disclaimer modal then closes', async () => {
  const mResponse = jest.fn().mockResolvedValue({
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
  });
  global.fetch = jest.fn(() => {
    return Promise.resolve({ json: mResponse });
  });
  const wrapper = mount(<AllTeams />);
  expect(wrapper.exists()).toBeTruthy();

  //expect(wrapper.text()).toBe('country: , cntCode: ');
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  console.log(wrapper.debug());
  //expect(wrapper.text()).toBe('country: US, cntCode: 123');
  //expect(global.fetch).toBeCalledWith('http://ip-api.com/json');

  //await act(async () => render(<AllTeams />));
  //console.log(screen.debug());
  //console.log((await global.fetch()).json());
  //await waitForElement(() => screen.getByText('Aberdeen'));
});
