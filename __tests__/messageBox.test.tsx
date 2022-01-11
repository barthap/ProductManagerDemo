import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { MessageBoxComponent } from '../src/components/MessageBox';

jest.mock('@codler/react-native-keyboard-aware-scroll-view');

it('should render MessageBoxComponent', function () {
  const render = renderer.create(<MessageBoxComponent>Hello</MessageBoxComponent>);
  expect(render).toMatchSnapshot();
});

it('should render MessageBoxComponent with icon', function () {
  const render = renderer.create(
    <MessageBoxComponent iconShown iconName="ios-alert">
      Hello
    </MessageBoxComponent>
  );

  expect(render).toMatchSnapshot();
});
