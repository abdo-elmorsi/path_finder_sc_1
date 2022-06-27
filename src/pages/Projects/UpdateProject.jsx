import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap
import { FloatingLabel, Form, Button, Col } from "react-bootstrap";

// Icon
import pen from "../../images/pen.svg";

// Robots From Global
import { robotsGl } from "../../App";

function UpdateRobot() {
    // Get Id From url
    const { id } = useParams();

    // get token from locale storage to send it in the request
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));

    const [robotsG, setRobotsG] = useContext(robotsGl);
    const [userReg, setUserReg] = useState({}); // decleare a state for save user information on it
    const [control_type, setcontrol_type] = useState("");
    const [robotOp, setrobotOp] = useState("");

    const [Loading, setLoading] = useState(false);
    const [LoadingUpdate, setLoadingUpdate] = useState(false);

    // create inputs data (array) to map on it to create inputs
    const inputsData = [
        {
            name: "project_name",
            label: "Project name",
            type: "text",
            image: pen,
        },
        {
            name: "project_address",
            label: "Project address",
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

    // Fetch All Robots if there are no robots
    useEffect(() => {
        if (robotsG.length) {
            return 0;
        }
        (async () => {
            await axios
                .get("https://pathfinder-v1.herokuapp.com/maps/robots/", {
                    headers: { Authorization: `Token ${token}` },
                })
                .then((res) => {
                    setRobotsG(res.data);
                })
                .catch((er) => {
                    toast.error(er.message, "Please refresh the page");
                });
        })();
        return 0;
    }, [token, robotsG.length, setRobotsG]);

    // Fetch the project data to set it in the inputs
    useEffect(() => {
        setLoading(true);
        (async () => {
            await axios
                .get(
                    `https://pathfinder-v1.herokuapp.com/maps/project/${id}/`,
                    {
                        headers: { Authorization: `Token ${token}` },
                    }
                )
                .then(({ data }) => {
                    setLoading(false);
                    setUserReg({
                        project_name: data?.project_name,
                        project_address: data?.project_address,
                    });
                    setrobotOp(data?.robot?.robot_id);
                    setcontrol_type(data?.control_type);
                })
                .catch((er) => {
                    toast.error(er.message, "Please refresh the page");
                    setLoading(false);
                });
        })();
    }, [token, id]);
    return (
        <>
            <h2 className="text-white pb-4">Update Project {id}</h2>
            <Col
                xs={12}
                className="pb-5 mx-auto d-flex justify-content-center align-center flex-cloumn"
            >
                {!Loading ? (
                    <Form
                        // Request to update a project by id
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setLoadingUpdate(true);
                            (async () => {
                                await axios({
                                    method: "PATCH",
                                    url: `https://pathfinder-v1.herokuapp.com/maps/project/update/${id}/`,
                                    headers: {
                                        Authorization: `Token ${token}`,
                                    },
                                    data: {
                                        robot: `${robotOp}`,
                                        project_name: `${userReg?.project_name}`,
                                        control_type: `${control_type}`,
                                        project_address: `${userReg?.project_address}`,
                                    },
                                })
                                    .then(({ data }) => {
                                        toast.success(
                                            `Project: ${userReg?.project_name} is updated.`
                                        );
                                        setLoadingUpdate(false);
                                    })
                                    .catch((er) => {
                                        toast.error(er?.message);
                                        setLoadingUpdate(false);
                                    });
                            })();
                        }}
                    >
                        {/* const {label, image, type} = input   =============> destructure */}
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
                            {/* Select Box To Select A Robot Id */}
                            <Form.Group className="mb-3">
                                <span className="text-white text-start d-block">
                                    Robot id
                                </span>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="robot"
                                    style={{
                                        background: "#1a2f4c",
                                        border: "none",
                                        outline: "none",
                                        color: "#fff",
                                    }}
                                    value={robotOp}
                                    onChange={(e) => {
                                        setrobotOp(e.target.value);
                                    }}
                                >
                                    <option value={""}>Choose Robot</option>
                                    {robotsG.map((robot, i) => (
                                        <option
                                            disabled={
                                                robot.at_maintainance ||
                                                robot.is_assigned
                                            }
                                            value={robot?.robot_id}
                                            key={i}
                                        >
                                            {robot?.robot_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        {/* Map On  inputsData to create the inputs */}
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
                                label={"Control type"}
                                className="text-light w-100"
                            >
                                <Form.Control
                                    type="text"
                                    name={"control_type"}
                                    placeholder="name@example.com"
                                    value={control_type}
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
                                    checked={
                                        control_type === "Automatic"
                                            ? true
                                            : false
                                    }
                                    onChange={(e) => {
                                        setcontrol_type(
                                            e.target.checked
                                                ? "Automatic"
                                                : "Manual"
                                        );
                                    }}
                                />
                            </FloatingLabel>
                        </div>
                        <Button
                            type="submit"
                            disabled={
                                robotOp &&
                                userReg?.project_name &&
                                userReg?.project_address
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

// Component Inputs To handle create All inputs
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
