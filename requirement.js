/*

Requirements

Book
    -ISBN           -string
    -Title          -string
    -Author         -[Number]
    -Language       -[Number]
    -Publications   -Number
    -NumberOfPages  -Number
    -Categories     -[String]
Author
    -id         -number
    -name       -string
    -books       -[string]


Publications
     -id         -number
    -name       -string
    -books       -[string]

--------APIs----------
Books
- GET
    -to get all books
    -to get specific books
    -to get a list of based on category
    -to get a list of books based on author
- POST
    -to add new book
- PUT
    -to update book details
    -to update/add new book
    
-DELETE
    -delete a book
    -delete an author from the book


Authors

- GET
    -to get all authors
    -to get specific author
    -to get list of author based on a book

- POST
    -to add new auhtor
    -to update/add new book    

- PUT 
    -update author details

- DELETE
    -delete an author


Publication
- GET
    -to get all publication
    -to get specific publication
    to get a list of publication based on book
- POST
    - add new publication
- PUT 
    - update publication
     -to update/add new publish

- DELETE
    -delete a book from publication
    -delete a publication


*/