import React from 'react';
import { graphql } from 'gatsby';

export default ({ data }) => {
  const images = data.prismicSite.data.projects
    .map(item => item.project.document[0].data.images
      .map(img => img.image.localFile.childImageSharp.mobile.src));

  console.log(images[0]);
  return (
    <div>
      {images.map(set => set.map(img => <img key={img} src={img} alt="" />))}
    </div>
  );
};

export const projectsQuery = graphql`
{
  prismicSite {
    data {
      projects {
        project {
          document {
            data {
              images {
                image {
                  localFile {
                    childImageSharp {
                      mobile: resize(width: 50 quality:70) {
                        src
                      }
                      desktop: fixed(width: 1200 quality:100) {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
