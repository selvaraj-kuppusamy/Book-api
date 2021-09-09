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
    const { newBook} = req.body;
   
    Database.Book.push(newBook);
   return res.json({message: "Book Added Succesfully"});
});

//Route         /author/new
//Desceiption   add new author
//Access        Public 
//parameters    none
//method        POST

OurApp.post("/author/new", (req ,res) => {
    const { newAuthor } = req.body;
    Database.Book.push(newAuthor);
    return res.json({ message: "author was added" });
});


//TODO: Student task
OurApp.post('/publication/new', (req,res) => {
    const publication = req.body;
    console.log(publication);
    return res.json({message: "publication added"})

});


//Route         /book/update
//Desceiption   update any details of the book
//Access        Public 
//parameters    ISBN
//method        PUT

OurApp.put("/book/update/:isbn", (req,res) =>
{
    const { updatedBook } = req.body;
    const { isbn } = req.params;

 const book =  Database.Book.map((book) => {
        if(book.ISBN === isbn) {
            return{ ...book, ...updatedBook };
        }
        return book;
    });
    return res.json(book);
});

//Route         /bookAuthor/update/:isbn
//Desceiption   add new author to a book
//Access        Public 
//parameters    ISBN
//method        PUT



OurApp.put("/bookAuthor/update/:isbn", (req,res) =>
{
    const { newAuthor } = req.body;
    const { isbn } = req.params;
    const book = Database.Book.map((book) => 
    {
        if(book.ISBN === isbn) {
        if(!book.authors.includes(newAuthor))
        {
        return book.authors.push(newAuthor)
        }
        return newAuthor;
    }

    return book;
    });



    const author = Database.Book.map((author) => {
        if(author.id===newAuthor)
        {
            if(!author.id===newAuthor){
                return book.authors.push(isbn);
            }
            return author;
        }
return author;

    });
    return res.json({book: book, author: author});
})

//TODO: Student Task
//Route         /author/update
//Desceiption    update any details of the author
//Access        Public 
//parameters    req.body is always a string format
//method        PUT

OurApp.put('/author/update/:id', (req,res) => {
const { updateAuthor}   = req.body;
const {id} = req.params;

 const author = Database.Author.map((author) => {
    if(author.id === parseInt(id))
    {
        return { ...author, ...updateAuthor };
    }
    return author;
});
    return res.json(author);
});


//Route         /book/delete/:isbn
//Desceiption   delete a book
//Access        Public 
//parameters    isbn
//method        DELETE
OurApp.delete("/book/delete/:isbn", (req ,res) => {
    const { isbn } = req.params;
    const filteredBooks = Database.Book.filter((book) =>
        book.ISBN !== isbn
    );
    Database.Book = filteredBooks
    return res.json(Database.Book);
})


//Route         /book/deleter/author
//Desceiption   delete an author from a book
//Access        Public 
//parameters    id,json
//method        DELETE


OurApp.delete('/book/delete/author/:isbn/:id', (req,res) => 
{
    const { isbn , id } = req.params;
    //updating book database object
    Database.Book.forEach((book) => 
    {
        if(book.ISBN === isbn)
        {
            if(!book.authors.includes(parseInt(id)))
            {
                return book;
            }
            book.authors = book.authors.filter((databaseid) => databaseid !== parseInt(id));
            return book;
        }
        return book;
    });
    Database.Author.forEach((author) => {
        if(author.id ===parseInt(id))
        {
            if(!author.books.includes(isbn))
            {
                return;
            }
            author.books = author.books.filter((book)=> book!==isbn);
            return author;
        }
        return author;
    });
    return res.json({book: Database.Book, author: Database.Author});
});

OurApp.listen(3000, () => console.log("server is running"));

