import React from "react";
import { Card, Button } from "react-bootstrap";

import robo from "../images/industrial-robo.webp";
import arrow from "../images/arrow.svg";
import UpdateIcon from "../images/UpdateIcon.png";

import trash from "../images/trash.svg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProjectCard({
    name,
    projectAuth,
    date,
    robot,
    control_type,
    is_working,
    is_done,
    layouts,
    setLayouts,
    id,
    setDelProIndex,
    setDelProName,
}) {
    return (
        <Card
            style={{
                width: "min-content",
                background: "transparent",
                display: "flex",
                textAlign: "left",
                alignItems: "center",
                flexDirection: "row",
                color: "#fff",
            }}
        >
            <Card.Body
                style={{
                    width: "20rem",
                    height: "16rem",
                    position: "relative",
                    zIndex: "2",
                    background: "#191e3b",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "1px 2px 10px 1px #000",
                    borderRadius: "10px",
                }}
            >
                {/* Flash */}
                <span
                    style={{
                        width: "14px",
                        height: "14px",
                        display: "block",
                        background: is_working
                            ? "#009900"
                            : is_done
                            ? "rgb(205, 190, 9)"
                            : "rgb(153, 0, 0)",
                        position: "absolute",
                        right: "5%",
                        top: "5%",
                        borderRadius: "50%",
                    }}
                ></span>

                <Card.Title>
                    <h2>{name}</h2>
                </Card.Title>

                <small style={{ margin: "0" }}>
                    {projectAuth?.username} ({" "}
                    {projectAuth?.username === "tony" ? "admin" : "user"} )
                </small>
                <small style={{ flex: "1", margin: "0" }}>{}</small>
                {date ? (
                    <small style={{ flex: "1" }}>
                        {date?.toString()?.slice(0, 10)} :{" "}
                        {date?.toString()?.slice(11, 16)}
                    </small>
                ) : (
                    <small style={{ flex: "1" }}>no date</small>
                )}
                <small>
                    <img alt="f" src={robo} style={{ marginRight: "6px" }} />
                    Name: {robot?.robot_name}
                </small>
                <small style={{ flex: "2", marginLeft: "30px" }}>
                    Ip: {robot?.ip_address}
                </small>
                <small
                    style={{
                        marginLeft: "30px",
                        transform: "translateY(-22px)",
                    }}
                >
                    Control type: {control_type}
                </small>
            </Card.Body>

            <div
                style={{
                    width: "min-content",
                    background: "#191e3b",
                    padding: ".6rem",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                }}
            >
                <Link to={`/project/${id}/update`}>
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
                        <img width={30} src={UpdateIcon} alt="one" />
                    </Button>
                </Link>

                <Link to={`/project/${id}/live?rIp=${robot.ip_address}`}>
                    <Button
                        style={{
                            borderRadius: "5px",
                            boxShadow: "1px 1px 4px 1px #000",
                            padding: ".3rem",
                            border: "none",
                            background: "transparent",
                            marginBottom: "8px",
                        }}
                    >
                        <img alt="arrow" src={arrow} />
                    </Button>
                </Link>

                <Button
                    style={{
                        borderRadius: "5px",
                        boxShadow: "1px 1px 4px 1px #000",
                        padding: ".3rem",
                        border: "none",
                        background: "transparent",
                    }}
                    onClick={() => {
                        if (is_working || is_done) {
                            toast.error(
                                `You can't delete this project because it is ${
                                    is_working ? "working." : "done."
                                }`
                            );
                        }
                        setDelProIndex(id);
                        setDelProName(name);
                        setLayouts({ ...layouts, deletePro: true });
                    }}
                >
                    <img alt="trash" src={trash} />
                </Button>
            </div>
        </Card>
    );
}

export default ProjectCard;
