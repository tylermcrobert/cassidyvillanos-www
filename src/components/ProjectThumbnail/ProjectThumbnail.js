import React from 'react';
import './ProjectThumbnail.scss';

const ProjectThumbnail = ({
  title, image,
}) => (
  <div className="thumbnails__thumbnail">
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
