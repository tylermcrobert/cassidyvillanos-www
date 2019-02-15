const path = require('path');

const wrapper = promise => promise
  .then(result => ({ result, error: null }))
  .catch(error => ({ error, result: null }));


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const projectTemplate = path.resolve('src/templates/Project/Project.js');

  const { error, result } = await wrapper(graphql(`
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
                        localFile {
                          relativePath
                        }
                        desktop{
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
      }
    `));

  if (!error) {
    const projects = result.data.prismicSite.data.projects.map((item) => {
      const projData = item.project.document[0];
      return {
        uid: projData.uid,
        images: projData.data.images.map(img => img.image.desktop.url),
        title: projData.data.title.text,
        rawData: projData,
      };
    });

    projects.forEach(({ uid }, i) => {
      createPage({
        path: uid,
        component: projectTemplate,
        context: {
          pathSlug: uid,
          data: projects[i],
        },
      });
    });
  }
};
