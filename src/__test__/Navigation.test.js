import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Navigation from 'shared/Navigation';

afterEach(cleanup);

it('renders navigation', () => {
  render(<Navigation allTeamsActive={true} />);
});

it('opens the navigation disclaimer modal then closes', () => {
  const { getByText, getByTestId } = render(<Navigation allTeamsActive={true} />);

  fireEvent.click(getByText('?'));

  expect(getByTestId('error-modal-text').textContent).toContain(
    'All trademarks and service marks',
  );

  fireEvent.click(getByText('Close'));
});
