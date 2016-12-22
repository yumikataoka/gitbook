
// Return N time a string
function ns(s, n) {
    return Array(n + 1).join(s);
}

module.exports = {
    onTitleStart(level) {
        return ns('=', level) + ' ';
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

    onLinkStart(href) {
        return 'link:' + href + '[';
    },
    onLinkEnd() {
        return ']';
    },

    onListStart(level) {
        return '';
    },
    onListEnd() {
        return '';
    },

    onListItemStart(level) {
        return ns('.', level + 1) + ' ';
    },
    onListItemEnd() {
        return '';
    },

    onHR() {
        return '\'\'\'';
    }
};
