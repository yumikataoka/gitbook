const fs = require('fs');
const path = require('path');
const expect = require('expect');

const readme = require('../src').readme;

describe('Readme', () => {
    let LEXED;

    before(() => {
        const CONTENT = fs.readFileSync(path.join(__dirname, './fixtures/README.md'), 'utf8');
        LEXED = readme(CONTENT);
    });

    it('should contain a title', () => {
        expect(LEXED.title).toExist();
    });

    it('should contain a description', () => {
        expect(LEXED.description).toExist();
    });

    it('should extract the right title', () => {
        expect(LEXED.title).toBe('This is the title');
    });

    it('should extract the right description', () => {
        expect(LEXED.description).toBe('This is the book description.');
    });
});
