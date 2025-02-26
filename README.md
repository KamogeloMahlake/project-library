# Project Library

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Git](https://git-scm.com/) for version control

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KamogeloMahlake/project-library.git
   ```
2. Navigate to the project directory:
   ```bash
   cd project-library
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the development server, run:
```bash
npm start
```

## API Routes

The following API routes are available:

### `GET /api/books`
- Retrieves an array of book objects.
- Response format: 
  ```json
  [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  ```

### `POST /api/books`
- Adds a new book with a specified title.
- If the `title` is missing, the response will be "missing required field title".
- Response contains the new book object including at least `_id` and `title`.

### `DELETE /api/books`
- Deletes all books.
- Response: "complete delete successful".

### `GET /api/books/:id`
- Retrieves a book by its ID.
- If the book does not exist, the response will be "no book exists".
- Response format: 
  ```json
  {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
  ```

### `POST /api/books/:id`
- Adds a comment to a book by its ID.
- If the `comment` is missing, the response will be "missing required field comment".
- If the book does not exist, the response will be "no book exists".
- Response format is the same as `GET /api/books/:id`.

### `DELETE /api/books/:id`
- Deletes a book by its ID.
- If the book does not exist, the response will be "no book exists".
- Response: "delete successful".

## Acknowledgements

This project is based on the [freeCodeCamp boilerplate](https://github.com/freeCodeCamp/boilerplate-project-library).
