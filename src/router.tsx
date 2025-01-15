// import HomePage from "./components/HomePage";
import { createBrowserRouter, Outlet } from "react-router";
import About from "./components/About";
import NavBar from "./components/NavBar";
import UserName from "./components/UserName";
import Home from "./components/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <><NavBar/><Outlet/></>,
        children: [
            { path: "home", element: <Home/>, errorElement: <>Error</> }
            , { path: "about", element: <About/>, errorElement: <>Error</> }
            , { path: "user/:name", element: <UserName/>, errorElement: <>Error</> }
        ]
    }
])



