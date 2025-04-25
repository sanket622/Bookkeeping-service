Deployed Base URL = https://bookkeeping-service-three.vercel.app/



📚 Library Management API Endpoints
🧑‍💼 User Routes
Register a User
POST http://localhost:8080/api/users/register

Login a User
POST http://localhost:8080/api/users/login

📖 Book Routes
Add a New Book
POST http://localhost:8080/api/books

Get All Books
GET http://localhost:8080/api/books

Get a Book by ID
GET http://localhost:8080/api/books/680a1e46ed8ef803b969ce8b

Update a Book by ID
PUT http://localhost:8080/api/books/680a1e46ed8ef803b969ce8b

Delete a Book by ID
DELETE http://localhost:8080/api/books/680a1e46ed8ef803b969ce8b

📥 Borrow & Return Routes
Borrow a Book
POST http://localhost:8080/api/borrow/

Return a Book
POST http://localhost:8080/api/return/680a1e46ed8ef803b969ce8b

🏢 Library Routes
Add a New Library
POST http://localhost:8080/api/libraries/

Get All Libraries
GET http://localhost:8080/api/libraries/

Get a Library by ID
GET http://localhost:8080/api/libraries/680b0552bce2b7a78811a61f

Update a Library by ID
PUT http://localhost:8080/api/libraries/680b0552bce2b7a78811a61f

Delete a Library by ID
DELETE http://localhost:8080/api/libraries/680b0552bce2b7a78811a61f

📦 Library Inventory
Add Book to Library Inventory
POST http://localhost:8080/api/libraries/680b0552bce2b7a78811a61f/inventory

Get Inventory of a Library
GET http://localhost:8080/api/libraries/680b0552bce2b7a78811a61f/inventory
