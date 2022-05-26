const LoginPage = () => import("../views/Login.vue");
const CompleteProfile = () => import("../views/CompleteProfile.vue");
const ExplorePage = () => import("../views/ExplorePage.vue")
const Requests = () => import("../views/Requests.vue")
const Connections = () => import("../views/Connections.vue")

const routes = [
    {
        path: "/login",
        name: "Login",
        component: LoginPage
    },
    {
        path: "/complete",
        name: "Complete Profile",
        component: CompleteProfile
    },
    {
        path: "/",
        name: "Explore",
        component: ExplorePage
    },
    {
        path: "/requests",
        name: "Pending requests",
        component: Requests
    },
    {
        path: "/connections",
        name: "Connections",
        component: Connections
    }

]

export default routes;