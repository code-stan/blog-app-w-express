const Blog = require("../models/blog");

// Redirect to create blog Post
const renderCreateBlogPage = (req, res) => {
    res.render("create")
}

// Get all blog data
const getAllBlogs = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "All blogs", blogs: result })
        })
        .catch((err) => console.log("error:" + err))
}

// Get a single blog
const getSingleBlog = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render("./partials/blogDetails", { title: result.title, content: result.content, id: result._id })
        })
}
// Send blog posts
const sendBlogPosts = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect("/")
        })
        .catch((err) => console.log(err))
}
const deleteASingleBlogPost = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((response) => {
            res.json({ redirect: "/blogs" })
        })
}
module.exports = {
    renderCreateBlogPage,
    getAllBlogs,
    getSingleBlog,
    sendBlogPosts,
    deleteASingleBlogPost
}