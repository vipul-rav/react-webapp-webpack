import { getPostList , getPost } from "./templates/postList/index.js";

export const stubs = {
    "/posts": getPostList,
    "/posts/1": getPost,
};
