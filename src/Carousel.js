import React from 'react';

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
    }

    return { photos };
  }

  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };
  render() {
    const { active, photos } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt={photos[active].name} />
        <div className="carousel-smaller">
          {photos.map((photo, index) => {
            return (
              /* eslint-disable-next-line */
              <img
                onClick={this.handleIndexClick}
                data-index={index}
                key={photo.value}
                src={photo.value}
                className={index === active ? 'active' : ''}
                alt={photo.name}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
