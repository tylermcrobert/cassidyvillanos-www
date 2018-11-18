import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import './Viewer.scss';

export default class Viewer extends React.Component {
  state = {
    slideIndex: 0,
  }
  render() {
    const {
      selectProject, title, index, images, description,
    } = this.props;
    const { slideIndex } = this.state;
    const titleVal = RichText.asText(title);
    const imageList = images.map(img => (
      <img src={img.url} key={img.url} alt={`${titleVal} - Cassidy Villanos`} />
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
            {imageList[slideIndex]}
          </div>
          <div className="viewer__imageContainer__text">
            ⟵ {slideIndex + 1} / {imageList.length} ⟶
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
