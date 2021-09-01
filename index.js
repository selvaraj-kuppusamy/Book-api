const express  = require("express");

const OurApp = express()

OurApp.get("/", (request, response) =>
{
    response.json({
        message: "Request Served!!!!"
    })
})

OurApp.listen(5000, () => console.log("server is running"))