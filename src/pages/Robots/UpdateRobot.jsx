import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// Icon Edit
import pen from "../../images/pen.svg";

// Bootstrap
import { FloatingLabel, Form, Button, Col } from "react-bootstrap";

function UpdateRobot() {
    // get robot id from the url
    const { id } = useParams();
    // get the token from locale storage to send it in the request
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));

    const [control_assigned, setcontrol_assigned] = useState(false);
    const [control_maintainance, setcontrol_maintainance] = useState(false);
    const [userReg, setUserReg] = useState({}); // decleare a state for save user information on it

    const [Loading, setLoading] = useState(false);
    const [LoadingUpdate, setLoadingUpdate] = useState(false);

    // create inputs data (array) to map on it to create inputs
    const inputsData = [
        {
            name: "robot_name",
            label: "Robot name",
            type: "text",
            image: pen,
        },
        {
            name: "ip_address",
            label: "Ip address",
            type: "text",
            image: pen,
        },
    ];

    // to create style to inputs
    const inputsStyle = {
        alignItems: "center",
        borderBottom: "2px solid #d3a42e",
        position: "relative",
        display: "flex",
    };
    // UserEffect to get the robot data
    useEffect(() => {
        setLoading(true);
        (async () => {
            await axios
                .get(`https://pathfinder-v1.herokuapp.com/maps/robot/${id}`, {
                    headers: { Authorization: `Token ${token}` },
                })
                .then(({ data }) => {
                    setLoading(false);
                    setUserReg({
                        robot_name: data?.robot_name,
                        ip_address: data?.ip_address,
                    });
                    setcontrol_assigned(data?.is_assigned);
                    setcontrol_maintainance(data?.at_maintainance);
                })
                .catch((er) => {
                    console.log(er);
                    toast.error(er.message, "Please refresh the page");
                    setLoading(false);
                });
        })();
    }, [token, id]);
    return (
        <>
            <h2 className="text-white pb-4">Update Robot {id}</h2>
            <Col
                xs={12}
                className="pb-5 mx-auto d-flex justify-content-center align-center flex-cloumn"
            >
                {/* Request to update the robot data */}
                {!Loading ? (
                    <Form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setLoadingUpdate(true);
                            (async () => {
                                await axios({
                                    method: "PATCH",
                                    url: `https://pathfinder-v1.herokuapp.com/maps/robot/update/${id}/`,
                                    headers: {
                                        Authorization: `Token ${token}`,
                                    },
                                    data: {
                                        robot_name: `${userReg?.robot_name}`,
                                        is_assigned: `${control_assigned}`,
                                        at_maintainance: `${control_maintainance}`,
                                        ip_address: `${userReg?.ip_address}`,
                                    },
                                })
                                    .then(({ data }) => {
                                        toast.success(
                                            `Robot: ${userReg?.robot_name} is updated.`
                                        );
                                        console.log(data);
                                        // const index = robotsG.indexO
                                        // const NewRobots = robotsG
                                        setLoadingUpdate(false);
                                    })
                                    .catch((er) => {
                                        console.log(er);
                                        toast.error(er?.message);
                                        setLoadingUpdate(false);
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
                                    display: "flex",
                                    width: "100%",
                                    marginRight: "0",
                                }}
                            />
                        ))}
                        <div
                            style={{
                                ...inputsStyle,
                                display: "flex",
                                width: "100%",
                                marginRight: "0",
                            }}
                        >
                            <img
                                src={inputsData[0].image}
                                alt=""
                                style={{ width: "35px", height: "35px" }}
                            />
                            <FloatingLabel
                                controlId="floatingInput"
                                label={"Is assigned"}
                                className="text-light w-100"
                            >
                                <Form.Control
                                    type="text"
                                    name={"is_assigned"}
                                    placeholder="name@example.com"
                                    value={control_assigned ? "Work" : "Free"}
                                    readOnly
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        boxShadow: "none",
                                        color: "#fff",
                                    }}
                                />
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
                                    checked={control_assigned}
                                    onChange={(e) => {
                                        setcontrol_assigned((prev) => !prev);
                                    }}
                                />
                            </FloatingLabel>
                        </div>
                        <div
                            style={{
                                ...inputsStyle,
                                display: "flex",
                                width: "100%",
                                marginRight: "0",
                            }}
                        >
                            <img
                                src={inputsData[0].image}
                                alt=""
                                style={{ width: "35px", height: "35px" }}
                            />
                            <FloatingLabel
                                controlId="floatingInput"
                                label={"At maintainance"}
                                className="text-light w-100"
                            >
                                <Form.Control
                                    type="text"
                                    name={"at_maintainance"}
                                    placeholder="At maintainance"
                                    readOnly
                                    value={
                                        control_maintainance
                                            ? "At maintainance"
                                            : "Out maintainance"
                                    }
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        boxShadow: "none",
                                        color: "#fff",
                                    }}
                                />
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
                                    checked={control_maintainance}
                                    onChange={(e) => {
                                        setcontrol_maintainance(
                                            (prev) => !prev
                                        );
                                    }}
                                />
                            </FloatingLabel>
                        </div>
                        <Button
                            type="submit"
                            disabled={
                                userReg?.robot_name && userReg?.ip_address
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
                                marginTop: "10px",
                            }}
                        >
                            {LoadingUpdate ? "loading..." : "Update"}
                        </Button>
                    </Form>
                ) : (
                    <h2 className="text-white">Loading...</h2>
                )}
            </Col>
        </>
    );
}

export default UpdateRobot;

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
                    value={user[`${name}`]}
                    onChange={inputOnChange}
                />
            </FloatingLabel>
        </div>
    );
};
