import React from "react";
import NavbarCom from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { Container } from "react-bootstrap";

export default function Index(props) {
    return (
        <>
            <NavbarCom helpIcons={props.helpIcons} />
            <main className="py-3" style={{ minHeight: "calc(100vh - 150px)" }}>
                <Container fluid>{props.children}</Container>
            </main>
            <Footer />
        </>
    );
}
