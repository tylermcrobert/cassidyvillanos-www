import React from 'react';
import { RichText } from 'prismic-reactjs';
import ProjectThumbnail from 'components/ProjectThumbnail/ProjectThumbnail';

const Thumbnails = ({
  selectProject, projects,
}) => (
  <div className="thumbnails">
    { projects.map((result) => {
      const { uid, title, thumbnail } = result;
      return (
        <ProjectThumbnail
          title={RichText.asText(title)}
          image={thumbnail.mobile.url}
          uid={uid}
          key={uid}
          selectProject={() => selectProject(uid)}
        />);
    })}
  </div>
);

export default Thumbnails;
