import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
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
        <div className="viewer__header">
          <div className="viewer__header__title">
            <h1>⟵</h1>
            <h1>
              {`0${index + 1}. ${RichText.asText(title)}`}
              <div className="viewer__close" onClick={() => selectProject(null)}>
                ✕
              </div>
            </h1>
            <h1>⟶</h1>
          </div>
          <div className="viewer__desc">
            {RichText.render(description)}
          </div>

        </div>
        <div className="viewer__imageContainer">
          <div className="viewer__imageContainer__image">
            {imageList}
          </div>
          <div className="viewer__imageContainer__text">
            <span onClick={this.prevImage}>⟵</span>
            {slideIndex + 1} / {imageList.length}
            <span onClick={this.nextImage}>⟶</span>
          </div>
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  selectProject: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
