const { response } = require("express");
const express  = require("express");

//database
const Database = require("./database")

//Initialization
const OurApp = express()

OurApp.get("/", (request, response) =>
{
    response.json({
        message: "server is working!!!"
    })
})

OurApp.get("/book", (req,res) => {
   return res.json({
        books: Database.Book       
    });
});
OurApp.listen(5000, () => console.log("server is running"))