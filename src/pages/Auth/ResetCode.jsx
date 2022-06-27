import React, { useState } from "react"; //import react
import { Row, Col, Form } from "react-bootstrap"; //import features of boatsrapt
import { Link } from "react-router-dom";
import Inputs from "../../components/Inputs";
import robotBack from "../../images/home-made-robot.webp";
import mouse from "../../images/mouse.svg";

// const {label} = x
function ResetCode() {
    // initial resgister component
    const [userCode, setUserCode] = useState(null); // decleare a state for save user information on it
    // Decleare Array for Labels to map on it and create Inputs components
    const inputsData = [
        {
            name: "resetcode",
            label: "Enter The Reset Code",
            image: mouse,
            type: "text",
        },
    ];
    //Decleare inputs style
    const inputsStyle = {
        alignItems: "center",
        borderBottom: "2px solid #d3a42e",
        position: "relative",
    };
    return (
        <div style={{ background: "#07031a", height: "100vh" }}>
            <Row
                className="flex-nowrap"
                style={{ height: "100%", width: "100%", margin: "0" }}
            >
                {/* we use one row with two coloums (bootsrap dislay) */}
                <Col
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ color: "#fff", width: "350px" }}>
                        <span
                            style={{
                                width: "100%",
                                display: "block",
                                textAlign: "start",
                            }}
                        >
                            Password Recovery
                        </span>
                        <h1 style={{ color: "#d3a42e", textAlign: "start" }}>
                            PATHFINDER-SC1{" "}
                        </h1>
                        <span
                            style={{
                                width: "100%",
                                display: "block",
                                textAlign: "start",
                            }}
                        >
                            Do You Remember The Password
                            <Link
                                style={{ marginLeft: "5px", color: "#d3a42e" }}
                                to="/login"
                            >
                                login
                            </Link>
                        </span>
                    </div>
                    {/* to make all the isnputs in form this form in the left center */}
                    <Form
                        style={{ width: "350px" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log(userCode);
                        }}
                    >
                        {/* const {label, image, type} = input   =============> destructure */}
                        {inputsData.map((input, index) => (
                            <Inputs
                                key={index}
                                setUser={setUserCode} // send setUserCode (function to change on state) props =>>in parent of input
                                user={userCode}
                                labelName={input.label}
                                image={input.image}
                                type={input.type}
                                name={input.name}
                                style={{
                                    ...inputsStyle,
                                    display: "flex",
                                    margin: "30px 0",
                                }}
                            />
                        ))}

                        <button
                            style={{
                                background: "#d3a42e",
                                color: "#fff",
                                padding: "10px",
                                border: "none",
                                borderRadius: "5px",
                                marginLeft: "auto",
                                display: "block",
                            }}
                        >
                            Send Code
                        </button>
                    </Form>
                </Col>
                <Col style={{ height: "100%", width: "100%", padding: "0" }}>
                    <img
                        src={robotBack}
                        alt=""
                        style={{ height: "100%", width: "100%" }}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default ResetCode;
