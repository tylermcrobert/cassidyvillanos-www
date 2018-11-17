import React, { Component } from 'react';
import prismicConfig from 'prismic-config';
import Prismic from 'prismic-javascript';
import Thumbnails from 'components/Thumbnails/Thumbnails';
import 'styles/reset.css';
import './App.scss';

class App extends Component {
  state = {
    doc: null,
    selectedProject: null,
  }

  componentDidMount() {
    Prismic.api(prismicConfig.apiEndpoint).then((api) => {
      api.query(Prismic.Predicates.at('document.type', 'project')).then((doc) => {
        this.setState({ doc });
      });
    });
  }

  selectProject = (uid) => {
    this.setState({ selectedProject: uid });
  }

  render() {
    const { doc, selectedProject } = this.state;
    if (doc) {
      return (
        selectedProject
          ? (
            <div>
              <h1>{selectedProject}</h1>
              <div onClick={() => this.selectProject(null)}>[ close ]</div>
            </div>
          ) : (
            <>
              <h1 className="title">Cassidy Villanos</h1>
              <Thumbnails doc={doc} selectProject={this.selectProject} />
              {selectedProject}
            </>
          )
      );
    }
    return (
      <div>Loading</div>
    );
  }
}

export default App;
