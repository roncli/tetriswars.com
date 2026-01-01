/**
 * @typedef {import("express").Request} Express.Request
 * @typedef {import("express").Response} Express.Response
 */

const Common = require("../includes/common"),
    HomeView = require("../../public/views/home"),
    RouterBase = require("hot-router").RouterBase;

// MARK: class Home
/**
 * A controller for the home page.
 */
class Home extends RouterBase {
    // MARK: static get route
    /**
     * Retrieves the route parameters for the class.
     * @returns {RouterBase.Route} The route parameters.
     */
    static get route() {
        const route = {...super.route};

        route.path = "/";

        return route;
    }

    // MARK: static async get
    /**
     * Processes the request.
     * @param {Express.Request} req The request.
     * @param {Express.Response} res The response.
     * @returns {Promise<void>}
     */
    static async get(req, res) {
        res.send(await Common.page(req, {css: ["/css/home.css"]}, "", HomeView.get(), "Tetris Wars"));
    }
}

module.exports = Home;
