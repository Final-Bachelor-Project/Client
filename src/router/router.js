import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from "./routes.js";

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: "history"
});

router.beforeEach((to, from, next) => {
    const loggedInUser = localStorage.loggedInUser
    if ((to.name == 'Login' || to.name == 'Complete Profile') && loggedInUser) {
        next(`/`);
    } else if (loggedInUser || to.name == 'Login' || to.name == 'Complete Profile' || to.name == 'Explore') {
        next()
    } else {
        next({ name: "Login" });
    }
})

export default router;