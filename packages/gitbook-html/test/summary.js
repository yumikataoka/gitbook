const fs = require('fs');
const path = require('path');
const expect = require('expect');

const summary = require('../src').summary;

describe('Summary', () => {
    let LEXED, PART;
    let LEXED_EMPTY;

    before(() => {
        const CONTENT = fs.readFileSync(
            path.join(__dirname, './fixtures/SUMMARY.html'), 'utf8');
        LEXED = summary(CONTENT);
        PART = LEXED.parts[0];

        const CONTENT_EMPTY = fs.readFileSync(
            path.join(__dirname, './fixtures/SUMMARY-EMPTY.html'), 'utf8');
        LEXED_EMPTY = summary(CONTENT_EMPTY);
    });

    describe('Parts', () => {
        it('should detect parts', () => {
            expect(LEXED.parts.length).toBe(3);
        });

        it('should detect title', () => {
            expect(LEXED.parts[0].title).toBe('');
            expect(LEXED.parts[1].title).toBe('Part 2');
            expect(LEXED.parts[2].title).toBe('');
        });

        it('should detect empty parts', () => {
            const partTitles = LEXED_EMPTY.parts.map((part) => {
                return part.title;
            });
            const expectedTitles = [
                'First empty part',
                'Part 1',
                '',
                'Empty part',
                'Part 2',
                'Penultimate empty part',
                'Last empty part'
            ];
            expect(LEXED_EMPTY.parts.length).toBe(7);
            expectedTitles.forEach((title, index) => {
                expect(partTitles[index]).toBe(title);
            });
        });
    });

    it('should detect chapters', () => {
        expect(PART.articles.length).toBe(5);
    });

    it('should detect chapters in other parts', () => {
        expect(LEXED.parts[1].articles.length).toBe(1);
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

    it('should correctly convert it to text', () => {
        const text = summary.toText(LEXED);
        const parsed = summary(text);

        expect(parsed).toEqual(LEXED);
    });
});
