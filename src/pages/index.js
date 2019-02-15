import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export default () => {
  const projectsQuery = useStaticQuery(graphql`
    {
      prismicSite {
        data {
          site_name
            projects{
              project{
                document {
                  uid
                  data{
                    title{
                      text
                    }
                    images{
                      image{
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
  `).prismicSite.data.projects.map((item) => {
    const projData = item.project.document[0];
    return {
      uid: projData.uid,
      image: projData.data.images[0].image.url,
      title: projData.data.title.text,
    };
  });

  console.log(projectsQuery);

  return (
    <Index projects={projectsQuery} />
  );
};


function Index({ projects }) {
  return projects.map(({ uid, image, title }) => (
    <a key={uid} href={`#${uid}`}>
      <img src={image} alt="" width={200} />
      {title}
    </a>
  ));
}
