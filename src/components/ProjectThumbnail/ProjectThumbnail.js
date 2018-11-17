import React from 'react';
import './ProjectThumbnail.css';

const ProjectThumbnail = ({
  title, image, description,
}) => (
  <div className="thumbnails__thumbnail">
    <h1>{title}</h1>
    <div>
      <img src={image} alt={`${title} — Cassidy Villanos`} />
    </div>
    <div>{description}</div>
  </div>
);

ProjectThumbnail.defaultProps = {
  title: 'title',
  image: null,
  date: null,
  description: null,
};

export default ProjectThumbnail;
