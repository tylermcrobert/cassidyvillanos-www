import React from 'react';
import { RichText } from 'prismic-reactjs';
import ProjectThumbnail from 'components/ProjectThumbnail/ProjectThumbnail';

const Thumbnails = ({
  selectProject, projects,
}) => {
  const thumbnails = projects.map((result) => {
    const { uid, title } = result;
    const getThumbnail = () => {
      const img = result.images[0];
      if (img) {
        return (img.mobile) ? img.mobile.url : img.url;
      }
      return null;
    };
    return (
      <ProjectThumbnail
        title={RichText.asText(title)}
        image={getThumbnail()}
        uid={uid}
        key={uid}
        selectProject={() => selectProject(uid)}
      />);
  });

  return (
    <div className="thumbnails">
      {thumbnails}
    </div>
  );
};

export default Thumbnails;
