import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import ViewerHeader from './ViewerHeader';
import ViewerCarousel from './ViewerCarousel';
import './Viewer.scss';

export default class Viewer extends React.Component {
  state = {
    slideIndex: 0,
  }

  nextImage = () => {
    const nextImg = this.state.slideIndex < this.props.images.length - 1
      ? this.state.slideIndex + 1
      : 0;
    this.goToImage(nextImg);
  }

  prevImage = () => {
    const prevImg = this.state.slideIndex === 0
      ? this.props.images.length - 1
      : this.state.slideIndex - 1;
    this.goToImage(prevImg);
  }

  goToImage = (num) => {
    this.setState({ slideIndex: num });
  }

  render() {
    const {
      selectProject, title, index, images, description,
    } = this.props;
    const { slideIndex } = this.state;
    const titleVal = RichText.asText(title);
    const imageList = images.map((img, i) => (
      <img
        className={i === slideIndex ? '-active' : ''}
        src={img.url}
        key={img.url}
        alt={`${titleVal} - Cassidy Villanos`}
      />
    ));

    return (
      <div className="viewer">
        <ViewerHeader
          index={index}
          title={title}
          description={description}
          selectProject={selectProject}
        />
        <ViewerCarousel
          imageList={imageList}
          slideIndex={slideIndex}
          nextImage={this.nextImage}
          prevImage={this.prevImage}
        />
      </div>
    );
  }
}

Viewer.propTypes = {
  selectProject: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
