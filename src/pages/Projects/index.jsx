import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap
import { Row, Col, Button } from "react-bootstrap";

import CreateProject from "./CreateProject";
import DeletePro from "./DeleteProject";
import ProjectCard from "../../components/ProjectCard";

// get All project from global
import { projectsGl } from "../../App";

function Home({ layouts, setLayouts, Robots }) {
    // get token from locale storage to send it in the request
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));

    const [projectsG, setProjectsG] = useContext(projectsGl);

    const [Loading, setLoading] = useState(false);

    const [delProIndex, setDelProIndex] = useState(null);
    const [delProName, setDelProName] = useState(null);

    // Request to get all projects
    useEffect(() => {
        setLoading(true);
        (async () => {
            await axios
                .get(`https://pathfinder-v1.herokuapp.com/maps/projects/`, {
                    headers: { Authorization: `Token ${token}` },
                })
                .then((res) => {
                    setProjectsG(res.data);
                    setLoading(false);
                })
                .catch((er) => {
                    toast.error(er.message, "Please refresh the page");
                    setLoading(false);
                });
        })();
    }, [token, setProjectsG]);
    return (
        <>
            <CreateProject
                layouts={layouts.createProject}
                setLayouts={setLayouts}
                Robots={Robots}
                projects={projectsG}
                setProjects={setProjectsG}
            />

            <DeletePro
                layouts={layouts.deletePro}
                setLayouts={setLayouts}
                delProIndex={delProIndex}
                delProName={delProName}
                projects={projectsG}
                setProjects={setProjectsG}
            />
            <div className="mb-4 d-flex justify-content-between">
                <h3 className=" text-light">All Projects</h3>
                <Button
                    style={{
                        height: "42px",
                        fontWeight: "600",
                        background: "none",
                        color: "#d3a42e",
                        border: "3px solid #d3a42e",
                        outline: "none",
                        boxShadow: "none",
                        margin: "auto 0",
                    }}
                    onClick={() =>
                        setLayouts({ ...layouts, createProject: true })
                    }
                >
                    Create a project
                </Button>
            </div>
            {/* Map on projectsG to create all projects */}
            <Row className="d-flex justify-content-evenly">
                {projectsG.length ? (
                    projectsG.map((project, i) => (
                        <Col className="w-auto mb-4" lg={4} key={i}>
                            <ProjectCard
                                id={project?.project_id}
                                projectAuth={project?.user}
                                name={project?.project_name}
                                is_working={project?.is_working}
                                is_done={project?.is_done}
                                control_type={project?.control_type}
                                robot={project?.robot}
                                // progress={'project.progress'}
                                date={project?.created}
                                layouts={layouts}
                                setLayouts={setLayouts}
                                setDelProIndex={setDelProIndex}
                                setDelProName={setDelProName}
                            />
                        </Col>
                    ))
                ) : (
                    <>
                        {Loading && (
                            <h3 className="text-white text-center">
                                Loading...
                            </h3>
                        )}
                    </>
                )}

                {/* if there is no data or there is no loading  */}
                {!projectsG.length && !Loading && (
                    <h3 className="text-white text-center">
                        There are no projects
                    </h3>
                )}
            </Row>
        </>
    );
}

export default Home;
