const Home = () => import("@/views/Home");
const Classify = () => import("@/views/Classify/index");
const Shopping = () => import("@/views/Shopping");
const My = () => import("@/views/My");
const Search = () => import("@/views/Search");

export default [
    {
        path: "*",
        redirect: "/classify"
    },
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
    {
        path: "/search",
        name: "Search",
        component: Search
    }
];