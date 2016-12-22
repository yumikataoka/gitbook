const fs = require('fs');
const path = require('path');
const expect = require('expect');
const langs = require('../src').langs;

describe('Languages', () => {
    let LEXED;

    before(() => {
        const CONTENT = fs.readFileSync(path.join(__dirname, './fixtures/LANGS.md'), 'utf8');
        LEXED = langs(CONTENT);
    });

    it('should detect paths and titles', () => {
        expect(LEXED.length).toEqual(2);
        expect(LEXED[0].ref).toEqual('en/');
        expect(LEXED[0].title).toEqual('English');

        expect(LEXED[1].ref).toEqual('fr/');
        expect(LEXED[1].title).toEqual('French');
    });

    it('should correctly convert it to text', () => {
        const text = langs.toText(LEXED);
        const parsed = langs(text);
        expect(parsed).toEqual(LEXED);
    });
});
