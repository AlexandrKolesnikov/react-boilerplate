import React from 'react';
import { shallow } from 'enzyme';
import App from '../index';

describe('App Module/Components', () => {
  it('<App /> should be rendered without children', () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
  });

  it('<App /> should be rendered with children', () => {
    const component = shallow(<App>Test</App>);

    expect(component).toMatchSnapshot();
  });
});
