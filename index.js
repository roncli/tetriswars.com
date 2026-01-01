const Cache = require("./src/cache"),
    compression = require("compression"),
    express = require("express"),
    hotRouter = require("hot-router"),
    Log = require("@roncli/node-application-insights-logger"),
    Minify = require("@roncli/node-minify"),
    path = require("path"),
    util = require("util");

process.on("unhandledRejection", (reason) => {
    Log.error("Unhandled promise rejection caught.", {err: reason instanceof Error ? reason : new Error(util.inspect(reason))});
});

// MARK: class Index
/**
 * The primary class for the application.
 */
class Index {
    // MARK: static #getMinifyCache
    /**
     * Gets a minified cache item.
     * @param {string} key The key to get the cache item for.
     * @returns {string} The cache item.
     */
    static #getMinifyCache(key) {
        try {
            return Cache.get(key);
        } catch (err) {
            Log.error("An error occurred while attempting to get a Minify cache.", {err, properties: {key}});
            return void 0;
        }
    }

    // MARK: static async #setMinifyCache
    /**
     * Sets a minified cache item.
     * @param {string} key The key to set the cache item for.
     * @param {object} value The cache item.
     * @returns {void}
     */
    static #setMinifyCache(key, value) {
        try {
            Cache.set(key, value, 86400000);
        } catch (err) {
            Log.error("An error occurred while attempting to set a Minify cache.", {err, properties: {key}});
        }
    }

    // MARK: static async startup
    /**
     * Starts up the application.
     * @returns {Promise<void>}
     */
    static async startup() {
        // Setup application insights.
        if (process.env.APPINSIGHTS_CONNECTIONSTRING) {
            Log.setupApplicationInsights(process.env.APPINSIGHTS_CONNECTIONSTRING, {application: "tetriswars.com"});
        }

        console.log("Startup up...");

        // Set title.
        if (process.platform === "win32") {
            process.title = "tetriswars.com";
        } else {
            process.stdout.write("\x1b]2;tetriswars.com\x1b\x5c");
        }

        // Setup express app.
        const app = express();

        // Remove powered by.
        app.disable("x-powered-by");

        // Initialize middleware stack.
        app.use(compression());

        // Trust proxy to get correct IP from web server.
        app.set("trust proxy");

        // TODO: Add an accurate Content Security Policy header.
        app.set("Content-Security-Policy-Report-Only", "default-src 'self'");

        // Setup public static files.
        app.use(/^(?!\/tsconfig\.json)/, express.static("public"));

        // Setup minification.
        Minify.setup({
            cssRoot: "/css/",
            jsRoot: "/js/",
            wwwRoot: path.join(__dirname, "public"),
            caching: process.env.MINIFY_CACHE ? {
                get: Index.#getMinifyCache,
                set: Index.#setMinifyCache
            } : void 0,
            disableTagCombining: !process.env.MINIFY_ENABLED
        });
        app.get("/css", Minify.cssHandler);
        app.get("/js", Minify.jsHandler);

        // Setup hot-router
        const router = new hotRouter.Router();
        router.on("error", (data) => {
            Log.error(data.message, {err: data.err, req: data.req});
        });
        try {
            app.use("/", await router.getRouter(path.join(__dirname, "web"), {hot: false}));
        } catch (err) {
            Log.critical("Could not set up routes.", {err});
        }

        app.use((err, req, res, next) => {
            router.error(err, req, res, next);
        });

        // Startup webserver
        const port = process.env.PORT || 8080;

        app.listen(port);

        Log.info(`Server PID ${process.pid} listening on port ${port}.`);
    }
}

Index.startup().catch((err) => {
    Log.error("Failed to start the application.", {err});
    process.exit(1);
});
