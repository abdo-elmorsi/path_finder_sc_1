import React, { useState } from "react";
// Axios To Handle Request with api
import axios from "axios";
// To Alert error or info
import { toast } from "react-toastify";

// Bootstrap
import { FloatingLabel, Form, Button, Col } from "react-bootstrap";

// Get All Icons
// ****************************
import user from "../images/user.svg";
import lock from "../images/lock.svg";
import pen from "../images/pen.svg";
import msg from "../images/msg.svg";
import userSqure from "../images/userSqure.svg";
// ****************************

function UpdateUserInfo() {
    // Get All Data from locale storage
    const {
        token,
        id,
        username,
        first_name,
        last_name,
        phone,
        email,
        password,
    } = JSON.parse(localStorage.getItem("UserLogin"));

    const [Loading, setLoading] = useState(false);

    const [userReg, setUserReg] = useState({
        username,
        email,
        password,
        first_name: first_name !== "undefined" ? first_name : "",
        last_name: last_name !== "undefined" ? last_name : "",
        phone: phone !== "undefined" ? phone : "",
    }); // decleare a state for save user information on it

    // create array to map on it to create all inputs
    const inputsData = [
        {
            name: "first_name",
            label: "First name",
            type: "text",
            image: pen,
        },
        {
            name: "last_name",
            label: "Last name",
            type: "text",
            image: userSqure,
        },
        {
            name: "username",
            label: "Username",
            type: "text",
            image: user,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            image: msg,
        },
        {
            name: "password",
            label: "password",
            type: "password",
            image: lock,
        },
        {
            name: "phone",
            label: "Phone",
            type: "text",
            image: pen,
        },
    ];
    // create custom input style
    const inputsStyle = {
        alignItems: "center",
        borderBottom: "2px solid #d3a42e",
        position: "relative",
        display: "flex",
    };
    return (
        <>
            <h2 className="text-white">Update information</h2>
            <Col
                xs={12}
                className="py-5 mx-auto d-flex justify-content-center align-center flex-cloumn"
            >
                <Form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        // Reaquest to update user by id
                        (async () => {
                            await axios({
                                method: "PATCH",
                                url: `https://pathfinder-v1.herokuapp.com/maps/user/update/${id}/`,
                                headers: {
                                    Authorization: `Token ${token}`,
                                },
                                data: {
                                    first_name: `${userReg?.first_name}`,
                                    last_name: `${userReg?.last_name}`,
                                    username: `${userReg?.username}`,
                                    email: `${userReg?.email}`,
                                    password: `${userReg?.password}`,
                                    phone: `${userReg?.phone}`,
                                },
                            })
                                .then(({ data }) => {
                                    toast.success(
                                        `User ${username} is updated.`
                                    );
                                    localStorage.setItem(
                                        "UserLogin",
                                        JSON.stringify({
                                            // data are ( username, firstname, lastname,email )
                                            ...data,
                                            token: token,
                                            password: password,
                                        })
                                    );
                                    setLoading(false);
                                })
                                .catch((er) => {
                                    toast.error(er?.message);
                                    ["username", "email", "phone"].map(
                                        (ele) => {
                                            if (er?.response?.data[ele]) {
                                                toast.error(
                                                    `${ele} ${er?.response?.data[ele][0]}`
                                                );
                                            }
                                            return 0;
                                        }
                                    );
                                    setLoading(false);
                                });
                        })();
                    }}
                >
                    {/* const {label, image, type} = input   =============> destructure */}
                    {inputsData.map((input, index) => (
                        <Inputs
                            setUser={setUserReg} // send setUserReg (function to change on state) props =>>in parent of input
                            user={userReg}
                            labelName={input.label}
                            image={input.image}
                            type={input.type}
                            name={input.name}
                            value={input?.value}
                            key={index}
                            style={{
                                ...inputsStyle,
                                display: index <= 1 ? "inline-flex" : "flex",
                                width: index <= 1 ? "45%" : "100%",
                                marginRight: index <= 0 ? "9%" : "0",
                            }}
                        />
                    ))}
                    <Button
                        type="submit"
                        disabled={
                            userReg?.username &&
                            userReg?.email &&
                            userReg?.password
                                ? false
                                : true
                        }
                        style={{
                            background: "#d3a42e",
                            color: "#fff",
                            width: "110px",
                            height: "40px",
                            border: "none",
                            borderRadius: "5px",
                            display: "block",
                            marginTop: "10px",
                        }}
                    >
                        {Loading ? "loading..." : "Update"}
                    </Button>
                </Form>
            </Col>
        </>
    );
}

export default UpdateUserInfo;

export const Inputs = ({
    labelName,
    image,
    type,
    name,
    setUser,
    user,
    style,
}) => {
    const inputOnChange = (e) => {
        // for changing value of userReg by making new object and get all old data values and put on it
        setUser({ ...user, [e.target.name]: `${e.target.value}` });
    };
    return (
        <div style={style}>
            <img src={image} alt="" style={{ width: "35px", height: "35px" }} />
            {/* this is the label flow */}
            <FloatingLabel
                controlId="floatingInput"
                label={labelName}
                className="text-light w-100"
            >
                {/* input we write in it */}
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
                    value={user[`${name}`]}
                    onChange={inputOnChange}
                />
                {/* if type == password will create input switch to switch password type  */}
                {type === "password" && (
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
                )}
            </FloatingLabel>
        </div>
    );
};
