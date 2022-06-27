import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import navbot from "../images/navbot.svg";
import Luffy from "../images/Luffy.jpg";

const iconStyle = {
    width: "35px",
    height: "35px",
};

function NavbarCom({ helpIcons }) {
    const Navigate = useNavigate();
    const UserLogin = JSON.parse(localStorage.getItem("UserLogin") || {});

    const handleLogOut = () => {
        localStorage.removeItem("UserLogin");
        Navigate("/login");
    };
    return (
        <Navbar
            collapseOnSelect
            expand="md"
            variant="dark"
            style={{ background: "#191e3b" }}
        >
            <Container fluid>
                <Navbar.Brand
                    as={NavLink}
                    to="/"
                    className="d-flex justify-content-center align-items-center"
                >
                    {" "}
                    <img
                        className="App-logo"
                        src={navbot}
                        style={iconStyle}
                        alt=""
                        srcSet=""
                    />
                    <h5 className="mb-0">Path-finder-sc-1</h5>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* left part */}
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">
                            Projects
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/robots">
                            Robots
                        </Nav.Link>
                        {UserLogin.username === "tony" && (
                            <Nav.Link as={NavLink} to="/users">
                                Users
                            </Nav.Link>
                        )}
                    </Nav>
                    {/* right part */}
                    <Nav className="d-flex align-items-center">
                        {helpIcons && (
                            <NavDropdown
                                className=""
                                title="Help"
                                id="collasible-nav-dropdown"
                            >
                                {helpIcons?.map((item, i) => (
                                    <NavDropdown.Item
                                        key={i}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        {item.text}{" "}
                                        <span
                                            style={{
                                                width: "14px",
                                                height: "14px",
                                                display: "inline-block",
                                                background: `${item.color}`,

                                                borderRadius: "50%",
                                            }}
                                        ></span>
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        )}

                        <NavDropdown
                            title={
                                <>
                                    <img
                                        src={Luffy}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            border: "2px solid #d3a42e",
                                        }}
                                        alt="user img"
                                    />{" "}
                                    <span>{UserLogin?.username}</span>
                                </>
                            }
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item
                                as={NavLink}
                                to="/setting"
                                className=""
                            >
                                Setting
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={handleLogOut}
                                className=""
                            >
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarCom;
