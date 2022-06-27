import React, { useState } from "react"; //import react
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap components
import { Row, Col, Form, Button } from "react-bootstrap"; //import features of boatsrapt

import { Link, useNavigate } from "react-router-dom";

import Inputs from "../../components/Inputs";

// Styles
import "./styles/login.css";

// Icons
import robotBack from "../../images/home-made-robot.webp";
import user from "../../images/user.svg";
import lock from "../../images/lock.svg";

// initial login component
const Login = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [keepMe, setkeepMe] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();

    // Decleare Form Inputs Array
    const inputsData = [
        {
            name: "username",
            label: "Username",
            image: user,
            type: "text",
        },
        {
            name: "password",
            label: "password",
            image: lock,
            type: "password",
        },
    ];

    // Set Inputs Style
    const inputsStyle = {
        alignItems: "center",
        borderBottom: "2px solid #d3a42e",
        position: "relative",
        display: "flex",
    };

    // Methods
    const formSubmit = async (e) => {
        // This function will execute when for submitted

        // Prevent Default
        e.preventDefault();

        // Set is Loading To True
        setisLoading(true);

        // Request to get user info
        await axios
            .post("https://pathfinder-v1.herokuapp.com/maps/login/", userInfo)
            .then(({ data }) => {
                // request to get user token
                axios
                    .post("https://pathfinder-v1.herokuapp.com/auth/", userInfo)
                    .then((res) => {
                        setisLoading(false);
                        localStorage.setItem(
                            "UserLogin",
                            JSON.stringify({
                                ...data,
                                token: res.data.token,
                                password: userInfo.password,
                            })
                        );
                        navigate("/");
                    })
                    .catch((err) => {
                        toast.error(err.message);
                    });
                setisLoading(false);
            })
            .catch((err) => {
                toast(err.message);
                setisLoading(false);
            });
    };

    // JSX CODE
    return (
        <div className="login_component">
            <Row className="flex-nowrap login_page">
                {/* FORM SIDE */}
                <Col className="login_form_side__col">
                    {/* Header Section */}
                    <div className="login_form_side__header">
                        <span className="login_form_side__header_span">
                            Login to
                        </span>
                        <h1 className="login_form_side__header_h1">
                            PATHFINDER-SC1
                        </h1>
                        <span className="login_form_side__header_span">
                            You don't have an account
                            <Link
                                to="/register"
                                style={{ marginLeft: "5px", color: "#d3a42e" }}
                            >
                                Create an account
                            </Link>
                        </span>
                    </div>

                    {/* Form Section */}
                    <Form
                        autoComplete={"false"}
                        className="login_form_side__form"
                        onSubmit={formSubmit}
                    >
                        {/* START OF Inputs */}
                        <div className="login__form_inputes">
                            {inputsData.map((input, index) => (
                                <Inputs
                                    setUser={setUserInfo} // send setUser (function to change on state) props => in parent of input
                                    user={userInfo}
                                    labelName={input.label}
                                    index={index}
                                    image={input.image}
                                    type={input.type}
                                    style={inputsStyle}
                                    key={index}
                                    name={input.name}
                                />
                            ))}
                        </div>
                        {/* END OF Inputs */}

                        {/* Keep Me Loggin CheckBox and Login Button */}
                        <div className="d-flex justify-content-between my-4 align-items-center">
                            {/* Keep Me Logged-In */}
                            <span className="d-flex my-3 align-items-center text-light keep_me_logged_in">
                                {/* Keep Me Logged-In CheckBox */}
                                <Form.Check
                                    // Check option [True, False]
                                    checked={keepMe}
                                    // Change Check status
                                    onChange={(e) =>
                                        setkeepMe(e.target.checked)
                                    }
                                    className="me-2"
                                    type="checkbox"
                                    aria-label="checkbox 1"
                                    id="loginSt"
                                />

                                {/* Keep Me logged-In Lable */}
                                <Form.Label
                                    htmlFor="loginSt"
                                    className="keep_me_logged_in_label"
                                >
                                    Keep me Logged in
                                </Form.Label>
                            </span>
                            {/* END Keep Me Logged-In */}

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={
                                    userInfo?.username && userInfo?.password
                                        ? false
                                        : true
                                }
                                className="login_form_side__form_button"
                            >
                                {isLoading ? "loading..." : "Login"}
                            </Button>

                            {/* END Login Button */}
                        </div>
                        {/* Keep Me Loggin CheckBox and Login Button */}

                        {/* Forget Password Page */}
                        <Link
                            to="/ForgetPassword"
                            className="login_form_side__form_forget_password"
                        >
                            Forgrt password
                        </Link>
                        {/* END Forget Password Page */}
                    </Form>
                    {/* END FORM  */}

                    {/* PATHFINDER TEAM COPYRIGHT */}
                    <div className="pathfinder_copy_rights">
                        <span>
                            &copy;2022 all rights reserved.{" "}
                            <span className="pathfinder_copy_rights__teamname">
                                pathfinder team
                            </span>
                        </span>
                    </div>
                    {/* END PATHFINDER TEAM COPYRIGHT */}
                </Col>
                {/* END FORM SIDE SECTION  */}

                {/* IMAGE SECTION */}
                <Col className="d-none d-md-block login_image_side">
                    <img src={robotBack} alt="wallpaper" />
                </Col>
                {/* END IMAGE SECTION */}
            </Row>
            {/* END LOGIN PAGE */}
        </div>
    );
};

export default Login;
