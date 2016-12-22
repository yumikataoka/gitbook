const expect = require('expect');
const inline = require('../src').inline;

describe('Inline', () => {
    it('should render inline markdown', () => {
        const parsed = inline('Hello **World**');
        expect(parsed.content).toBe('Hello <strong>World</strong>');
    });
});
