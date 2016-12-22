'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    This class is extended by gitbook-markdown and gitbook-asciidoc
    to generate back markdown/asciidoc from GitBook metadata.
*/

var ToText = function () {
    function ToText(markup) {
        _classCallCheck(this, ToText);

        Object.assign(this, markup);
    }

    // Break line


    _createClass(ToText, [{
        key: 'onBL',
        value: function onBL() {
            return '\n';
        }
    }, {
        key: 'onText',
        value: function onText(text) {
            return text;
        }
    }, {
        key: 'onHR',
        value: function onHR() {
            return '<hr />';
        }

        // ---- TITLES

    }, {
        key: 'onTitleStart',
        value: function onTitleStart(level) {
            return '<h' + level + '>';
        }
    }, {
        key: 'onTitleEnd',
        value: function onTitleEnd(level) {
            return '</h' + level + '>';
        }

        // ---- PARAGRAPHS / SECTIONS

    }, {
        key: 'onParagraphStart',
        value: function onParagraphStart() {
            return '<p>';
        }
    }, {
        key: 'onParagraphEnd',
        value: function onParagraphEnd() {
            return '</p>';
        }
    }, {
        key: 'onSection',
        value: function onSection() {
            return this.onBL();
        }

        // ---- LINKS

    }, {
        key: 'onLinkStart',
        value: function onLinkStart(href) {
            return '<a href="' + href + '">';
        }
    }, {
        key: 'onLinkEnd',
        value: function onLinkEnd(href) {
            return '</a>';
        }

        // ---- LISTS

    }, {
        key: 'onListItemStart',
        value: function onListItemStart(level) {
            return this._spaces((level + 1) * 4) + '<li>';
        }
    }, {
        key: 'onListItemEnd',
        value: function onListItemEnd(level) {
            return this._spaces((level + 1) * 4) + '</li>' + this.onBL();
        }
    }, {
        key: 'onListStart',
        value: function onListStart(level) {
            return this._spaces(level * 4) + '<ul>' + this.onBL();
        }
    }, {
        key: 'onListEnd',
        value: function onListEnd(level) {
            return this._spaces(level * 4) + '</ul>' + this.onBL();
        }

        // ------ LANGS

    }, {
        key: 'langs',
        value: function langs(languages) {
            var content = '';
            content += this.onTitleStart(1) + this.onText('Languages') + this.onTitleEnd(1);
            content += this.onSection();

            content += this._summaryArticles(languages);

            return content;
        }

        // ------ GLOSSARY

    }, {
        key: 'glossary',
        value: function glossary(_glossary) {
            var _this = this;

            var content = '';

            content += this.onTitleStart(1) + this.onText('Glossary') + this.onTitleEnd(1);
            content += this.onSection();

            _glossary.forEach(function (entry) {
                content += _this.onTitleStart(2) + _this.onText(entry.name) + _this.onTitleEnd(2);
                content += _this.onParagraphStart();
                content += _this.onText(entry.description);
                content += _this.onParagraphEnd();
                content += _this.onSection();
            });

            return content;
        }

        // ------ SUMMARY

    }, {
        key: '_summaryArticle',
        value: function _summaryArticle(article, level) {
            var content = '';

            content += this.onListItemStart(level);

            if (article.ref) content += this.onLinkStart(article.ref);
            content += this.onText(article.title);
            if (article.ref) content += this.onLinkEnd(article.ref);
            content += this.onBL();

            if (article.articles && article.articles.length > 0) {
                content += this._summaryArticles(article.articles, level + 1);
            }

            content += this.onListItemEnd(level);

            return content;
        }
    }, {
        key: '_summaryArticles',
        value: function _summaryArticles(articles, level) {
            var _this2 = this;

            var content = '';

            level = level || 0;

            content += this.onListStart(level);
            articles.forEach(function (article) {
                content += _this2._summaryArticle(article, level);
            });
            content += this.onListEnd(level);

            return content;
        }
    }, {
        key: '_summaryPart',
        value: function _summaryPart(part) {
            var content = '';

            if (part.title) content += this.onTitleStart(2) + this.onText(part.title) + this.onTitleEnd(2);

            content += this._summaryArticles(part.articles);

            return content;
        }
    }, {
        key: 'summary',
        value: function summary(_summary) {
            var _this3 = this;

            var content = '';

            content += this.onTitleStart(1) + this.onText('Summary') + this.onTitleEnd(1);
            content += this.onSection();

            _summary.parts.forEach(function (part, i) {
                var next = _summary.parts[i + 1];

                content += _this3._summaryPart(part);

                if (next && !next.title) {
                    content += _this3.onBL() + _this3.onHR() + _this3.onBL();
                } else {
                    content += _this3.onSection();
                }
            });

            return content;
        }

        // ---- Utilities

    }, {
        key: '_spaces',
        value: function _spaces(n, s) {
            return Array(n + 1).join(s || ' ');
        }
    }]);

    return ToText;
}();

module.exports = ToText;
//# sourceMappingURL=totext.js.map