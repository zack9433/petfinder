import React from 'react';
import Pet from './Pet';
import pf from 'petfinder-client';
import SearchBox from './SearchBox';
import { Consumer } from './SearchContext';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  state = {
    pets: []
  };

  componentDidMount() {
    this.search();
  }

  search = () => {
    const { location, animal, breed } = this.props.searchParams;
    petfinder.pet
      .find({ location, animal, breed, output: 'full' })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          pets = Array.isArray(data.petfinder.pets.pet)
            ? data.petfinder.pets.pet
            : [data.petfinder.pets.pet];
        } else {
          pets = [];
        }

        this.setState({
          pets
        });
      });
  };

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          const breed = Array.isArray(pet.breeds.breed)
            ? pet.breeds.breed.join(', ')
            : pet.breeds.breed;

          return (
            <Pet
              key={pet.id}
              id={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
