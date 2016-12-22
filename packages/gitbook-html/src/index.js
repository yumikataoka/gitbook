const ToText = require('./totext');

const htmlParser = {
    summary: require('./summary'),
    glossary: require('./glossary'),
    langs: require('./langs'),
    readme: require('./readme'),
    page: require('./page')
};

// Compose a function with a transform function for the first argument only
function compose(toHTML, fn) {
    return (...args) => {
        args[0] = toHTML(args[0]);
        return fn(...args);
    };
}

/**
 * Create a GitBook parser from an HTML converter.
 * @param  {Object} toHTML
 *         {Function} [toHTML.inline]
 *         {Function} [toHTML.block]
 * @param  {Object} toText
 * @return {[type]}        [description]
 */
function createParser(toHTML, toText = {}) {
    const parser = {
        summary: compose(toHTML.block, htmlParser.summary),
        glossary: compose(toHTML.block, htmlParser.glossary),
        langs: compose(toHTML.block, htmlParser.langs),
        readme: compose(toHTML.block, htmlParser.readme),
        page: compose(toHTML.block, htmlParser.page),
        inline: compose(toHTML.inline, htmlParser.page)
    };

    const _toText = new ToText(toText);

    parser.summary.toText  = summary => _toText.summary(summary);
    parser.langs.toText    = langs => _toText.langs(langs);
    parser.glossary.toText = glossary => _toText.glossary(glossary);

    return parser;
}

module.exports = createParser({
    block:  html => html,
    inline: html => html
});
module.exports.createParser = createParser;
