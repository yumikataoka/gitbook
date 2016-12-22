const asciidoctor = require('asciidoctor.js')();

/**
 * Render Asciidoc to HTML (block)
 * @param  {String} content
 * @return {String} html
 */
function asciidocToHTML(content) {
    return asciidoctor.convert(content, {'attributes': 'showtitle'});
}

/**
 * Render Asciidoc to HTML (inline)
 * @param  {String} content
 * @return {String} html
 */
function asciidocToHTMLInline(content) {
    return asciidoctor.convert(content, {doctype: 'inline', attributes: 'showtitle'});
}

module.exports = {
    block: asciidocToHTML,
    inline: asciidocToHTMLInline
};
