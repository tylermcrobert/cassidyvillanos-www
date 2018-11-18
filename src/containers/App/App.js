import React, { Component } from 'react';
import prismicConfig from 'prismic-config';
import Prismic from 'prismic-javascript';
import ThumbnailContainer from 'components/ThumbnailContainer/ThumbnailContainer';
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
      api.getSingle('site').then((doc) => {
        const ids = doc.data.projects.map(proj => proj.project.id);
        this.getProjects(api, ids);
      });
    });
  }

  getProjects = (api, ids) => {
    api.getByIDs(ids).then((doc) => {
      this.setState({
        projects: doc.results.map(result => ({
          uid: result.uid,
          title: result.data.title,
          description: result.data.description,
          images: result.data.images.map(img => img.image),
        })),
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
        <>
          <h1 className="title">Cassidy Villanos</h1>
          {selectedProject
            ? (
              <Viewer
                index={index}
                images={projects[index].images}
                title={projects[index].title}
                description={projects[index].description}
                selectProject={this.selectProject}
              />
            ) : (
              <ThumbnailContainer projects={projects} selectProject={this.selectProject} />
            )}
        </>
      );
    }
    return (
      <div>Loading</div>
    );
  }
}

export default App;
