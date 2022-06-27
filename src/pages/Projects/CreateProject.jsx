import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap
import { Form, Button, Card } from "react-bootstrap";

// Get Robots data from globar
import { robotsGl } from "../../App";

const CreateProject = ({ layouts, setLayouts, projects, setProjects }) => {
    // get token from locale stoarge to send it in the request
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));
    // Use Robots Data from Global
    const [robotsG, setRobotsG] = useContext(robotsGl);

    const [projectName, setprojectName] = useState("");
    const [control_type, setcontrol_type] = useState(false);
    const [project_address, setproject_address] = useState("");
    const [robotOp, setrobotOp] = useState("");

    // Get All Robots if there are no data in global to create a project
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

    // To create A new project
    const formSubmit = (e) => {
        e.preventDefault();
        (async function () {
            await axios({//to create project you must post
                url: "https://pathfinder-v1.herokuapp.com/maps/project/create/",
                method: "POST",
                headers: { Authorization: `Token ${token}` },
                data: {
                    robot: robotOp,
                    project_name: `${projectName}`,
                    control_type: control_type ? "Automatic" : "Manual",
                    project_address: `${project_address}`,
                },
            })//he must in respone return all data for new project
                .then((res) => {
                    const { data: Data } = res;
                    toast.success(`Project ${Data.project_name} is added`);
                    setProjects([Data, ...projects]);
                })
                .catch((er) => {
                    toast.error(er.message, "Please refresh the page");
                });//to close create page
            setLayouts({ ...layouts, createProject: false });
        })();
    };
    return (
        <div
            style={{
                display: layouts ? "flex" : "none",
                background: "rgba(0, 0, 0, .7)",
                position: "absolute",
                inset: "0",
                zIndex: "3",
            }}
        >
            <Card
                style={{
                    width: "450px",
                    position: "fixed",
                    top: "50vh",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#191e3b",
                }}
            >
                <Card.Header
                    style={{
                        color: "rgb(211, 164, 46)",
                        padding: "20px",
                        boxShadow: "rgb(0 0 0) 0px 2px 10px 1px",
                    }}
                >
                    Create a project
                </Card.Header>
                <Card.Body className="p-3">
                    <Form onSubmit={formSubmit}>
                        <fieldset>
                            {/* name */}
                            <Form.Group className="mb-3">
                                <Form.Control
                                    name="projectName"
                                    style={{
                                        background: "#1a2f4c",
                                        border: "none",
                                        outline: "none",
                                        color: "#fff",
                                    }}
                                    placeholder="Project name"
                                    value={projectName}
                                    onChange={(e) =>
                                        setprojectName(e.target.value)
                                    }
                                />
                            </Form.Group>
                            {/* address */}
                            <Form.Group className="mb-3">
                                <Form.Control
                                    name="project_address"
                                    style={{
                                        background: "#1a2f4c",
                                        border: "none",
                                        outline: "none",
                                        color: "#fff",
                                    }}
                                    placeholder="Project Address"
                                    value={project_address}
                                    onChange={(e) =>
                                        setproject_address(e.target.value)
                                    }
                                />
                            </Form.Group>
                            {/* select box */}
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
                                            value={robot.robot_id}
                                            key={i}
                                        >
                                            {robot.robot_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {/* custom-switch */}
                            <Form.Group className="mb-3 text-start">
                                <Form.Check
                                    style={{ color: "white" }}
                                    type="switch"
                                    id="custom-switch-type"
                                    label={`${
                                        control_type ? "Automatic" : "Manual"
                                    }`}
                                    checked={control_type}
                                    onChange={(e) =>
                                        setcontrol_type(e.target.checked)
                                    }
                                />
                            </Form.Group>
                            {/* Buttons to cancle or send */}
                            <div className="d-flex justify-content-end">
                                <Button
                                    style={{
                                        background: "#1a2f4c",
                                        height: "42px",
                                        border: "none",
                                        outline: "none",
                                        boxShadow: "none",
                                        marginRight: "20px",
                                    }}
                                    onClick={() =>
                                        setLayouts({
                                            ...layouts,
                                            createProject: false,
                                        })
                                    }
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={
                                        !projectName.length ||
                                        !project_address.length ||
                                        !robotOp.length
                                            ? true
                                            : false
                                    }
                                    style={{
                                        height: "42px",
                                        fontWeight: "600",
                                        background: "#d3a42e",
                                        border: "3px solid #d3a42e",
                                        outline: "none",
                                        boxShadow: "none",
                                    }}
                                    type="submit"
                                >
                                    Create a project
                                </Button>
                            </div>
                        </fieldset>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateProject;
