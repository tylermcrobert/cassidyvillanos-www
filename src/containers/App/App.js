import React, { Component } from 'react';
import prismicConfig from 'prismic-config';
import Prismic from 'prismic-javascript';
import Thumbnails from 'components/Thumbnails/Thumbnails';
import Viewer from 'containers/Viewer/Viewer';
import 'styles/reset.css';
import './App.scss';

class App extends Component {
  state = {
    selectedProject: null,
    projects: null,
  }

  componentDidMount() {
    Prismic.api(prismicConfig.apiEndpoint).then((api) => {
      api.query(Prismic.Predicates.at('document.type', 'project')).then((doc) => {
        this.setState({
          projects: doc.results.map((result) => {
            const { uid } = result;
            const { title, thumbnail, description } = result.data;
            return {
              uid,
              title,
              thumbnail,
              description,
            };
          }),
        });
      });
    });
  }

  getIndex = () =>
    this.state.projects
      .map(proj => proj.uid)
      .indexOf(this.state.selectedProject)

  selectProject = (uid) => {
    this.setState({ selectedProject: uid });
  }

  render() {
    const { selectedProject, projects } = this.state;
    if (projects) {
      const index = this.getIndex();
      return (
        selectedProject
          ? (
            <Viewer
              index={index}
              mainImage={projects[index].thumbnail.laptop}
              title={projects[index].title}
              description={projects[index].description}
              selectProject={this.selectProject}
            />
          ) : (
            <>
              <h1 className="title">Cassidy Villanos</h1>
              <Thumbnails projects={projects} selectProject={this.selectProject} />
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
