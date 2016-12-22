
/*
    This class is extended by gitbook-markdown and gitbook-asciidoc
    to generate back markdown/asciidoc from GitBook metadata.
*/

class ToText {
    constructor(markup) {
        Object.assign(this, markup);
    }

    // Break line
    onBL() {
        return '\n';
    }

    onText(text) {
        return text;
    }

    onHR() {
        return '<hr />';
    }

    // ---- TITLES

    onTitleStart(level) {
        return '<h' + level + '>';
    }
    onTitleEnd(level) {
        return '</h' + level + '>';
    }

    // ---- PARAGRAPHS / SECTIONS
    onParagraphStart() {
        return '<p>';
    }
    onParagraphEnd() {
        return '</p>';
    }


    onSection() {
        return this.onBL();
    }

    // ---- LINKS
    onLinkStart(href) {
        return '<a href="' + href + '">';
    }
    onLinkEnd(href) {
        return '</a>';
    }

    // ---- LISTS
    onListItemStart(level) {
        return this._spaces((level + 1) * 4) + '<li>';
    }
    onListItemEnd(level) {
        return this._spaces((level + 1) * 4) + '</li>' + this.onBL();
    }
    onListStart(level) {
        return this._spaces(level * 4) + '<ul>' + this.onBL();
    }
    onListEnd(level) {
        return this._spaces(level * 4) + '</ul>' + this.onBL();
    }

    // ------ LANGS

    langs(languages) {
        let content = '';
        content += this.onTitleStart(1) + this.onText('Languages') + this.onTitleEnd(1);
        content += this.onSection();

        content += this._summaryArticles(languages);

        return content;
    }

    // ------ GLOSSARY

    glossary(glossary) {
        let content = '';

        content += this.onTitleStart(1) + this.onText('Glossary') + this.onTitleEnd(1);
        content += this.onSection();

        glossary.forEach((entry) => {
            content += this.onTitleStart(2) + this.onText(entry.name) + this.onTitleEnd(2);
            content += this.onParagraphStart();
            content += this.onText(entry.description);
            content += this.onParagraphEnd();
            content += this.onSection();
        });

        return content;
    }

    // ------ SUMMARY

    _summaryArticle(article, level) {
        let content = '';

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
    _summaryArticles(articles, level) {
        let content = '';

        level = level || 0;

        content += this.onListStart(level);
        articles.forEach((article) => {
            content += this._summaryArticle(article, level);
        });
        content += this.onListEnd(level);

        return content;
    }
    _summaryPart(part) {
        let content = '';

        if (part.title) content += this.onTitleStart(2) + this.onText(part.title) + this.onTitleEnd(2);

        content += this._summaryArticles(part.articles);

        return content;
    }

    summary(summary) {
        let content = '';

        content += this.onTitleStart(1) + this.onText('Summary') + this.onTitleEnd(1);
        content += this.onSection();

        summary.parts.forEach((part, i) => {
            const next = summary.parts[i + 1];

            content += this._summaryPart(part);

            if (next && !next.title) {
                content += this.onBL() + this.onHR() + this.onBL();
            } else {
                content += this.onSection();
            }

        });

        return content;
    }

    // ---- Utilities

    _spaces(n, s) {
        return Array(n + 1).join(s || ' ');
    }
}

module.exports = ToText;
