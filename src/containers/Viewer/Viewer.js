import React, { PropTypes } from 'react';
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
    const titleVal = RichText.asText(title);
    const imageList = images.map(img => (
      <img src={img.url} alt={`${titleVal} - Cassidy Villanos`} />
    ));

    return (
      <div className="viewer">
        <div className="viewer__title">
          <h1>
            ⟵ {index + 1}. {RichText.asText(title)} ⟶
          </h1>
          <div className="viewer__desc">
            {RichText.render(description)}
          </div>
          <div className="viewer__close" onClick={() => selectProject(null)}>
            [ close ]
          </div>
        </div>
        <div className="viewer__image">
          {imageList}
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
};
