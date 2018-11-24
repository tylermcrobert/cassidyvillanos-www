import React from 'react';
import CursorTrigger from 'containers/Cursor/CursorTrigger';
import config from 'config';
import getImageSize from 'util/getImageSize';
import { RichText } from 'prismic-reactjs';
import './Viewer.scss';

export default class Viewer extends React.Component {
  state = {
    slideIndex: 0,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      this.resetIndex();
    }
  }

  resetIndex = () => {
    this.setState({ slideIndex: 0 });
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
    } = this.props;
    const { slideIndex } = this.state;
    const titleVal = RichText.asText(title);

    const imageList = images.map((img, i) => (
      <img
        className={i === slideIndex ? '-active' : ''}
        src={getImageSize(img, config.viewerSize)}
        key={img.url}
        alt={`${titleVal} - Cassidy Villanos`}
      />
    ));

    const nav = dir => `viewer__nav__item viewer__nav__item--${dir}`;
    return (
      <div className="viewer">
        <div className="viewer__image" >
          {imageList}
          <div className="viewer__nav">
            <CursorTrigger cursor="prev">
              <div className={nav('prev')} onClick={this.prevImage} />
            </CursorTrigger>
            <CursorTrigger cursor="next">
              <div className={nav('next')} onClick={this.nextImage} />
            </CursorTrigger>
          </div>
        </div>
        <div className="viewer__text">
          <div className="viewer__text--inner">
            <div className="viewer__text__item viewer__text__item--title">
              {titleVal}
            </div>
            <div className="viewer__text__item viewer__text__item--index">
              {slideIndex + 1} / {imageList.length}
            </div>
            <div className="viewer__text__item viewer__text__item--info">
              info
            </div>
          </div>
        </div>
      </div>
    );
  }
}
