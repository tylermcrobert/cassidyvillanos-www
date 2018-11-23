export default {
  thumbnailSize: 'laptop',
  viewerSize: 'laptop',
  apiEndpoint: 'https://cassidyvillanos.prismic.io/api/v2',
  title: 'Marc-Cassidy Villanos',
  linkResolver(doc) {
    if (doc.type === 'project') return `/${doc.uid}`;
    return '/';
  },
};
