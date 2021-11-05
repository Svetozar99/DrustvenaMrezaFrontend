import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import AddPost from "./components/AddPost.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue");
// const AddPost = () => import("./components/AddPost.vue");
// const BoardModerator = () => import("./components/BoardModerator.vue")
// const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
  {
    name:"Login",
    path: "/login",
    component: Login,
  },
  {
    name:"Register",
    path: "/register",
    component: Register,
  },
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name:"Home",
    path: "/home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/add-post",
    name: "AddPost",
    // lazy-loaded
    component: AddPost,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to,from, next) => {
  const token = localStorage.getItem('user')

  if (to.name === 'Register' && !token) next();
  else if(to.name !== 'Login' && !token) next({ name: 'Login'});
  else if((to.name === 'Login' || to.name === 'Register') && token) next ({name: 'Home'})
  else next();
})

export default router;