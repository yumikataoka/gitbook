const escape = require('markdown-escape');

// Return N time a string
function ns(s, n) {
    return Array(n + 1).join(s);
}

/*
 * This module provides markup rules for gitbook-html
 * These rules are being used to generate SUMMARY/GLOSSARY/LANGS
 */
module.exports = {
    onText(text) {
        return escape(text);
    },

    onTitleStart(level) {
        return ns('#', level) + ' ';
    },
    onTitleEnd(level) {
        return this.onBL();
    },

    onParagraphStart() {
        return this.onSection();
    },
    onParagraphEnd() {
        return this.onSection();
    },

    onLinkStart() {
        return '[';
    },
    onLinkEnd(href) {
        return '](' + href + ')';
    },

    onListStart(level) {
        return '';
    },
    onListEnd() {
        return '';
    },

    onListItemStart(level) {
        return ns(' ', level * 4) + '* ';
    },
    onListItemEnd() {
        return '';
    },

    onHR() {
        return '-----';
    }
};

