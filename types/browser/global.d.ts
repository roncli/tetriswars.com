import HomeView from "../../public/views/home"
import IndexView from "../../public/views/index"
import MethodNotAllowedView from "../../public/views/405"
import NotFoundView from "../../public/views/404"
import ServerErrorView from "../../public/views/500"

export {}

declare global {
    interface Window {
        HomeView: typeof HomeView
        IndexView: typeof IndexView
        MethodNotAllowedView: typeof MethodNotAllowedView
        NotFoundView: typeof NotFoundView
        ServerErrorView: typeof ServerErrorView
    }
}
