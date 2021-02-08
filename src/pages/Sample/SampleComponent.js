import React, { memo } from 'react';

const SampleComponent = memo(({ postList, content }) => (
    <div>
        {content.postListHeader}
        <ul>
            {postList &&
                postList.map((post) => <li key={post.id}>{post.title}</li>)}
        </ul>
    </div>
));

export { SampleComponent };
