import React from 'react';
import PageHeader from './PageHeader';
import MainContent from './MainContent';
import MainMenu from './MainMenu';

const App = () => (
  <div>
    <PageHeader />
    <section>
      <MainMenu />
      <MainContent />
    </section>
  </div>
);

export default App;
