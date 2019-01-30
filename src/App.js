import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';
import pf from 'petfinder-client';
import Results from './Results';
import Details from './Details';
import Search from './Search';
import { Provider } from './SearchContext';

const petfinder = pf();

class App extends React.Component {
  state = {
    location: 'Seattle, WA',
    animal: '',
    breed: '',
    breeds: [],
    handleAnimalChange: this.handleAnimalChange,
    handleLocationInput: this.handleLocationInput,
    handleBreedChange: this.handleBreedChange,
    getBreeds: this.getBreeds
  };

  handleLocationInput = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value
      },
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            this.setState({
              breeds: []
            });
          }
        })
        .catch(console.error);
    } else {
      this.setState({
        breeds: []
      });
    }
  }

  render() {
    return (
      <>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <Search path="/search" />
            <Results path="/" />
            <Details path="/details/:id" />
          </Router>
        </Provider>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
