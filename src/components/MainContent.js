import React from 'react';
import { connect } from 'react-redux'

const MainContent = ({ currentPage }) => {
  const Page = require(`./pages/${currentPage}`);
  return Page.default({ test: 'oi' });
}

export default connect(
  (state) => ({ currentPage: state.currentPage })
)(MainContent);
