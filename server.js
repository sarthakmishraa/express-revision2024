import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__filename);
// console.log(__dirname);

// ----------------------------------------------------

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

// When we use static folder, we do not have to write code for each file and each route
// we do not have express.static method takes care of it
// Eg - if i navigate to localhost:3001/about.html, I can access the about page
// without defining its route

// ----------------------------------------------------

// app.get("/", (req, res) => {
//     // res.send("<h1>Hello world</h1>");
//     // res.send("Hello world");
//     res.send({ message: "Home Page" });
// });

// app.get("/about", (req, res) => {
//     res.send({ message: "About Page" })
// });

// ----------------------------------------------------

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// ----------------------------------------------------

// let posts = [
//     {id: 1, title: "The First Post"},
//     {id: 2, title: "The Second Post"},
//     {id: 3, title: "The Third Post"},
//     {id: 4, title: "The Fourth Post"},
//     {id: 5, title: "The Fifth Post"},
//     {id: 6, title: "The Sixth Post"},
//     {id: 7, title: "The Seventh Post"},
//     {id: 8, title: "The Eighth Post"},
//     {id: 9, title: "The Nineth Post"},
//     {id: 10, title: "The Tenth Post"},
//     {id: 11, title: "The Eleventh Post"},
//     {id: 12, title: "The Twelveth Post"}
// ];

// // get all posts
// app.get("/api/posts", (req, res) => {
//     // console.log(req.query);

//     const limit = parseInt(req.query.limit);
//     if(!isNaN(limit) && limit>0) {
//         return res.status(200).json(posts.slice(0, limit))
//     }
//     res.status(200).json(posts);
// });

// // get one post
// app.get("/api/posts/:id", (req, res) => {
//     const postId = parseInt(req.params.id);
//     const post = posts.find((post) => post.id === postId);

//     if(!post) {
//         return res.status(404).json({ message: `Post with id: ${postId} not found` });
//     }
//     res.status(200).json(post);

// });

// ----------------------------------------------------

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Routes
app.use("/api/posts", posts);

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));