import React from "react";

// Bootstrap
import { Col, Row } from "react-bootstrap";

const ReadingCounter = ({ name, value, start, end }) => {
    // to create numbers from the start value to end value
    const counterCreating = (start, end) => {
        const counter = [];
        for (let i = start; i <= end; i++) {
            counter.push(i);
        }
        return counter;
    };

    return (
        <div
            className="d-flex flex-column align-items-center"
            style={{ width: "" }}
        >
            {/* Chart Header */}
            <div
                style={{
                    background: "#1d2e4c",
                    borderRadius: "50%",
                    width: "70px",
                    height: "70px",
                    display: "flex",
                }}
            >
                <span
                    style={{
                        background: "#0c1824",
                        fontWeight: "600",
                        borderRadius: "50%",
                        width: "55px",
                        height: "55px",
                        margin: "auto",
                        padding: "2px 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    {/* chart head */}
                    <span
                        style={{
                            color: "white",
                            position: "relative",
                            zIndex: "2",
                        }}
                    >
                        {value}
                    </span>
                    <svg
                        width="55"
                        height="55"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            position: "absolute",
                            inset: "0",
                            borderRadius: "50%",
                        }}
                    >
                        <g id="svg_4">
                            <path
                                fill={
                                    value < 10
                                        ? "#0065fd"
                                        : value < 25
                                        ? "#01b9ff"
                                        : value < 40
                                        ? "#00fffd"
                                        : value < 50
                                        ? "#00fe54"
                                        : value < 60
                                        ? "#d6a52f"
                                        : value < 70
                                        ? "#f05457"
                                        : value === 70
                                        ? "#f82828"
                                        : "#1d2e4c"
                                }
                                d="m0,16l0.8175,5.0588c0.8175,5.11305 2.445,15.14929 4.095,18.09235c1.63125,2.88881 3.2625,-1.45118 4.9125,-5.07237c1.63125,-3.56694 3.2625,-6.55068 4.9125,-5.0588c1.6275,1.49188 3.2625,7.18811 4.9125,7.22881c1.62375,-0.04068 3.2625,-5.73693 4.9125,-10.11761c1.62,-4.29931 3.2625,-7.28305 4.875,-5.79118c1.65375,1.49188 3.3,7.18811 4.9125,10.84998c1.65,3.66187 3.3,5.01812 4.9125,3.62118c1.64625,-1.45118 3.3,-5.79118 4.9125,-3.62118c1.6425,2.17 3.2625,10.84998 4.9125,10.84998c1.63875,0 3.2625,-8.67999 4.0875,-13.01998l0.825,-4.33999l0,30.37996l-0.8175,0c-0.8175,0 -2.445,0 -4.095,0c-1.63125,0 -3.2625,0 -4.9125,0c-1.63125,0 -3.2625,0 -4.9125,0c-1.6275,0 -3.2625,0 -4.9125,0c-1.62375,0 -3.2625,0 -4.9125,0c-1.62,0 -3.2625,0 -4.875,0c-1.65375,0 -3.3,0 -4.9125,0c-1.65,0 -3.3,0 -4.9125,0c-1.64625,0 -3.3,0 -4.9125,0c-1.6425,0 -3.2625,0 -4.9125,0c-1.63875,0 -3.2625,0 -4.0875,0l-0.825,0l0,-39.05994z"
                                id="svg_2"
                            />
                        </g>
                    </svg>
                </span>
            </div>
            {/* ************************************** */}
            {/* chart column */}
            <div
                style={{
                    width: "min-content",
                    background: "#1d2e4c",
                    padding: "13px 25px",
                    borderRadius: "10px",
                    position: "relative",
                    display: "flex",
                    margin: "10px",
                }}
            >
                {/* ***************************************** */}

                {/* Arrow to top */}
                <span
                    style={{
                        width: "10px",
                        height: "10px",
                        position: "absolute",
                        left: "50%",
                        top: "-3%",
                        transform: "translate(-50%, -3%)",
                        borderLeft: "15px solid transparent",
                        borderRight: "15px solid transparent",
                        borderBottom: "15px solid #1d2e4c",
                    }}
                ></span>
                {/* Arrow to buttom */}
                <span
                    style={{
                        width: "10px",
                        height: "10px",
                        position: "absolute",
                        left: "50%",
                        bottom: "-3%",
                        transform: "translate(-50%, -3%) rotateZ(180deg)",
                        borderLeft: "15px solid transparent",
                        borderRight: "15px solid transparent",
                        borderBottom: "15px solid #1d2e4c",
                    }}
                ></span>
                {/* ***************************************** */}
                {/* chart numbers and colors */}
                <Row
                    style={{
                        display: "flex",
                        width: "75px",
                        background: "#0c1824",
                        position: "relative",
                        borderRadius: "10px",
                        padding: "6px",
                    }}
                >
                    {/* Chart Numbers */}

                    <Col
                        style={{
                            width: "30px",
                            display: "flex",
                            flexDirection: "column-reverse",
                            alignItems: "end",
                            justifyContent: "space-between",
                            lineHeight: "1.2",
                            borderRadius: "10px",
                        }}
                    >
                        {counterCreating(start, end).map((e, i) => (
                            <span
                                key={i}
                                style={{
                                    fontSize: "10px",
                                    fontWeight: "600",
                                    color: "#fff",
                                    textAlign: "right",
                                }}
                            >
                                {e % 5 === 0 ? (e >= 0 ? `+${e}` : e) : ""}
                            </span>
                        ))}
                    </Col>

                    {/* Chart Colors */}
                    <Col
                        style={{
                            width: "30px",
                            display: "flex",
                            flexDirection: "column-reverse",
                            alignItems: "center",
                            position: "relative",
                            borderRadius: "10px",
                        }}
                    >
                        {counterCreating(start, end).map((e, index) => (
                            <span
                                key={index}
                                style={{
                                    width: e % 5 === 0 ? "27px" : "20px",
                                    height: e % 5 === 0 ? "5px" : "1px",
                                    background:
                                        e <= value && index < 10
                                            ? "#0065fd"
                                            : e <= value && index < 25
                                            ? "#01b9ff"
                                            : e <= value && index < 40
                                            ? "#00fffd"
                                            : e <= value && index < 50
                                            ? "#00fe54"
                                            : e <= value && index < 60
                                            ? "#d6a52f"
                                            : e <= value && index < 70
                                            ? "#f05457"
                                            : e <= value && index === 70
                                            ? "#f82828"
                                            : "#1d2e4c",
                                    marginTop: "2px",
                                    borderRadius: "10px",
                                }}
                            ></span>
                        ))}
                    </Col>
                </Row>
            </div>
            {/* ************************************** */}
            {/* name */}
            <div
                style={{
                    background: "#1d2e4c",
                    borderRadius: "5px",
                    width: "100px",
                    height: "42px",
                    display: "flex",
                }}
            >
                <span
                    style={{
                        color: "white",
                        background: "#0c1824",
                        fontWeight: "600",
                        borderRadius: "3px",
                        width: "85px",
                        margin: "auto",
                        padding: "5px 10px",
                        textAlign: "center",
                        fontSize: "65%",
                    }}
                >
                    {name}
                </span>
            </div>
        </div>
    );
};

export default ReadingCounter;
