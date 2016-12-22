const { State, Block, BLOCKS } = require('markup-it');
const { Document } = require('slate');
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
    const fromMD = State.create(markdown);
    const document = fromMD.deserializeToDocument(src);

    // Create a document with a single unstyled node
    const newDocument = Document.create({
        nodes: [
            Block.create({
                type: BLOCKS.TEXT,
                nodes: document.nodes.get(0).nodes
            })
        ]
    });

    const toHTML = State.create(html);
    return toHTML.serializeDocument(newDocument);
}

module.exports = {
    block: convertMdToHTMLBlock,
    inline: convertMdToHTMLInline
};
