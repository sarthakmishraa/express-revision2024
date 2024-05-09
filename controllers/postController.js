let posts = [
    {id: 1, title: "The First Post"},
    {id: 2, title: "The Second Post"},
    {id: 3, title: "The Third Post"},
    {id: 4, title: "The Fourth Post"},
    {id: 5, title: "The Fifth Post"},
    {id: 6, title: "The Sixth Post"},
    {id: 7, title: "The Seventh Post"},
    {id: 8, title: "The Eighth Post"},
    {id: 9, title: "The Nineth Post"},
    {id: 10, title: "The Tenth Post"},
    {id: 11, title: "The Eleventh Post"},
    {id: 12, title: "The Twelveth Post"}
];

// @desc Get all posts
// @route GET /api/posts
export const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
};

// @desc Get single post
// @route GET /api/posts/:id
export const getPost = (req, res, next) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((post) => post.id === postId);

    if(!post) {
        const error = new Error(`Post with id: ${postId} not found`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json(post);
};

// @desc create a new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };
    if(!newPost.title) {
        const error = new Error(`Please include a title`);
        error.status = 404;
        return next(error);
    }
    posts.push(newPost);
    res.status(201).json(posts);
};

// @desc update a post
// @route UPDATE /api/posts/:id
export const updatePost = (req, res, next) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((post) => post.id === postId);

    if(!post) {
        const error = new Error(`Post with id: ${postId} not found`);
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    res.status(200).json(post);
};

// @desc delete a post
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((post) => post.id === postId);

    if(!post) {
        const error = new Error(`Post with id:${postId} not found`);
        error.status = 404;
        return next(error);
    }

    posts = posts.filter((post) => post.id !== postId);
    res.status(200).json(posts);
};