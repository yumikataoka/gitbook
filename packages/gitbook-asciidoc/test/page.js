const fs = require('fs');
const path = require('path');
const expect = require('expect');

const page = require('../src').page;

describe('Page parsing', () => {
    let LEXED;

    before(() => {
        const CONTENT = fs.readFileSync(path.join(__dirname, './fixtures/PAGE.adoc'), 'utf8');
        LEXED = page(CONTENT);
    });

    it('should gen content', () => {
        expect(LEXED.content).toExist();
    });
});
