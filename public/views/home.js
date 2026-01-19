// MARK: class HomeView
/**
 * A class that represents the home view.
 */
class HomeView {
    // MARK: static get
    /**
     * Gets the rendered page template.
     * @returns {string} An HTML string of the page.
     */
    static get() {
        return /* html */`
            <div id="home">
                <img src="/images/logo-500.png" alt="Tetris Wars Logo" id="homeLogo" />
                <div><h1>WATCH</h1><h2>Events on Twitch</h2></div>
                <a href="/twitch" target="_blank"><img src="/images/twitch.png" alt="Watch on Twitch" id="twitchButton" /></a>
                <div><h1>VIEW</h1><h2>Highlights on YouTube</h2></div>
                <a href="/youtube" target="_blank"><img src="/images/youtube.png" alt="View Highlights on YouTube" id="youtubeButton" /></a>
                <div><h1>JOIN</h1><h2>Discord to Start Playing!</h2></div>
                <a href="/discord" target="_blank"><img src="/images/discord.png" alt="Join Discord" id="discordButton" /></a>
            </div>
        `;
    }
}

if (typeof module === "undefined") {
    window.HomeView = HomeView;
} else {
    module.exports = HomeView;
}
