import { getPostList } from './templates/postList/index.js';
import { getPost } from './templates/postList/index.js';

export const stubs = {
    '/posts': getPostList,
    '/posts/1': getPost,
};
