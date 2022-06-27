import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Component Inputs to create the inputs
import Inputs from "../../components/Inputs";

// Icons
import user from "../../images/user.svg";
import lock from "../../images/lock.svg";

// Bootstrap
import { Card, Button, Form } from "react-bootstrap";
const DeleteRob = ({
    layouts,
    setLayouts,
    robot,
    setRobots,
    delRoboIndex,
    delRoboName,
}) => {
    const [deleteRobot, setDeleteRobot] = useState({});
    // create inputs data (array) to map on it to create inputs
    const inputs = [
        {
            name: "username",
            label: "Username",
            type: "text",
            image: user,
        },
        {
            name: "password",
            label: "password",
            type: "password",
            image: lock,
        },
    ];
    // to create style to inputs
    const inputsStyle = {
        alignItems: "center",
        borderBottom: "2px solid #d3a42e",
        position: "relative",
        display: "flex",
    };

    // Request to delete a robot
    const FormSubmit = (e) => {
        e.preventDefault();
        // get token, Username And Password from locale stoarge
        const { username, password, token } = JSON.parse(
            localStorage.getItem("UserLogin")
        );

        // Check if username and password === username and password from locale storage
        if (
            username === deleteRobot.username &&
            password === deleteRobot.password
        ) {
            // Request to delete a robot by robotId
            (async () => {
                await axios({
                    method: "DELETE",
                    url: `https://pathfinder-v1.herokuapp.com/maps/robot/delete/${delRoboIndex}/`,
                    headers: { Authorization: `Token ${token}` },
                })
                    .then((res) => {
                        toast.success(
                            `Robot ${
                                robot.find(
                                    (ele) => ele.robot_id === delRoboIndex
                                ).robot_name
                            } is deleted.`
                        );
                        const newrobot = robot.filter((ele) => {
                            return ele.robot_id !== delRoboIndex;
                        });
                        setRobots([...newrobot]);
                    })
                    .catch((er) => {
                        console.log(er);
                        if (!er.response.data.detail) {
                            toast.error(er?.message);
                        }
                        toast.error(er?.response?.data?.detail);
                    });
                setLayouts({ ...layouts, deletePro: false });
            })();
        } else {
            toast.warning("email or password is wrong, please try again");
        }
    };
    return (
        <Form
            onSubmit={FormSubmit}
            style={{
                display: layouts ? "flex" : "none",
                background: "rgba(0, 0, 0, .7)",
                position: "absolute",
                inset: "0",
                zIndex: "3",
                color: "#fff",
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
                    borderRadius: "10px",
                }}
            >
                <Card.Header
                    style={{
                        padding: "20px",
                        boxShadow: "rgb(0 0 0) 0px 2px 10px 1px",
                    }}
                >
                    Delete Robot
                </Card.Header>
                <Card.Body>
                    <Card.Text className="py-2">
                        You are about to delete the{" "}
                        {delRoboName ? (
                            <span className="text-danger fw-bolder">
                                {delRoboName}{" "}
                            </span>
                        ) : (
                            ""
                        )}{" "}
                        robot. <br /> Are you sure that you want to delete this
                        robot?
                    </Card.Text>
                    {/* map on inputs data to create all inputs */}
                    {inputs.map((input, i) => (
                        <Inputs
                            key={i}
                            name={input.name}
                            labelName={input.label}
                            type={input.type}
                            image={input.image}
                            style={inputsStyle}
                            user={deleteRobot}
                            setUser={setDeleteRobot}
                        />
                    ))}
                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            className="px-3 border-0"
                            style={{
                                background: "#1a2f4c",
                                height: "42px",
                                outline: "none",
                                marginRight: "20px",
                            }}
                            // to close delete component
                            onClick={() =>
                                setLayouts({ ...layouts, deleteRob: false })
                            }
                        >
                            Cancel
                        </Button>
                        <Button className="px-3" variant="danger" type="submit">
                            Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Form>
    );
};

export default DeleteRob;
