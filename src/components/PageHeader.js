import React from 'react';

class PageHeader extends React.Component {
  render() {
    return (
      <section className="page-header">
        <h1 className="project-name">Fuzzy-theo</h1>
        <h2 className="project-tagline">Fuzzy set theory utility javascript library</h2>
        <a href="https://github.com/leoaretakis/fuzzy-theo" className="btn">View on GitHub</a>
        <a href="https://github.com/leoaretakis/fuzzy-theo/zipball/master" className="btn">Download .zip</a>
        <a href="https://github.com/leoaretakis/fuzzy-theo/tarball/master" className="btn">Download .tar.gz</a>
      </section>
    );
  }
}

export default PageHeader;
