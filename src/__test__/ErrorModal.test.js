import React from 'react';
import { mount } from 'enzyme';

import ErrorModal from 'shared/ErrorModal';

it('renders error modal', () => {
  const wrapper = mount(
    <ErrorModal
      show={true}
      title={'Error!'}
      children={'Sample text'}
      buttonText={'Close'}
      link={'/'}
      variant={'btn-danger'}
    />,
  );
  expect(wrapper.props().show).toEqual(true);
  expect(wrapper.props().title).toEqual('Error!');
  expect(wrapper.props().buttonText).toEqual('Close');
  expect(wrapper.props().children).toEqual('Sample text');
});
