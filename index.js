const { response } = require("express");
const express  = require("express");

//database
const Database = require("./database")



//Initialization
const OurApp = express()

OurApp.use(express.json());

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
OurApp.get("/book", (req, res) => {
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
 OurApp.get("/book/s/:bookID", (req,res) =>
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


//Route -/author
//Des  - To getall author
//Access - Public
//Method - GET
//Params - none
//Body  -none

OurApp.get("/author", (req, res) => {
    return res.json({
         author: Database.Author     
     });
 });


//Route         /book/new
//Desceiption   add new book
//Access        Public 
//parameters    none
//method        POST
OurApp.post("/book/new", (req,res) => {
    console.log(req.body);
   return res.json({message: "Book Added Succesfully"});
});

//Route         /author/new
//Desceiption   add new author
//Access        Public 
//parameters    none
//method        POST

OurApp.post("/author/new", (req ,res) => {
    const { newAuthor } = req.body;
    console.log(newAuthor);
    return res.json({ message: "author was added" });
});


OurApp.post('/publication/new', (req,res) => {
    const publication = req.body;
    console.log(publication);
    return res.json({message: "publication added"})

});

OurApp.listen(3000, () => console.log("server is running"));

