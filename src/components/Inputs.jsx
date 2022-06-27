import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

function Inputs({ labelName, image, type, name, setUser, user, style }) {
    const inputOnChange = (e) => {
        // for changing value of userReg by making new object and get all old data values and put on it
        setUser({ ...user, [e.target.name]: `${e.target.value}` });
    };
    return (
        <div style={style}>
            <img src={image} alt="" style={{ width: "35px", height: "35px" }} />
            <FloatingLabel
                controlId="floatingInput"
                label={labelName}
                className="text-light w-100"
            >
                <Form.Control
                    type={type}
                    name={name}
                    placeholder="name@example.com"
                    style={{
                        background: "transparent",
                        border: "none",
                        boxShadow: "none",
                        color: "#fff",
                    }}
                    onChange={inputOnChange}
                />
                {type === "password" ? (
                    <Form.Check
                        type="switch"
                        style={{
                            display: "inline",
                            position: "absolute",
                            top: "50%",
                            right: "0",
                            transform: "translateY(-40%)",
                            boxShadow: "none",
                        }}
                        onChange={(e) => {
                            e.target.checked
                                ? (e.target.parentElement.parentElement.children[0].type =
                                      "text")
                                : (e.target.parentElement.parentElement.children[0].type =
                                      "password");
                        }}
                    />
                ) : (
                    <></>
                )}
            </FloatingLabel>
        </div>
    );
}

export default Inputs;
