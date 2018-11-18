import React from 'react';
import './Thumbnail.scss';

const ProjectThumbnail = ({
  title, image, selectProject,
}) => (
  <div className="thumbnails__thumbnail" onClick={selectProject}>
    <div>
      <img src={image} alt={`${title} — Cassidy Villanos`} />
    </div>
    <p>{title}</p>
  </div>
);

ProjectThumbnail.defaultProps = {
  title: 'title',
  image: null,
};

export default ProjectThumbnail;
