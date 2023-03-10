const parseData = (xmlData) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlData, 'application/xml');
  const parseError = doc.querySelector('parsererror');

  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParsingError = true;
    throw error;
  }
  const title = doc.querySelector('title').textContent;
  const description = doc.querySelector('description').textContent;
  const postsNodes = Array.from(doc.querySelectorAll('item'));
  const items = postsNodes.map((post) => ({
    title: post.querySelector('title').textContent,
    link: post.querySelector('link').textContent,
    description: post.querySelector('description').textContent,
  }));
  return {
    feed: {
      title,
      description,
    },
    posts: items,
  };
};
export default parseData;
