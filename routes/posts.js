import express from "express";

const router = express.Router();

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

// Get all posts
router.get("/", (req, res) => {
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit>0) {
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
});

// Get single post
router.get("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((post) => post.id === postId)

    if(!post) {
        return res.status(404).json({ message: `Post with id: ${postId} not found` });
    }
    res.status(200).json(post);
});

// Create new post
router.post("/", (req, res) => {
    // console.log(req.body);
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };

    if(!newPost.title) {
        return res.status(400).json({ message: "Client error: Please include a title" });
    }

    posts.push(newPost);
    res.status(201).json(posts);
});

// Update post
router.put("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((post) => post.id === postId);

    if(!post) {
        return res.status(404).json({ message: `Post with id: ${postId} not found` })
    }

    post.title = req.body.title;
    res.status(200).json(post);
});

// Delete post
router.delete("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((post) => post.id === postId);

    if(!post) {
        return res.status(404).json({ message: `Post with id: ${postId} not found` });
    }
    posts = posts.filter((post) => post.id !== postId);
    res.status(200).json(posts);
});

export default router;