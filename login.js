const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/web",express.static("web"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YourRootPassword",
    database: "nodejs"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/dashboard");
        } else {
            res.redirect("/login.html");
        }
        res.end();
    })
})

// when login is success
app.get("/dashboard",function(req,res){
    res.sendFile(__dirname + "/dashboard.html")
})

app.get("/login",function(re,res)
{
    res.sendFile(__dirname +"/login.html")
})

// set app port 
app.listen(30001);