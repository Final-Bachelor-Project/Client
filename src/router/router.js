import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from "./routes.js";
import axios from 'axios'

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: "history"
});

router.beforeEach(async (to, from, next) => {
    const loggedInUser = (await axios.get('api/auth/session')).data
    if ((to.name == 'Login' || to.name == 'Complete Profile') && loggedInUser) {
        next(`/`);
    } else if (loggedInUser || to.name == 'Login' || to.name == 'Complete Profile') {
        next()
    } else {
        next({ name: "Login" });
    }
})

export default router;