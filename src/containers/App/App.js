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
    viewerIsOpen: false,
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
    this.setState({ selectedProject: uid, viewerIsOpen: true });
    // window.scrollTo(0, 0);
  }

  closeViewer = () => {
    this.setState({ viewerIsOpen: false });
  }

  render() {
    const { selectedProject, projects, viewerIsOpen } = this.state;
    if (projects) {
      const index = this.getIndex();
      return (
        <>
          <div className={`title ${viewerIsOpen ? '-lt' : ''}`}>
            <p>Cassidy Villanos</p>
            <div className="title__close" onClick={this.closeViewer}>✕</div>
          </div>
          <div className={`view view--thumbs ${!viewerIsOpen ? '-active' : ''}`}>
            <ThumbnailContainer projects={projects} selectProject={this.selectProject} />
          </div>
          <div className={`view view--viewer ${viewerIsOpen ? '-active' : ''}`}>
            {
            selectedProject &&
              <Viewer
                index={index}
                images={projects[index].images}
                title={projects[index].title}
                description={projects[index].description}
                selectProject={this.selectProject}
              />
          }
          </div>

        </>
      );
    }
    return (
      <div>Loading</div>
    );
  }
}

export default App;
