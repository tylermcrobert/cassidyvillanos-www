import React from 'react';
import CursorContext from './CursorContext';

export default class CursorTrigger extends React.Component {
  update = () => {
    this.context.updateCursor(this.props.cursor);
  }

  clear = () => {
    this.context.updateCursor(null);
  }

  render() {
    return (
      <div
        className={this.props.className}
        onFocus={this.update}
        onMouseOver={this.update}
        onMouseOut={this.clear}
        onBlur={this.clear}
      >
        {this.props.children}
      </div>);
  }
}

CursorTrigger.contextType = CursorContext;
