const fs = require('fs');
const path = require('path');
const expect = require('expect');

const summary = require('../src').summary;

describe('Summary parsing', () => {
    let LEXED, PART;

    before(() => {
        const CONTENT = fs.readFileSync(path.join(__dirname, './fixtures/SUMMARY.adoc'), 'utf8');
        LEXED = summary(CONTENT);
        PART = LEXED.parts[0];
        // todo: add support for parts in asciidoc
    });

    it('should detect parts', () => {
        expect(LEXED.parts.length).toBe(1);
    });

    it('should detect articles', () => {
        expect(PART.articles.length).toBe(5);
    });

    it('should support articles', () => {
        expect(PART.articles[0].articles.length).toBe(2);
        expect(PART.articles[1].articles.length).toBe(0);
        expect(PART.articles[2].articles.length).toBe(0);
    });

    it('should detect paths and titles', () => {
        expect(PART.articles[0].ref).toExist();
        expect(PART.articles[1].ref).toExist();
        expect(PART.articles[2].ref).toExist();
        expect(PART.articles[3].ref).toExist();
        expect(PART.articles[4].ref).toBe(null);

        expect(PART.articles[0].title).toExist();
        expect(PART.articles[1].title).toExist();
        expect(PART.articles[2].title).toExist();
        expect(PART.articles[3].title).toExist();
        expect(PART.articles[4].title).toExist();
    });

    it('should normalize paths from .md', () => {
        expect(PART.articles[0].ref).toBe('chapter-1/README.adoc');
        expect(PART.articles[1].ref).toBe('chapter-2/README.adoc');
        expect(PART.articles[2].ref).toBe('chapter-3/README.adoc');
    });

    it('should correctly convert it to text', () => {
        const text = summary.toText(LEXED);
        const parsed = summary(text);
        expect(parsed).toEqual(LEXED);
    });
});
