# Parsing GitBook in the browser

The GitBook core API can be integrated in applications running in a browser environment (web application or Electon). One good example is the official [GitBook Editor](https://www.gitbook.com/editor), built using Electon and the GitBook core library.

The `gitbook` package can be imported during a browserify/webpack build. Only the parsing components will be bundled. **Generating an output** is not possible on a browser environment.

### Mocking the filesystem

Since books are a composition of multiple files in a directory, the parsing requires some kind of filesystem interface.

On a node.js environment, GitBook provides a method to create the right interface: `GitBook.createNodeFS(bookFolder: String): FS`.

On a browser application, the interface depends mostly on your application design.

```js

const appFS = GitBook.FS.create({
    // (String): Boolean
    fsExists(filePath) {
        ...
    },
    // (String): Buffer
    fsReadFile(filePath) {
        ...
    },
    // (String): { mtime: Date }
    fsStatFile(filePath) {
        ...
    },
    // (String): Array<String>
    fsReadDir(filePath) {
        ...
    }
});
```

[Checkout the core FS interfaces](https://github.com/GitbookIO/gitbook/tree/master/packages/gitbook/src/fs) for greater example.
