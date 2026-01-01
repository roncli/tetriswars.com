// MARK: class MethodNotAllowedView
/**
 * A class that represents the 405 view.
 */
class MethodNotAllowedView {
    // MARK: static get
    /**
     * Gets the rendered method not allowed template.
     * @param {{message: string}} [data] The data for the method not allowed view.
     * @returns {string} An HTML string of the method not allowed view.
     */
    static get(data) {
        const {message} = data || {message: "Method not allowed."};

        return /* html */`
            <div id="error">
                <h1>405 - Flew too close to the sun!</h1>
                <div>${message}</div>
            </div>
        `;
    }
}

if (typeof module === "undefined") {
    window.MethodNotAllowedView = MethodNotAllowedView;
} else {
    module.exports = MethodNotAllowedView;
}
