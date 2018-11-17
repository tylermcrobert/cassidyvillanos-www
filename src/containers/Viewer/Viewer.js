import React, { PropTypes } from 'react';

export default class Viewer extends React.Component {
  state = {
    doc: null,
  }
  render() {
    const { title, selectProject } = this.props;
    return (
      <div>
        <h1> ⟵ {title} ⟶ </h1>
        <div onClick={() => selectProject(null)}>[ close ]</div>
      </div>
    );
  }
}

Viewer.propTypes = {
};
