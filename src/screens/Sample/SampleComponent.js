import React, { memo } from 'react';
import PropTypes from 'prop-types';

const SampleComponent = memo(({ postList, content }) => (
  <div>
    {content.postListHeader}
    <ul>{postList && postList.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
  </div>
));

SampleComponent.propTypes = {
  postList: PropTypes.array,
  content: PropTypes.shape({
    postListHeader: PropTypes.string
  })
};

export { SampleComponent };
