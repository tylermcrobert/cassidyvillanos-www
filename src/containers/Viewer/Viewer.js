import React from 'react';
import getImageSize from 'util/getImageSize';
import leadingZero from 'util/leadingZero';
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
      title, images,
      // index,
      // description,
    } = this.props;
    const { slideIndex } = this.state;
    const titleVal = RichText.asText(title);

    const imageList = images.map((img, i) => (
      <img
        className={i === slideIndex ? '-active' : ''}
        src={getImageSize(img, 'laptop')}
        key={img.url}
        alt={`${titleVal} - Cassidy Villanos`}
      />
    ));

    return (
      <div className="viewer">
        <div className="viewer__imageContainer">
          <div className="viewer__imageContainer__image">
            {imageList}
          </div>
          <div className="viewer__imageContainer__text">
            <div>{titleVal}</div>
            <div>
              <span onClick={this.prevImage}>⟵</span>
              {leadingZero(slideIndex + 1)} / {leadingZero(imageList.length)}
              <span onClick={this.nextImage}>⟶</span>
            </div>
            <div>info</div>
          </div>
        </div>
      </div>
    );
  }
}
