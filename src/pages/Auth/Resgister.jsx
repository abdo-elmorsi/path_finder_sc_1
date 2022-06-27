import React, { useState } from "react"; //import react
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap
import { Row, Col, Form, Button } from "react-bootstrap"; //import features of boatsrapt

// Import Inputs Component to handle create inputs
import Inputs from "../../components/Inputs";

// Get All Icons ******************************
import robotBack from "../../images/home-made-robot.webp";
import pen from "../../images/pen.svg";
import user from "../../images/user.svg";
import msg from "../../images/msg.svg";
import lock from "../../images/lock.svg";
import userSqure from "../../images/userSqure.svg";
// ***********************************

// Styles
import "./styles/registeration.css";

function Resgister() {
    // initial resgister component
    const [userReg, setUserReg] = useState({}); // decleare a state for save user information on it
    const [terms, setTerms] = useState(false); // decleare variable for terms and conditions
    const [isLoading, setisLoading] = useState(false);

    // Handle navigate to navigate the user to home page
    const navigate = useNavigate();
    // Decleare Array for inputs to map on it and create Inputs components
    const inputsData = [
        {
            name: "frist_name",
            label: "Frist name",
            image: pen,
            type: "text",
        },
        {
            name: "last_name",
            label: "last name",
            image: userSqure,
            type: "text",
        },
        {
            name: "username",
            label: "Username",
            image: user,
            type: "text",
        },
        {
            name: "email",
            label: "Email",
            image: msg,
            type: "email",
        },
        {
            name: "password",
            label: "password",
            image: lock,
            type: "password",
        },
    ];

    //Decleare inputs style
    const inputsStyle = {
        alignItems: "center",
        borderBottom: "2px solid #d3a42e",
        position: "relative",
    };

    // Methods
    const formSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true);
        // make condition on terms value
        if (terms) {
            // Request to create a new user
            await axios
                .post("https://pathfinder-v1.herokuapp.com/maps/register/", {
                    first_name: `${userReg.first_name}`,
                    last_name: `${userReg.last_name}`,
                    username: `${userReg.username}`,
                    email: `${userReg.email}`,
                    password: `${userReg.password}`,
                })
                .then(() => {
                    toast.success("Now go to login by this account");
                    navigate("/login");
                })
                .catch((err) => {
                    console.log(err);
                });
            setisLoading(false);
        } else {
            setisLoading(false);
            toast.warning("You must agree on conditions");
        }
    };

    return (
        <div className="registeration_component">
            <Row className="flex-nowrap registeration_page">
                {/* we use one row with two coloums (bootsrap dislay) */}
                <Col className="registeration_side__col">
                    <div className="registeration_form_side__header">
                        <span className="registeration_form_side__header_span">
                            Create an acount with
                        </span>
                        <h1 className="registeration_form_side__header_h1">
                            PATHFINDER-SC1{" "}
                        </h1>
                        <span className="registeration_form_side__header_span">
                            Already have account?
                            <Link
                                to="/login"
                                style={{ marginLeft: "5px", color: "#d3a42e" }}
                            >
                                login
                            </Link>
                        </span>
                    </div>
                    {/* to make all the isnputs in form this form in the left center */}
                    <Form
                        className="registeration_form_side__form"
                        onSubmit={formSubmit}
                    >
                        {/* const {label, image, type} = input   =============> destructure */}

                        <div className="registeration__form_inputes">
                            {inputsData.map((input, index) => (
                                <Inputs
                                    setUser={setUserReg} // send setUserReg (function to change on state) props =>>in parent of input
                                    user={userReg}
                                    labelName={input.label}
                                    image={input.image}
                                    type={input.type}
                                    name={input.name}
                                    key={index}
                                    style={{
                                        ...inputsStyle,
                                        display:
                                            index <= 1 ? "inline-flex" : "flex",
                                        width: index <= 1 ? "45%" : "100%",
                                        marginRight: index <= 0 ? "9%" : "0",
                                    }}
                                />
                            ))}
                        </div>

                        <label
                            htmlFor="rd1"
                            className="d-flex my-3 align-items-center text-light keep_me_logged_in"
                        >
                            <Form.Check
                                className="me-2"
                                type="checkbox"
                                aria-label="checkbox 1"
                                id="rd1"
                                onChange={() =>
                                    setTerms((terms) => (terms ? false : true))
                                }
                            />
                            I agree to the terms and conditions
                        </label>
                        <Button
                            type="submit"
                            disabled={
                                userReg?.username && userReg?.password
                                    ? false
                                    : true
                            }
                            className="registeration_form_side__form_button"
                        >
                            {isLoading ? "loading..." : "Create Account"}
                        </Button>
                    </Form>

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
                {/* IMAGE SECTION */}
                <Col className="d-none d-md-block registeration_image_side">
                    <img src={robotBack} alt="wallpaper" />
                </Col>
                {/* END IMAGE SECTION */}
            </Row>
        </div>
    );
}

export default Resgister;
