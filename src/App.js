import React from 'react';
import ReactDOM from 'react-dom';
import Pet from './Pet';
import pf from 'petfinder-client';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  state = {
    pets: []
  };
  componentDidMount() {
    petfinder.pet
      .find({ location: 'Seattle, WA', output: 'full' })
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
  }

  render() {
    return (
      <>
        <h1>Adopt Me!</h1>
        {this.state.pets.map(pet => {
          const breed = Array.isArray(pet.breeds.breed)
            ? pet.breeds.breed.join(', ')
            : pet.breeds.breed;

          return (
            <Pet
              key={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
