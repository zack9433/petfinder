import React from 'react';
import pf from 'petfinder-client';
import Carousel from './Carousel';

const petfinder = pf();

class Details extends React.Component {
  state = {
    loading: true
  };
  componentDidMount() {
    const { id } = this.props;
    petfinder.pet
      .get({
        output: 'full',
        id
      })
      .then(data => {
        const breed = Array.isArray(data.petfinder.pet.breeds.breed)
          ? data.petfinder.pet.breeds.breed.join(', ')
          : data.petfinder.pet.breeds.breed;
        this.setState({
          name: data.petfinder.pet.name,
          animal: data.petfinder.pet.animal,
          location: `${data.petfinder.pet.contact.city}, ${
            data.petfinder.pet.state
          }`,
          description: data.petfinder.pet.description,
          media: data.petfinder.pet.media,
          breed,
          loading: false
        });
      });
  }
  render() {
    if (this.state.loading) {
      return <h1>loading....</h1>;
    }
    const { name, animal, location, description, media, breed } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
