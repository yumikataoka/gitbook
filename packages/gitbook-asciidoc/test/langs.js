const fs = require('fs');
const path = require('path');
const expect = require('expect');

const langs = require('../src').langs;

describe('Languages parsing', () => {
    let LEXED;

    before(() => {
        const CONTENT = fs.readFileSync(path.join(__dirname, './fixtures/LANGS.adoc'), 'utf8');
        LEXED = langs(CONTENT);
    });

    it('should detect paths and titles', () => {
        expect(LEXED[0].ref).toBe('en/');
        expect(LEXED[0].title,'English');

        expect(LEXED[1].ref).toBe('fr/');
        expect(LEXED[1].title).toBe('French');
    });

    it('should correctly convert it to text', () => {
        const text = langs.toText(LEXED);
        const parsed = langs(text);
        expect(parsed).toEqual(LEXED);
    });
});
