const Home = () => import("@/views/Home");
const Classify = () => import("@/views/Classify/index");
const Shopping = () => import("@/views/Shopping");
const My = () => import("@/views/My");

export default [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/classify",
        name: "Classify",
        component: Classify,
    },
    {
        path: "/shopping",
        name: "Shopping",
        component: Shopping,
    },
    {
        path: "/my",
        name: "My",
        component: My,
    },
];