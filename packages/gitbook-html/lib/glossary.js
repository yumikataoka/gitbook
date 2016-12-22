'use strict';

var dom = require('./dom');

/**
 * Parse an HTML content into a list of glossary entry.
 *
 * @param {String} html
 * @return {Array} entries
 */
function parseGlossary(html) {
    var $ = dom.parse(html);

    var entries = [];

    $('h2').each(function () {
        var $heading = $(this);
        var $next = $heading.next();
        var $p = $next.is('p') ? $next.first() : $next.find('p').first();

        var entry = {};

        entry.name = $heading.text();
        entry.description = $p.text();

        entries.push(entry);
    });

    return entries;
}

module.exports = parseGlossary;
//# sourceMappingURL=glossary.js.map