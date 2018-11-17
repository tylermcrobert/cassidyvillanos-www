import React, { PropTypes } from 'react';
import { RichText } from 'prismic-reactjs';
import './Viewer.scss';

export default class Viewer extends React.Component {
  state = {
    doc: null,
  }
  render() {
    const {
      selectProject, title, index, mainImage,
    } = this.props;
    const titleVal = RichText.asText(title);
    return (
      <div className="viewer">
        <div className="viewer__title">
          <h1>
            ⟵ {index + 1}. {RichText.asText(title)} ⟶
          </h1>
          <div className="viewer__close" onClick={() => selectProject(null)}>
            [ close ]
          </div>
        </div>
        <div className="viewer__image">
          <img src={mainImage.url} alt={`${titleVal} - Cassidy Villanos`} />
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
};
