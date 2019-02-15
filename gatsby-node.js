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
                uid
              }
            }
          }
        }
      }
    `));

  if (!error) {
    const uids = result.data.prismicSite.data.projects.map(item => item.project.uid);

    uids.forEach((uid) => {
      createPage({
        path: uid,
        component: projectTemplate,
        context: {
          uid,
        },
      });
    });
  }
};
