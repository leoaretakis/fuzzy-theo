import React from 'react';
import PageHeader from './PageHeader';
import MainContent from './MainContent';
import MainMenu from './MainMenu';

const App = () => (
  <div>
    <PageHeader />
    <section className="main-content">
      <MainMenu />
      <MainContent />
    </section>
  </div>
);

export default App;
