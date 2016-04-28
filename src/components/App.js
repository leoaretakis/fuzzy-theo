import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

import PageHeader from './PageHeader';
import MainContent from './MainContent';

class App extends React.Component {
  render() {
    const { counter, dispatch } = this.props;

    return (
      <div>
        <PageHeader />
        <MainContent />
        <span>Counter: {counter}</span>
        <button onClick={() => dispatch(actions.counterIncrement())}>Increment</button>
        <button onClick={() => dispatch(actions.counterDecrement())}>Decrement</button>
      </div>
    );
  }
}

export default connect(function(state) {
  return { counter: state.counter };
})(App);
