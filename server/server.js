const express = require("express");
// const fileUpload = require("express-fileupload");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});
const port = process.env.port || 9000;
const connection = require("./connection/connection");
const auth = require("./routers/auth");
const profile = require("./routers/profile");
const search = require("./routers/searchUser");
const letter = require("./routers/sendLetter");
const permissions = require("./routers/permissions");
const drafts = require("./routers/drafts");

/*
    inbuilt middleware of express
*/
// app.use(fileUpload,{useTempFiles : true});
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use("/api/user/",auth);
app.use("/api/profile",profile);
app.use("/api/search",search);
app.use("/api/Letter/",letter);
app.use("/api/permissions",permissions);
app.use("/api/drafts",drafts);

//routers

app.listen(port, ()=>{console.log(`You are running on port : ${port}`)});
