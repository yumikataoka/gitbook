const fs = require('fs');
const path = require('path');
const expect = require('assert');

const glossary = require('../src').glossary;

describe('Glossary', () => {
    let LEXED;

    before(() => {
        const CONTENT = fs.readFileSync(path.join(__dirname, './fixtures/GLOSSARY.md'), 'utf8');
        LEXED = glossary(CONTENT);
    });

    it('should only get heading + paragraph pairs', () => {
        expect(LEXED.length).toBe(4);
    });

    it('should output simple name/description objects', () => {
        expect(!(LEXED.some(e => !Boolean(e.name && e.description)))).toBe(true);
    });

    it('should correctly convert it to text', () => {
        const text = glossary.toText(LEXED);
        const parsed = glossary(text);
        expect(parsed).toEqual(LEXED);
    });
});
