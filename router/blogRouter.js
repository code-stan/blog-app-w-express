const express = require('express');
const { sendBlogPosts, renderCreateBlogPage, getAllBlogs, deleteASingleBlogPost, getSingleBlog } = require('../controllers/blogController');


const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs)
blogRouter.get("/create", renderCreateBlogPage)
blogRouter.post("/", sendBlogPosts)
blogRouter.delete("/:id", deleteASingleBlogPost)
blogRouter.get("/:id", getSingleBlog)

module.exports = blogRouter;