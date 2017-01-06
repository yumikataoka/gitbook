# APIs

- [Parsing](#parsing)
- [Manipulation](#manipulation)
- [Generation](#generation)

## Parsing

### `GitBook.Parse.parseBook`
`GitBook.Parse.parseBook(book: Book): Promise<Book>`

Parse the whole book (languages, readme, summary), it returns a complete version of the book instance.

### `GitBook.Parse.parse[Summary|Glossary|Languages]`
`GitBook.Parse.parse[X](book: Book): Promise<Book>`

Parse a specific part of the book only, it returns a book instance with the updated part.

These methods can be used in combinaison with a file watch to avoid parsing the whole books when a file is modified.

## Manipulation

### `GitBook.SummaryModifier.toText`
`GitBook.SummaryModifier.toText(summary: Summary, fileExt: String?): String`

Serialize the summary as a string, the argument `fileExt` can be used to specify the parser:

```js
const textDefault = GitBook.SummaryModifier.toText(summary);
const textAdoc = GitBook.SummaryModifier.toText(summary, '.adoc');
const textAdoc = GitBook.SummaryModifier.toText(summary, '.md');
```

### `GitBook.SummaryModifier.insertArticle`
`GitBook.SummaryModifier.insertArticle(summary: Summary, article: Article, level: String): Summary`

Insert a summary `article` after the article identified with `level`.

### `GitBook.SummaryModifier.unshiftArticle`
`GitBook.SummaryModifier.unshiftArticle(summary: Summary, article: Article): Summary`

Insert a summary `article` at the beginning of it.

### `GitBook.SummaryModifier.removeArticle`
`GitBook.SummaryModifier.removeArticle(summary: Summary, article: Article|String): Summary`

Remove an article from the summary.

## Generation

### `GitBook.Output.getGenerator`
`GitBook.Output.getGenerator(type: String): Generator`

Return a generator, `type` may be one of `["website", "json", "ebook"]`.

### `GitBook.Output.generate`
`GitBook.Output.generate(generator: Generator, book: Book): Output`

Generate a book using a generator.
