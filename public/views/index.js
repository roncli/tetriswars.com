/**
 * @typedef {import("../../types/browser/viewTypes").IndexViewParameters} ViewTypes.IndexViewParameters
 */

// MARK: class IndexView
/**
 * A class that represents the general website template.
 */
class IndexView {
    // MARK: static get
    /**
     * Gets the rendered page template.
     * @param {ViewTypes.IndexViewParameters} data The data to render the page with.
     * @returns {string} An HTML string of the page.
     */
    static get(data) {
        const {head, title, html, protocol, host, originalUrl, year, version} = data;

        return /* html */`
            <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="robots" content="index,follow" />
                    <meta name="theme-color" content="#061e70" />
                    <meta name="description" content="Play 8-player classic Tetris events with other players online in real-time!" />
                    <meta name="keywords" content="tetris, nes tetris, nintendo tetris, classic tetris, tetris wars, tetris online, multiplayer tetris, tetris tournaments" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="og:description" content="Play 8-player classic Tetris events with other players online in real-time!" />
                    <meta name="og:title" content="Classic Tetris Wars" />
                    <meta name="og:type" content="website" />
                    <meta name="og:url" content="${protocol}://${host}${encodeURI(originalUrl)}" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:creator" content="@roncli" />
                    <link rel="canonical" content="${protocol}://${host}${encodeURI(originalUrl)}" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png" />
                    <link rel="icon" type="image/png" sizes="48x48" href="/images/favicon-48.png" />
                    <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96.png" />
                    <link rel="icon" type="image/png" sizes="128x128" href="/images/favicon-128.png" />
                    <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192.png" />
                    <link rel="icon" type="image/png" sizes="256x256" href="/images/favicon-256.png" />
                    <link rel="icon" type="image/png" sizes="512x512" href="/images/favicon-512.png" />
                    <link rel="apple-touch-icon" href="/images/favicon-180.png" />
                    <title>${title ? `${title} | ` : ""}Classic Tetris Wars</title>
                    ${head}
                </head>
                <body>
                    <div id="header">
                        <img src="/images/logo-128.png" alt="Classic Tetris Wars Logo" id="headerlogo" />
                        <div id="headertext">
                            <h1>Classic Tetris Wars</h1><br />
                            <h2>8-Player Tetris Matches</h2>
                        </div>
                    </div>
                    <div id="body">
                        ${html}
                    </div>
                    <div id="footer">
                        Website Version ${version}, ©${year > 2026 ? "2026-" : ""}${year} roncli Productions<br />
                        Classic Tetris Wars, ©2021-${year} Dan Woods<br />
                        Bugs? <a href="https://github.com/roncli/tetriswars.com/issues" target="_blank">Report on GitHub</a>
                    </div>
                </body>
            </html>
        `;
    }
}

if (typeof module === "undefined") {
    window.IndexView = IndexView;
} else {
    module.exports = IndexView;
}
