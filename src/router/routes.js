const LoginPage = () => import("../views/Login.vue");
const CompleteProfile = () => import("../views/CompleteProfile.vue");
const ExplorePage = () => import("../views/ExplorePage.vue")

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
        path: "/explore",
        name: "Explore",
        component: ExplorePage
    }

]

export default routes;