import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// Bootstrap
import { Row, Container, Form } from "react-bootstrap";

// Table Data
import ProjectTableAllData from "../../components/ProjectTableAllData";
import ProjectTablePois from "../../components/ProjectTablePois";

// Chart Data
import ChartAllData from "../../components/ChartAllData";
import ChartPoisData from "../../components/ChartPoisData";

// ***********************************************************

const ProjectByIdHistory = () => {
    // get the project id from the ( url )
    const { id } = useParams();
    const { pathname } = useLocation();

    const Navigate = useNavigate();

    // get token from locale storage to send it in the request
    const { token, username } = JSON.parse(localStorage.getItem("UserLogin"));

    const [SwitchTable, setSwitchTable] = useState(true);
    const [SwitchChart, setSwitchChart] = useState(true);

    // create useState Fro show project details in the top page
    const [project, setProject] = useState({});

    const [LoadingPois, setLoadingPois] = useState(false);
    // useState to save data pois to show it in the table
    const [DataPois, setDataPois] = useState([]);

    const [LoadingAllData, setLoadingAllData] = useState(false);
    // useState to save all data table
    const [allData, setallData] = useState([]);

    const handleShitchPages = (e) => {
        const { value } = e.target;
        Navigate(`/project/${id}/${value}`);
    };

    // create useState to handle filter by gas type
    const [GasType, setGasType] = useState("");
    useEffect(() => {
        // for test ********************************
        // (async () => {
        //     // setLoading(true);
        //     // `https://pathfinder-v1.herokuapp.com/maps/project/${id}/data/range?inst1=2022-01-14T22:30:58.800787Z&inst2=2022-01-14T22:30:58.807945Z`,
        //     await axios
        //         .post(
        //             `https://pathfinder-v1.herokuapp.com/maps/project/${id}/data/range/`,
        //             {
        //                 headers: { Authorization: `Token ${token}` },
        //                 params: {
        //                     "inst1": "2022-01-14T22:30:58.800787Z",
        //                     "inst2": "2022-01-14T22:30:59.807945Z",
        //                 },
        //             }
        //         )
        //         .then((res) => {
        //             // setProject(res.data);
        //             // setLoading(false);
        //             console.log(res.data);
        //         })
        //         .catch((er) => {
        //             toast.error(er.message);
        //             console.log(er);
        //         });
        // })();
        // Request to get all project data poisonous
        (async () => {
            setLoadingPois(true);
            await axios
                .get(
                    `https://pathfinder-v1.herokuapp.com/maps/project/${id}/data/poisonous/`,
                    { headers: { Authorization: `Token ${token}` } }
                )
                .then((res) => {
                    setDataPois(res.data);
                    setProject(res.data.slice(-1));
                    setLoadingPois(false);
                })
                .catch((er) => {
                    toast.error(er.message);
                    setLoadingPois(false);
                });
        })();
        (async () => {
            setLoadingAllData(true);
            await axios
                .get(
                    `https://pathfinder-v1.herokuapp.com/maps/project/${id}/data/`,
                    { headers: { Authorization: `Token ${token}` } }
                )
                .then((res) => {
                    setallData(res.data);
                    setLoadingAllData(false);
                })
                .catch((er) => {
                    toast.error(er.message);
                    setLoadingAllData(false);
                });
        })();
    }, [token, id]);
    return (
        <Container fluid>
            <h2 className="d-flex  justify-content-start text-white text-start mb-4">
                <span>Project {project[0]?.project} </span>
                <Form.Group className="mb-3 ms-4">
                    {/* to navigate bewtween hostory and live pages */}
                    <Form.Select
                        onChange={handleShitchPages}
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
            {/* CHart */}

            {SwitchChart ? (
                <Row className="mb-5">
                    {LoadingAllData ? (
                        <h2>Loading chart all data...</h2>
                    ) : allData.length ? (
                        <>
                            {/* to switch bewtween all data and pois data */}
                            <ChartSwitcher
                                SwitchChart={SwitchChart}
                                setSwitchChart={setSwitchChart}
                            />
                            <ChartAllData
                                loading={LoadingAllData}
                                Data={allData}
                            />
                        </>
                    ) : (
                        <h2>No data for chart</h2>
                    )}
                </Row>
            ) : (
                <Row className="mb-5">
                    {LoadingPois ? (
                        <h2>Loading chart pois data...</h2>
                    ) : allData.length ? (
                        <>
                            {/* to switch bewtween all data and pois data */}
                            <ChartSwitcher
                                SwitchChart={SwitchChart}
                                setSwitchChart={setSwitchChart}
                            />
                            <ChartPoisData
                                loading={LoadingPois}
                                Data={DataPois}
                            />
                        </>
                    ) : (
                        <h2>No data for chart</h2>
                    )}
                </Row>
            )}
            {/* Table */}
            {username === "tony" && (
                <>
                    {SwitchTable ? (
                        <Row className="mt-4">
                            {LoadingAllData ? (
                                <h2>Loading all data table...</h2>
                            ) : allData.length ? (
                                <>
                                    <TableSwitcher
                                        SwitchTable={SwitchTable}
                                        setSwitchTable={setSwitchTable}
                                    />
                                    <ProjectTableAllData Data={allData} />
                                </>
                            ) : (
                                <h2>No data for table</h2>
                            )}
                        </Row>
                    ) : (
                        <Row className="mt-4">
                            {LoadingPois ? (
                                <h2>Loading poisonous table...</h2>
                            ) : DataPois.length ? (
                                <>
                                    <TableSwitcher
                                        SwitchTable={SwitchTable}
                                        setSwitchTable={setSwitchTable}
                                    />
                                    <ProjectTablePois
                                        Data={DataPois}
                                        GasType={GasType}
                                        setGasType={setGasType}
                                    />
                                </>
                            ) : (
                                <h2>No data for poisonous table</h2>
                            )}
                        </Row>
                    )}
                </>
            )}
        </Container>
    );
};

export default ProjectByIdHistory;

export const ChartSwitcher = ({ SwitchChart, setSwitchChart }) => {
    return (
        <Form.Select
            onChange={() => setSwitchChart((prev) => !prev)}
            style={{
                width: "250px",
                background: "rgb(25, 30, 59)",
            }}
            className="mt-3 d-inline-block text-white d-flex"
            aria-label="Default select example"
        >
            <option>select chart type</option>
            <option value="2" disabled={SwitchChart}>
                All data
            </option>
            <option value="2" disabled={!SwitchChart}>
                Poisonous data
            </option>
        </Form.Select>
    );
};

export const TableSwitcher = ({ SwitchTable, setSwitchTable }) => {
    return (
        <Form.Select
            onChange={() => setSwitchTable((prev) => !prev)}
            style={{
                width: "250px",
                background: "rgb(25, 30, 59)",
            }}
            className="mt-3 d-inline-block text-white d-flex"
            aria-label="Default select example"
        >
            <option>select table type</option>
            <option value="2" disabled={SwitchTable}>
                All data
            </option>
            <option value="2" disabled={!SwitchTable}>
                Poisonous data
            </option>
        </Form.Select>
    );
};
