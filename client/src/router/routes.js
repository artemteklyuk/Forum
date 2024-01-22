import Posts from "../pages/Posts";
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import AdminPage from "../pages/adminPage";

export const PrivateRoutes = [
    {path: "/about", element: About},
    {path: "/posts", element: Posts},
    {path: "/posts/:id", element: PostIdPage},
    {path: "/admin", element: AdminPage}
]
export const PublicRoutes = [
    {path: "/login", element: Login},
    {path: "/registration", element: Login}
]