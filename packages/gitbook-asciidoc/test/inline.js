const expect = require('expect');

const inline = require('../src').inline;

describe('Inline', () => {
    it('should render inline AsciiDoc', () => {
        const parsed = inline('Hello **World**');
        expect(parsed.content).toEqual('Hello <strong>World</strong>');
    });
});
