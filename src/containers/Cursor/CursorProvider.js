import React from 'react';
import CursorContext from './CursorContext';
import './cursor.scss';


export default class CursorProvider extends React.Component {
  constructor(props) {
    super(props);
    this.cursor = React.createRef();
    this.container = React.createRef();
  }

  state = {
    cursor: null,
  }

  componentDidMount() {
    this.addListener();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  addListener = () => {
    document.addEventListener('mousemove', this.watchMove);
  }

  removeListener = () => {
    document.removeEventListener('mousemove', this.watchMove);
  }

  watchMove = (e) => {
    const cursor = this.cursor.current;
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    cursor.style.display = 'block';
  }

  updateCursor = (cursor) => {
    this.setState({ cursor });
  }

  render() {
    return (
      <CursorContext.Provider value={{ updateCursor: this.updateCursor }}>
        <div className={this.props.className} ref={this.container}>
          {this.props.children}
          <div className="cursor" style={{ display: 'none' }}ref={this.cursor}>
            <div className="cursor__inner">{this.state.cursor}</div>
          </div>
        </div>
      </CursorContext.Provider>
    );
  }
}
