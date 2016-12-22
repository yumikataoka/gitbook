const fs = require('fs');
const path = require('path');
const expect = require('expect');

const page = require('../src').page;

describe('Page', () => {
    let LEXED;

    before(() => {
        const CONTENT = fs.readFileSync(path.join(__dirname, './fixtures/PAGE.md'), 'utf8');
        LEXED = page(CONTENT);
    });

    it('should gen content', () => {
        expect(LEXED.content).toExist();
    });

    it('should not add id to headings', () => {
        expect(page('# Hello').content).toBe('<h1>Hello</h1>');
        expect(page('# Hello {#test}').content).toBe('<h1 id="test">Hello</h1>');
    });

    it('should escape codeblocks in preparation (1)', () => {
        expect(page.prepare('Hello `world`')).toBe('Hello {% raw %}`world`{% endraw %}\n\n');
        expect(page.prepare('Hello `world test`')).toBe('Hello {% raw %}`world test`{% endraw %}\n\n');
        expect(page.prepare('Hello ```world test```')).toBe('Hello {% raw %}`world test`{% endraw %}\n\n');
        expect(page.prepare('Hello\n```js\nworld test\n```\n')).toBe('Hello\n\n{% raw %}```js\nworld test\n```\n\n{% endraw %}');
        expect(page.prepare('Hello\n```\ntest\n\tworld\n\ttest\n```')).toBe('Hello\n\n{% raw %}```\ntest\n    world\n    test\n```\n\n{% endraw %}');
    });

    it('should escape codeblocks in preparation (2)', () => {
        expect(
            page.prepare('Hello\n\n\n\tworld\n\thello\n\n\ntest')
        ).toBe(
            'Hello\n\n{% raw %}```\nworld\nhello```\n\n{% endraw %}test\n\n'
        );
        expect(
            page.prepare('Hello\n\n\n\tworld\n\thello\n\n\n')
        ).toBe(
            'Hello\n\n{% raw %}```\nworld\nhello```\n\n{% endraw %}'
        );
    });

    it('should escape codeblocks with nunjucks tags', () => {
        expect(
            page.prepare('Hello {{ "Bonjour" }} ```test```')
        ).toBe(
            'Hello {{ "Bonjour" }} {% raw %}`test`{% endraw %}\n\n'
        );
    });

    it('should escape codeblocks with nunjucks tags in {% raw %} tags', () => {
        expect(
            page.prepare('{% raw %}Hello {{ "Bonjour" }} ```test```{% endraw %}')
        ).toBe(
            '{% raw %}Hello {{ "Bonjour" }} `test`{% endraw %}\n\n'
        );
        expect(
            page.prepare('{% raw %}Hello {{ "Bonjour" }} {% raw %}{% endraw %}```test```')
        ).toBe(
            '{% raw %}Hello {{ "Bonjour" }} {% raw %}{% endraw %}{% raw %}`test`{% endraw %}\n\n'
        );
        expect(
            page.prepare('```{% raw %}Hello {{ "Bonjour" }} {% raw %}```')
        ).toBe(
            '{% raw %}`{% raw %}Hello {{ "Bonjour" }} {% raw %}`{% endraw %}\n\n'
        );

        expect(
            page.prepare('```\ntest\n```\n\n\n### Test')
        ).toBe(
            '{% raw %}```\ntest\n```\n\n{% endraw %}### Test\n\n'
        );
    });

    it('should not process math', () => {
        expect(page.prepare('Hello $world$')).toBe('Hello $world$\n\n');
        expect(page.prepare('Hello $$world$$')).toBe('Hello $$world$$\n\n');
    });
});
