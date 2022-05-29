const LoginPage = () => import("../views/Login.vue");
const CompleteProfile = () => import("../views/CompleteProfile.vue");
const ExplorePage = () => import("../views/ExplorePage.vue")
const Requests = () => import("../views/Requests.vue")
const Connections = () => import("../views/Connections.vue")
const Chats = () => import("../views/Chats.vue")
const Chatroom = () => import("../views/Chatroom.vue")
const EditProfile = () => import("../views/EditProfile.vue");
const ProfilePage = () => import("../views/ProfilePage.vue");

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
        path: "/profile",
        name: "Profile",
        component: ProfilePage
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
    },
    {
        path: "/chats",
        name: "Chats",
        component: Chats
    },
    {
        path: "/chatroom/:id",
        name: "Chatroom",
        component: Chatroom
    },
    {
        path: "/edit-profile",
        name: "Edit profile",
        component: EditProfile
    }

]

export default routes;