import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap Components
import { Card, Button, Form } from "react-bootstrap";

// Inputs Components to create all Inputs
import Inputs from "../../components/Inputs";

// Icons
import user from "../../images/user.svg";
import lock from "../../images/lock.svg";

const DeletePro = ({
    layouts,
    setLayouts,
    delUserIndex,
    delUserName,
    Users,
    setUsers,
}) => {
    const [deleteUser, setDeleteUser] = useState({});
    // Inputs Data To Create All Inputs From This Data
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

    // Handle Inputs Style
    const inputsStyle = {
        alignItems: "center",
        borderBottom: "2px solid #d3a42e",
        position: "relative",
        display: "flex",
    };
    // Get All These Data from locale storage
    const { username, password, token } = JSON.parse(
        localStorage.getItem("UserLogin")
    );

    // Request to delete user by id
    const FormSubmit = (e) => {
        e.preventDefault();

        if (
            username === deleteUser.username &&
            password === deleteUser.password
        ) {
            (async () => {
                await axios({
                    method: "DELETE",
                    url: `https://pathfinder-v1.herokuapp.com/maps/user/delete/${delUserIndex}/`,
                    headers: { Authorization: `Token ${token}` },
                })
                    .then((res) => {
                        toast.success(`User ${delUserName} is deleted.`);

                        // Filter Users to remove the deleted user from data
                        const newUsers = Users.filter((ele) => {
                            return ele.id !== delUserIndex;
                        });
                        setUsers([...newUsers]);
                    })
                    .catch((er) => {
                        toast.error(er?.message);
                    });
                setLayouts({ ...layouts, deleteUser: false });
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
                    Delete User
                </Card.Header>
                <Card.Body>
                    <Card.Text className="py-2">
                        You are about to delete the{" "}
                        {delUserName ? (
                            <span className="text-danger fw-bolder">
                                {delUserName}{" "}
                            </span>
                        ) : (
                            ""
                        )}{" "}
                        user. <br /> Are you sure that you want to delete this
                        user?
                    </Card.Text>
                    {/* Create All Inputs */}
                    {inputs.map((input, i) => (
                        <Inputs
                            key={i}
                            name={input.name}
                            labelName={input.label}
                            type={input.type}
                            image={input.image}
                            style={inputsStyle}
                            user={deleteUser}
                            setUser={setDeleteUser}
                        />
                    ))}
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
                                setLayouts({ ...layouts, deleteUser: false })
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
