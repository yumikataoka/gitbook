# Using GitBook programmatically

GitBook is mainly designed to work as a command line utility, but it can also be integrated into javascript application (Node.js or browser).

Its API can be used for parsing a book, modifying the structure of a book, or generating outputs.

### Installation

```
$ npm install gitbook
```

### Design

The GitBook Core API is built around **promises** and **immutable** models.

### Example

```js
const GitBook = require('gitbook');

// Create a filesystem interface
const fs = GitBook.createNodeFS(__dirname + '/mybook');

// Create a book instance
const book = GitBook.Book.createForFS(fs);

// Parse it
GitBook.Parse.parseBook(book)
.then(newBook => {
    console.log('Done!');
})
```
