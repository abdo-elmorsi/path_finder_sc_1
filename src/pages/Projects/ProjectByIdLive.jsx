import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
    useParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { Joystick } from "react-joystick-component";

import "./Styles/ProjectLive.css";
// Bootstrap
import { Row, Col, Button, Form } from "react-bootstrap";

import ProjectSliders from "../../components/ProjectSliders";
// Get All Icons
// ***********************************************************
import robot2 from "../../images/robot2.webp";
import resize from "../../images/resize.svg";
import map from "../../images/map.svg";
import show from "../../images/show.svg";
import redDot from "../../images/redDot.svg";
import play from "../../images/play.svg";
import backArrow from "../../images/backArrow.svg";
import forwardArrow from "../../images/forwardArrow.svg";
import ProjectTablePois from "../../components/ProjectTablePois";
// ***********************************************************

const ProjectByIdLive = () => {
    // get the project id from the ( url )
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const { pathname } = useLocation();

    const Navigate = useNavigate();

    // get token from locale storage to send it in the request
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));

    // create useState Fro show project details in the top page
    const [project, setProject] = useState({});

    const [allData, setallData] = useState([]);
    // create useState to handle filter by gas type
    const [GasType, setGasType] = useState("");

    const [Loading, setLoading] = useState(false);

    const handleShitchPages = (e) => {
        const { value } = e.target;
        if (value !== "") {
            Navigate(`/project/${id}/${value}`);
        }
    };

    // Request to get all project data poisonous
    useEffect(() => {
        (async () => {
            setLoading(true);
            await axios
                .get(
                    `https://pathfinder-v1.herokuapp.com/maps/project/${id}/data/`,
                    { headers: { Authorization: `Token ${token}` } }
                )
                .then((res) => {
                    setProject(res.data.slice(-1));
                    setallData(res.data);
                    setLoading(false);
                })
                .catch((er) => {
                    toast.error(er.message);
                    setLoading(false);
                });
        })();
    }, [token, id]);
    return (
        <>
            <h2 className="d-flex  justify-content-start text-white text-start mb-4">
                <span>Project {project[0]?.project} </span>
                <Form.Group className="mb-3 ms-4">
                    {/* to navigate bewtween hostory and live pages */}
                    <Form.Select
                        onClick={handleShitchPages}
                        aria-label="Default select example"
                        name="robot"
                        style={{
                            background: "#1a2f4c",
                            border: "none",
                            outline: "none",
                            color: "#fff",
                        }}
                    >
                        <option value={""}>Choose page</option>
                        <option
                            value={"live"}
                            disabled={pathname.includes("live") ? true : false}
                        >
                            Live
                        </option>
                        <option
                            value={"history"}
                            disabled={
                                pathname.includes("history") ? true : false
                            }
                        >
                            History
                        </option>
                    </Form.Select>
                </Form.Group>
            </h2>
            <>
                <Row className="">
                    <>
                        <Col style={{ flex: "1" }}>
                            <Col>
                                <h2 className="title">PATHFINDER-SC1</h2>
                            </Col>
                            {/* sliders */}
                            <Col className="d-flex justify-content-between">
                                <ProjectSliders
                                    name={"Temperature"}
                                    value={`${65}`}
                                    start={-25}
                                    end={45}
                                />
                                <ProjectSliders
                                    name={"Humidity"}
                                    value={35}
                                    start={-25}
                                    end={45}
                                />
                                <ProjectSliders
                                    name={"Gas"}
                                    value={43}
                                    start={0}
                                    end={70}
                                />
                            </Col>
                        </Col>
                        {/* robot two images */}
                        <Row className="robot_two_images">
                            {/* robot left */}
                            <Col className="left_robot d-flex flex-column w-100">
                                {/* Robot Images */}
                                <div className="left_robot_image">
                                    <span></span>
                                    <img
                                        src={robot2}
                                        className="w-100"
                                        alt=""
                                    />
                                </div>
                                {/* Robot  Contols */}
                                <div className="left_robot_controls">
                                    <div>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={redDot}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={backArrow}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={play}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={forwardArrow}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={show}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={resize}
                                            />
                                        </span>
                                    </div>
                                </div>
                                {/* Robot Data */}
                                {Loading ? (
                                    <p className="d-flex justify-content-center align-items-center h-100">
                                        Loading robot data...
                                    </p>
                                ) : (
                                    <div className="d-flex flex-column align-items-start justify-content-between pt-4 h-100">
                                        <div>
                                            <span>Control</span>
                                            <h4
                                                className="fw-bold"
                                                style={{
                                                    color: "green",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {project[0]?.control_type}{" "}
                                                Control
                                            </h4>
                                        </div>
                                        <div>
                                            <span>Last update date</span>
                                            <h4
                                                style={{
                                                    color: "green",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {project[0]?.time_collected
                                                    ?.toString()
                                                    ?.slice(0, 10)}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>Last update time</span>
                                            {project[0]?.time_collected && (
                                                <h4
                                                    style={{
                                                        color: "green",
                                                        fontSize: "100%",
                                                    }}
                                                >
                                                    {new Date(
                                                        project[0]?.time_collected
                                                    ).getHours()}
                                                    :
                                                    {new Date(
                                                        project[0]?.time_collected
                                                    ).getMinutes()}
                                                    {new Date(
                                                        project[0]?.time_collected
                                                    ).getHours()
                                                        ? " AM"
                                                        : " PM"}
                                                </h4>
                                            )}
                                        </div>
                                        <div>
                                            <span>Mission Time</span>
                                            <h4
                                                className="m-0"
                                                style={{
                                                    color: "red",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {project[0]?.time_collected.slice(
                                                    0,
                                                    10
                                                )}
                                            </h4>
                                        </div>
                                    </div>
                                )}
                            </Col>
                            {/* robot right */}
                            <Col className="right_robot d-flex flex-column w-100">
                                {/* Robot Image */}
                                <div className="right_robot_image">
                                    <span></span>
                                    <img
                                        src={robot2}
                                        className="w-100"
                                        alt=""
                                    />
                                </div>
                                {/* Robot Controls */}
                                <div className="right_robot_controls">
                                    <div>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={redDot}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={backArrow}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={play}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={forwardArrow}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={show}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                alt=""
                                                style={{ width: "15px" }}
                                                src={resize}
                                            />
                                        </span>
                                    </div>
                                </div>
                                {/* Robot Data */}
                                {Loading ? (
                                    <p className="d-flex justify-content-center align-items-center h-100">
                                        Loading robot data...
                                    </p>
                                ) : (
                                    <div className="d-flex flex-column align-items-start justify-content-between pt-4 h-100">
                                        <div>
                                            <span>Robot IP</span>
                                            <h4
                                                style={{
                                                    color: "green",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {/* {rIp} */}
                                                {searchParams.get("rIp") ||
                                                    "192.168.1.1"}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>X-Position</span>
                                            <h4
                                                style={{
                                                    color: "red",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {Number(
                                                    project[0]?.x_position
                                                ).toFixed(2)}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>Y-Position</span>
                                            <h4
                                                style={{
                                                    color: "red",
                                                    fontSize: "100%",
                                                }}
                                            >
                                                {Number(
                                                    project[0]?.y_position
                                                ).toFixed(2)}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>Speed</span>
                                            <h4
                                                style={{
                                                    color: "red",
                                                    fontSize: "100%",
                                                    margin: "0",
                                                }}
                                            >
                                                {project[0]?.speed} m/s
                                            </h4>
                                        </div>
                                    </div>
                                )}
                            </Col>
                        </Row>

                        {/* map image */}
                        <Col className="map_image">
                            {/* Right button  Ai */}
                            <Button
                                onClick={() => console.log("Right button")}
                                className={
                                    "right_btn_ai d-flex justify-content-center align-items-center position-absolute rounded-circle text-white fw-bold border-0"
                                }
                            >
                                Ai
                            </Button>
                            {/* Left button Pe
                            <Button
                                onClick={() => console.log("left button")}
                                className={
                                    "left_btn_pe d-flex justify-content-center align-items-center position-absolute rounded-circle text-white fw-bold border-0"
                                }
                            >
                                Wi
                            </Button> */}

                            {/* Center Buttons */}
                            <div className="center_btn">
                                <Joystick
                                    // disabled
                                    size={60}
                                    sticky={false}
                                    baseColor="rgb(25, 30, 59)"
                                    stickColor="white"
                                    move={(e) => console.log(e)}
                                    stop={(e) => console.log(e)}
                                />
                            </div>
                            <img
                                alt=""
                                className="h-100 w-100"
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                }}
                                src={map}
                            />
                        </Col>
                    </>
                </Row>
                <Row className="mt-4">
                    {Loading ? (
                        <h2>Loading poisonous table...</h2>
                    ) : allData.length ? (
                        <>
                            <ProjectTablePois
                                Data={allData}
                                GasType={GasType}
                                setGasType={setGasType}
                            />
                        </>
                    ) : (
                        <h2>No data for poisonous table</h2>
                    )}
                </Row>
            </>
        </>
    );
};

export default ProjectByIdLive;
