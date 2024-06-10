const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog")

const app = express();

// dbURI for mongodb
const dbURI = "mongodb+srv://za:test1234@zadb.dabz96b.mongodb.net/";

mongoose.connect(dbURI)
     .then((result) => {app.listen(1410); console.log("connected to the db")})
     .catch((err)=> console.log(err))
// middleware to server static files
app.use(express.static("static"));
// middleware for enabling recieving data from the form on the frontend;
app.use(express.urlencoded({extended: true}))
// register view engine for creating templates
app.set("view engine", "ejs")
app.get("/add-blog", (req, res)=>{
     const blog = new Blog({
          title: "Newest post",
          content: "This is the latest blogpost"
     })
     blog.save()
     .then((result)=>{
          res.send(result)
     })
     .catch((err)=> console.log(err))
})
app.get("/", (req, res)=>{
     // it is just like the res.send or res.sendFile, but in this case for view engines, there is also no need to add the extension cause we have included the ejs
     // res.render("index", {title: "This is a blogging application", blogs});
     res.redirect("/blogs")
})
app.get("/blogs", (req, res)=>{
     Blog.find().sort({createdAt: -1})
     .then((result)=>{
          res.render("index", {title: "All blogs", blogs: result})
     })
     .catch((err)=>console.log("error:" + err))
})
app.get("/about", (req, res)=>{
     // it is just like the res.send or res.sendFile, but in this case for view engines, there is also no need to add the extension cause we have included the ejs
     res.render("about");
})
app.get("/blogs/create", (req, res)=>{
     res.render("create")
})
// create or post data
app.post("/blogs", (req, res)=>{
     const blog = new Blog(req.body);
     blog.save()
     .then((result)=>{
          res.redirect("/")
     })
     .catch((err)=> console.log(err))
})
app.delete("/blogs/:id", (req, res)=>{
     const id = req.params.id;
     Blog.findByIdAndDelete(id)
     .then((response)=>{
          res.json({redirect: "/blogs"})
     })
})
app.get("/blogs/:id", (req, res)=>{
     const id = req.params.id;
     Blog.findById(id)
     .then((result)=>{
          res.render("./partials/blogDetails", {title: result.title, content: result.content, id: result._id})
     })
})
app.use((req, res)=>{
     res.render("404")
})