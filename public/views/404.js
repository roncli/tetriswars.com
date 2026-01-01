// MARK: class NotFoundView
/**
 * A class that represents the 404 view.
 */
class NotFoundView {
    // MARK: static get
    /**
     * Gets the rendered not found template.
     * @param {{message: string}} [data] The data for the not found view.
     * @returns {string} An HTML string of the not found view.
     */
    static get(data) {
        const {message} = data || {message: "The page you requested could not be found."};

        return /* html */`
            <div id="error">
                <h1>404 - Where's the bar?  There's no bar!</h1>
                <div>${message}</div>
            </div>
        `;
    }
}

if (typeof module === "undefined") {
    window.NotFoundView = NotFoundView;
} else {
    module.exports = NotFoundView;
}
