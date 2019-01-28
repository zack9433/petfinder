import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';
import Results from './Results';
import Details from './Details';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
