import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap
import { Form, Button, Card } from "react-bootstrap";

const AddRobot = ({ layouts, setLayouts, Robots, setRobots }) => {
    const robotName = useRef();
    const connectIP = useRef();
    const [is_assigned, setis_assigned] = useState(false);
    const [at_maintainance, setat_maintainance] = useState(false);

    // get token from locale stoarge to send it in the request
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));
    // Request to create a robot
    const formSubmit = (e) => {
        e.preventDefault();
        (async function () {
            await axios({
                url: "https://pathfinder-v1.herokuapp.com/maps/robot/create/",
                method: "POST",
                headers: { Authorization: `Token ${token}` },
                data: {
                    robot_name: `${robotName.current.value}`,
                    ip_address: `${connectIP.current.value}`,
                    is_assigned: `${is_assigned}`,
                    at_maintainance: `${at_maintainance}`,
                },
            })
                .then(({ data }) => {
                    toast.success(`robot ${data.robot_name} is added`);
                    setRobots([...Robots, data]);
                })
                .catch((er) => {
                    toast.error(er.message, "Please refresh the page");
                });
            setLayouts({ ...layouts, deletePro: false });
        })();
        setLayouts({ ...layouts, createProject: false });
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
                        padding: "20px",
                        boxShadow: "rgb(0 0 0) 0px 2px 10px 1px",
                    }}
                >
                    Add a robot
                </Card.Header>
                <Card.Body className="p-3">
                    <Form onSubmit={formSubmit}>
                        <fieldset>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    style={{
                                        background: "#1a2f4c",
                                        border: "none",
                                        outline: "none",
                                        color: "#fff",
                                    }}
                                    placeholder="Robot name"
                                    ref={robotName}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    style={{
                                        background: "#1a2f4c",
                                        color: "#fff",
                                        border: "none",
                                        outline: "none",
                                    }}
                                    placeholder="Connection IP"
                                    ref={connectIP}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start">
                                <Form.Check
                                    style={{ color: "white" }}
                                    type="switch"
                                    id="custom-switch"
                                    label="Is assigned?"
                                    checked={is_assigned}
                                    onChange={(e) => {
                                        setis_assigned(e.target.checked);
                                    }}
                                />
                                <Form.Check
                                    style={{ color: "white" }}
                                    type="switch"
                                    id="custom-switch-two"
                                    label="At maintainance?"
                                    checked={at_maintainance}
                                    onChange={(e) =>
                                        setat_maintainance(e.target.checked)
                                    }
                                />
                            </Form.Group>
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
                                            addRobot: false,
                                        })
                                    }
                                >
                                    Cancel
                                </Button>
                                <Button
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
                                    Add a robot
                                </Button>
                            </div>
                        </fieldset>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AddRobot;
