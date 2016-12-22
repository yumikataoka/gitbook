const fs = require('fs');
const path = require('path');
const expect = require('expect');

const summary = require('../src').summary;

function lex(fixtureFile) {
    return summary(
        fs.readFileSync(
            path.join(__dirname, 'fixtures', fixtureFile),
            'utf8'
        )
    );
}

describe('Summary', () => {
    let LEXED, PART;

    before(() => {
        LEXED = lex('SUMMARY.md');
        PART = LEXED.parts[0];
    });

    it('should detect chapters', () => {
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
        expect(PART.articles[4].ref).toNotExist();

        expect(PART.articles[0].title).toExist();
        expect(PART.articles[1].title).toExist();
        expect(PART.articles[2].title).toExist();
        expect(PART.articles[3].title).toExist();
        expect(PART.articles[4].title).toExist();
    });

    it('should normalize paths from .md', () => {
        expect(PART.articles[0].ref).toBe('chapter-1/README.md');
        expect(PART.articles[1].ref).toBe('chapter-2/README.md');
        expect(PART.articles[2].ref).toBe('chapter-3/README.md');
    });

    it('should part parts', () => {
        const l = lex('SUMMARY_PARTS.md');
        expect(l.parts.length).toBe(3);
    });

    it('should allow lists separated by whitespace', () => {
        const l = lex('SUMMARY_WHITESPACE.md');
        expect(l.parts[0].articles.length).toBe(5);
    });

    it('should allow ignore empty entries', () => {
        const l = lex('SUMMARY_EMPTY.md');
        expect(l.parts[0].articles.length).toBe(1);
    });

    it('should correctly convert it to text', () => {
        const text = summary.toText(LEXED);
        const parsed = summary(text);
        expect(parsed).toEqual(LEXED);
    });
});
