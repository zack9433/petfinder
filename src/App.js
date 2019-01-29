import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';
import Results from './Results';
import Details from './Details';
import Search from './Search';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <Search path="/search" />
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
