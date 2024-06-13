require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./router/blogRouter");

const app = express();

// dbURI for mongodb
const dbURI = process.env.MONGODB_URI;

// connect to db and start app
mongoose.connect(dbURI)
     .then(() => {app.listen(process.env.PORT); console.log("connected to the db")})
     .catch((err)=> console.log(err))
app.use(express.static("static"));
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
     res.redirect("/blogs")
})

app.get("/about", (req, res) => {
     res.render("about");
})

app.use((req, res)=>{
     res.render("404")
})
//blogs router
app.use("/blogs", blogRouter)