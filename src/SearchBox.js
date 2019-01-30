import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { Consumer } from './SearchContext';

class SearchBox extends React.Component {
  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form>
              <label htmlFor="location">
                Location
                <input
                  id="location"
                  onChange={context.handleLocationInput}
                  value={context.location}
                  placeholder="Location"
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
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
                  value={context.breed}
                  onBlur={context.handleBreedChange}
                  onChange={context.handleBreedChange}
                  disabled={!context.breeds.length}
                >
                  {context.breeds.map(item => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
