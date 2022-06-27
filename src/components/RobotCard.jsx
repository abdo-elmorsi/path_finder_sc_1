import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import UpdateIcon from "../images/UpdateIcon.png";
import trash from "../images/trash.svg";

function RobotCard({
    name,
    ip,
    is_assigned,
    at_maintainance,
    image,
    layouts,
    setLayouts,
    index,
    setDelRobIndex,
    setdelRoboName,
}) {
    return (
        <Card
            style={{
                width: "min-content",
                background: "transparent",
                outline: "none",
                display: "flex",
                alignItems: "center",
                color: "#fff",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    position: "relative",
                    transform: "translateY(8%)",
                    zIndex: "2",
                }}
            >
                <div
                    style={{
                        background: "#191e3b",
                        padding: "1rem",
                        borderRadius: "15px",
                        boxShadow: "1px 1px 4px 1px #000",
                        zIndex: "2",
                    }}
                >
                    <Card.Img
                        style={{
                            width: "181px",
                            height: "156px",
                            borderRadius: "15px",
                        }}
                        src={image}
                    />
                </div>
                <div
                    style={{
                        width: "min-content",
                        background: "#191e3b",
                        padding: ".6rem",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                    }}
                >
                    <Button
                        style={{
                            borderRadius: "5px",
                            boxShadow: "1px 1px 4px 1px #000",
                            padding: ".3rem",
                            border: "none",
                            background: "transparent",
                            marginBottom: ".5rem",
                        }}
                    >
                        <Link to={`/robot/${index}/update`}>
                            <img width={30} src={UpdateIcon} alt="one" />
                        </Link>
                    </Button>
                    <Button
                        style={{
                            borderRadius: "5px",
                            boxShadow: "1px 1px 4px 1px #000",
                            padding: ".3rem",
                            border: "none",
                            background: "transparent",
                        }}
                        onClick={() => {
                            setDelRobIndex(index);
                            setdelRoboName(name);
                            setLayouts({ ...layouts, deleteRob: true });
                        }}
                    >
                        <img src={trash} alt="two" />
                    </Button>
                </div>
            </div>
            <Card.Body
                style={{
                    width: "20rem",
                    height: "7rem",
                    position: "relative",
                    background: "#191e3b",
                    paddingTop: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "1px 2px 10px 1px #000",
                    borderRadius: "10px",
                }}
            >
                <span
                    style={{
                        width: "14px",
                        height: "14px",
                        display: "block",
                        background: at_maintainance
                            ? "rgb(205, 190, 9)"
                            : is_assigned
                            ? "rgb(0, 153, 0)"
                            : "rgb(153, 0, 0)",
                        position: "absolute",
                        right: "5%",
                        top: "12%",
                        borderRadius: "50%",
                    }}
                ></span>
                <Card.Title>
                    <h4>{name}</h4>
                </Card.Title>
                <div className="d-flex justify-content-between">
                    <small style={{ fontSize: "12px" }}>
                        Connection IP:
                        <span
                            style={{
                                color: at_maintainance
                                    ? "rgb(205, 190, 9)"
                                    : is_assigned
                                    ? "rgb(0, 153, 0)"
                                    : "rgb(153, 0, 0)",
                            }}
                        >
                            {" "}
                            {ip}
                        </span>
                    </small>

                    <small style={{ fontSize: "12px" }}>
                        status:
                        <span
                            style={{
                                color: at_maintainance
                                    ? "rgb(205, 190, 9)"
                                    : is_assigned
                                    ? "rgb(0, 153, 0)"
                                    : "rgb(153, 0, 0)",
                            }}
                        >
                            {" "}
                            {at_maintainance
                                ? "At maintainance"
                                : is_assigned
                                ? "Work"
                                : "Free"}
                        </span>
                    </small>
                </div>
            </Card.Body>
        </Card>
    );
}

export default RobotCard;
