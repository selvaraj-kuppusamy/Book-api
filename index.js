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

//Route -/booko get all books
//Des  - To get all books
//Access - Public
//Method - GET
//Params - BookID
//Body  -none
OurApp.get("/book", (req,res) => {
   return res.json({
        books: Database.Book       
    });
});

//Route -/book/:bookID
//Des  - To get book based on ISBN
//Access - Public
//Method - GET
//Params - BookID
//Body  -none
 OurApp.get("/book/:bookID", (req,res) =>
{
    const getBook = Database.Book.filter(
        (book)=>book.ISBN === req.params.bookID
    );
    return res.json({book: getBook });
});

//Route -/book/c/:category
//Des  - To get a list of books based on category
//Access - Public
//Method - GET
//Params - BookID
//Body  -none

OurApp.get("/book/c/:category",(req, res)=>{
    const getBook = Database.Book.filter(
        (book)=>book.category.includes(req.params.category)
    );
    return res.json({book: getBook });

});

OurApp.listen(5000, () => console.log("server is running"));

