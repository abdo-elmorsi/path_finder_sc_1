import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap
import { Card, Button, Form } from "react-bootstrap";

// Inputs component
import Inputs from "../../components/Inputs";

// Two Icons
import user from "../../images/user.svg";
import lock from "../../images/lock.svg";

const DeletePro = ({
    layouts,
    setLayouts,
    projects,
    setProjects,
    delProIndex,
    delProName,
}) => {
    const [deleteProject, setDeleteProject] = useState({});

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

    const FormSubmit = (e) => {
        e.preventDefault();
        // get token, Username And Password from locale stoarge
        const { username, password, token } = JSON.parse(
            localStorage.getItem("UserLogin")
        );

        // Check if username and password === username and password from locale storage
        if (
            username === deleteProject.username &&
            password === deleteProject.password
        ) {
            // Request to delete a project by projectId
            (async () => {
                await axios({
                    method: "DELETE",
                    url: `https://pathfinder-v1.herokuapp.com/maps/project/delete/${delProIndex}/`,
                    headers: { Authorization: `Token ${token}` },
                })
                    .then(() => {
                        toast.success(`Project ${delProName} is deleted.`);
                        // Crate A new Projects without the old project
                        const newProjects = projects.filter((ele) => {
                            return ele.project_id !== delProIndex;
                        });
                        // update the projects
                        setProjects([...newProjects]);
                    })
                    .catch((er) => {
                        if (!er.response.data.detail) {
                            toast.error(er?.message);
                        }
                        toast.error(er?.response?.data?.detail);
                    });
                // close the popup
                setLayouts({ ...layouts, deletePro: false });
            })();
            // if user name or password is wrong
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
                    Delete Project
                </Card.Header>
                <Card.Body>
                    <Card.Text className="py-2">
                        You are about to delete the{" "}
                        {delProName ? (
                            <span className="text-danger fw-bolder">
                                {delProName}{" "}
                            </span>
                        ) : (
                            ""
                        )}{" "}
                        project. <br /> Are you sure that you want to delete
                        this project?
                    </Card.Text>
                    {/* Create inputs */}
                    {inputs.map((input, i) => (
                        <Inputs
                            key={i}
                            name={input.name}
                            labelName={input.label}
                            type={input.type}
                            image={input.image}
                            style={inputsStyle}
                            user={deleteProject}
                            setUser={setDeleteProject}
                        />
                    ))}
                    {/* Two buttons to cancle or delete */}
                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            className="px-3"
                            style={{
                                background: "#1a2f4c",
                                height: "42px",
                                border: "none",
                                outline: "none",
                                boxShadow: "none",
                                marginRight: "20px",
                            }}
                            onClick={() =>
                                setLayouts({ ...layouts, deletePro: false })
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

export default DeletePro;
