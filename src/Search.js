import React from 'react';
import pf, { ANIMALS } from 'petfinder-client';

const petfinder = pf();

class Search extends React.Component {
  state = {
    location: 'Seattle, WA',
    animal: '',
    breed: '',
    breeds: []
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
    const { location, animal, breed } = this.state;
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={this.handleLocationInput}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
          >
            <option />
            {ANIMALS.map(item => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onBlur={this.handleBreedChange}
            onChange={this.handleBreedChange}
            disabled={!this.state.breeds.length}
          >
            {this.state.breeds.map(item => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </label>
        <button>Submit</button>
      </div>
    );
  }
}

export default Search;
