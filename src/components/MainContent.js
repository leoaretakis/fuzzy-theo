import React from 'react';
import { connect } from 'react-redux'
import InitialPage from './pages/InitialPage';

const Pages = {
  InitialPage
}

const MainContent = ({ currentPage }) => {
  return (
    <section>
      { Pages[currentPage]() }
    </section>
  );
}

export default connect(
  (state) => ({ currentPage: state.currentPage })
)(MainContent);
