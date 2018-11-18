import React from 'react';
import { RichText } from 'prismic-reactjs';

const ViewerHeader = ({
  index, title, description, selectProject,
}) => (
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
  </div>);

export default ViewerHeader;
