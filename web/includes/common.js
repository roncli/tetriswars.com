/**
 * @typedef {import("../../types/node/commonTypes").Files} CommonTypes.Files
 * @typedef {import("express").Request} Express.Request
 */

const HtmlMinifierTerser = require("html-minifier-terser"),
    IndexView = require("../../public/views/index"),
    Minify = require("@roncli/node-minify"),
    pjson = require("../../package.json"),
    RouterBase = require("hot-router").RouterBase;

// MARK: class Common
/**
 * A class that handles common web functions.
 */
class Common extends RouterBase {
    // MARK: static get route
    /**
     * Retrieves the route parameters for the class.
     * @returns {RouterBase.Route} The route parameters.
     */
    static get route() {
        const route = {...super.route};

        route.include = true;

        return route;
    }

    // MARK: static page
    /**
     * Generates a webpage from the provided HTML using a common template.
     * @param {Express.Request} req The request of the page.
     * @param {CommonTypes.Files} files The files to include in the page.
     * @param {string} head The HTML to insert into the header.
     * @param {string} html The HTML to make a full web page from.
     * @param {string} [title] The title of the page.
     * @returns {Promise<string>} The HTML of the full web page.
     */
    static page(req, files, head, html, title) {
        if (!files) {
            files = {js: [], css: []};
        }

        if (!files.js) {
            files.js = [];
        }

        if (!files.css) {
            files.css = [];
        }

        files.css.unshift("/css/common.css");
        files.css.unshift("/css/reset.css");

        head = `${head} ${Minify.combine(files.js, "js")} ${Minify.combine(files.css, "css")}`;

        return HtmlMinifierTerser.minify(
            IndexView.get({
                head,
                html,
                title,
                protocol: req.protocol,
                host: req.get("host"),
                originalUrl: req.originalUrl,
                year: new Date().getFullYear(),
                version: pjson.version
            }),
            {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                decodeEntities: true,
                html5: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                useShortDoctype: true
            }
        );
    }
}

module.exports = Common;
