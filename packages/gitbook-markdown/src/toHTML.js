const { State } = require('markup-it');
const markdown = require('markup-it/lib/markdown');
const html = require('markup-it/lib/html');

/**
 * Convert Markdown block to HTML
 *
 * @param {String} src (markdown)
 * @return {String} (html)
 */
function convertMdToHTMLBlock(src) {
    const fromMD = State.create(markdown);
    const document = fromMD.deserializeToDocument(src);

    const toHTML = State.create(html);
    return toHTML.serializeDocument(document);
}

/**
 * Convert Markdown inline to HTML
 *
 * @param {String} src (markdown)
 * @return {String} (html)
 */
function convertMdToHTMLInline(src) {
    const content  = markdown.toInlineContent(src);
    const textHtml = html.toInlineText(content);

    return textHtml;
}

module.exports = {
    block: convertMdToHTMLBlock,
    inline: convertMdToHTMLInline
};
