import React from 'react';

const ProjectThumbnail = ({
  title, image, date, description,
}) => (
  <ul>
    <li>Title: {title}</li>
    <li><img src={image} alt={`${title} — Cassidy Villanos`} /></li>
    <li>date: {date}</li>
    <li>description: {description}</li>
  </ul>
);

ProjectThumbnail.defaultProps = {
  title: 'title',
  image: null,
  date: null,
  description: null,
};

export default ProjectThumbnail;
