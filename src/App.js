import React, { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";

import Layout from "./Layout";

// auth
import Resgister from "./pages/Auth/Resgister";
import Login from "./pages/Auth/Login";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetCode from "./pages/Auth/ResetCode";
import ResetPassword from "./pages/Auth/ResetPassword";

// pages
import Robots from "./pages/Robots";
import UpdateRobot from "./pages/Robots/UpdateRobot";
import Admin from "./pages/Admin";
import UpdateUserInfo from "./pages/UpdateInfo";

import Projects from "./pages/Projects";
import ProjectByIdLive from "./pages/Projects/ProjectByIdLive";
import ProjectByIdHistory from "./pages/Projects/ProjectByIdHistory";

import UpdateProject from "./pages/Projects/UpdateProject";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createTheme } from "react-data-table-component";

export const robotsGl = createContext();
export const projectsGl = createContext();
const HomeIcons = [
    {
        text: "Wroking",
        color: "#090",
    },
    {
        text: "Done",
        color: "rgb(205 190 9)",
    },
    {
        text: "Not Working",
        color: "#900",
    },
];
const RobotIcons = [
    {
        text: "Wrok",
        color: "#090",
    },
    {
        text: "Mentanince",
        color: "rgb(205 190 9)",
    },
    {
        text: "Free",
        color: "#900",
    },
];
function App() {
    const [layouts, setLayouts] = useState({});

    const [robotsG, setRobotsG] = useState([]);
    const [projectsG, setProjectsG] = useState([]);

    const UserLogin = JSON.parse(localStorage.getItem("UserLogin") || null);

    // To change table background to black
    createTheme(
        "solarized",
        {
            text: { primary: "#268bd2", secondary: "#268bd2" },
            background: { default: "rgb(25, 30, 59)" },
        },
        "dark"
    );
    return (
        <robotsGl.Provider value={[robotsG, setRobotsG]}>
            <projectsGl.Provider value={[projectsG, setProjectsG]}>
                <div
                    className="App"
                    style={{
                        background: "hsl(250.4, 79.3%, 5.7%)",
                        minHeight: "100vh",
                    }}
                >
                    {/* Toast Alert style */}
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />

                    <Routes>
                        <Route element={<NotRequirdAuth />}>
                            <Route
                                path="/register"
                                element={<Resgister />}
                            ></Route>

                            <Route path="/login" element={<Login />}></Route>
                            <Route
                                path="/ForgetPassword"
                                element={<ForgetPassword />}
                            ></Route>
                            <Route
                                path="/ResetCode"
                                element={<ResetCode />}
                            ></Route>
                            <Route
                                path="/ResetPassword"
                                element={<ResetPassword />}
                            ></Route>
                        </Route>

                        <Route element={<RequirdAuth />}>
                            <Route
                                path="/"
                                element={
                                    <Layout // create array from text and color to map and show it in the header
                                        helpIcons={HomeIcons}
                                    >
                                        <Projects
                                            layouts={layouts}
                                            setLayouts={setLayouts}
                                        />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/project/:id/live"
                                element={
                                    <Layout>
                                        <ProjectByIdLive />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/project/:id/history"
                                element={
                                    <Layout>
                                        <ProjectByIdHistory />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/project/:id/update"
                                element={
                                    <Layout>
                                        <UpdateProject />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/robots"
                                element={
                                    <Layout helpIcons={RobotIcons}>
                                        <Robots
                                            layouts={layouts}
                                            setLayouts={setLayouts}
                                        />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/robot/:id/update"
                                element={
                                    <Layout>
                                        <UpdateRobot />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/setting"
                                element={
                                    <Layout>
                                        <UpdateUserInfo />
                                    </Layout>
                                }
                            />

                            {UserLogin?.username === "tony" ? (
                                <Route
                                    path="/users"
                                    element={
                                        <Layout>
                                            <Admin
                                                layouts={layouts}
                                                setLayouts={setLayouts}
                                            />
                                        </Layout>
                                    }
                                />
                            ): null}
                        </Route>

                        <Route
                            path="*"
                            element={
                                <Layout>
                                    <h2 className="">404 PAGE NOT FOUND</h2>
                                </Layout>
                            }
                        />
                    </Routes>
                </div>
            </projectsGl.Provider>
        </robotsGl.Provider>
    );
}

export default App;

// to handle navigate
function RequirdAuth() {
    const userDetails = localStorage.getItem("UserLogin");

    if (userDetails === null) {
        // to navigate to login page
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}

function NotRequirdAuth() {
    const userDetails = localStorage.getItem("UserLogin");

    if (userDetails === null) {
        return <Outlet />;
    }
    // to navigate to home page
    return <Navigate to="/" />;
}
