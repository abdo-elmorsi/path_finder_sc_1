import React, { useState } from "react";
import moment from "moment";
import Chart from "react-apexcharts";
import DateTimePicker from "react-datetime-picker";
import { Card, Col, Row } from "react-bootstrap";
export default function ChartAllData({ Data }) {
    const [value, onChange] = useState("");
    const [valueTwo, onChangeTwo] = useState("");

    // 2022-01-15T11:15:37.919836Z
    const strDate = `${moment(value).format("YYYY-MM-DDThh:mm:ss")}.919836Z`;
    const endDate = `${moment(valueTwo).format("YYYY-MM-DDThh:mm:ss")}.919836Z`;

    const new_data = Data.filter((ele) => {
        return ele.time_collected < endDate && ele.time_collected > strDate;
    });

    const AllGasType = new_data.map((ele) => ele.gas_type);
    const unique_gas_types = new Set([...AllGasType]);
    const data = unique_gas_types.values();

    // seris for chart data
    const chart = {
        series: [
            {
                name: "Humidity",
                data: [
                    ...new_data?.map((el) => (el?.humidity / 10).toFixed(2)),
                ],
            },
            {
                name: "Temperature",
                data: [
                    ...new_data?.map((el) => (el?.temperature / 10).toFixed(2)),
                ],
            },
            {
                name: "Speed",
                data: [...new_data?.map((el) => (el?.speed / 10).toFixed(2))],
            },
        ],
        options: {
            chart: {
                type: "bar",
                zoom: {
                    enabled: true,
                },
            },

            theme: {
                mode: "dark",
                palette: "palette1",
                monochrome: {
                    enabled: false,
                    color: "#255aee",
                    shadeTo: "dark",
                    shadeIntensity: 0.65,
                },
            },

            legend: {
                position: "bottom",
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + "";
                    },
                },
            },
            xaxis: {
                type: "time",
                categories: [
                    ...new_data?.map(
                        (el) => `${el?.time_collected.slice(11, 19)}`
                    ),
                ],
            },
        },
    };

    return (
        <Card style={{ background: "rgb(25, 30, 59)" }}>
            <Card.Header className="text-white text-start">
                <Row className="align-items-center mb-2">
                    <Col sm="12" md="6" className="">
                        <h5 className="">Readings Poisonous</h5>
                    </Col>
                    {/* start date */}
                    <Col sm="12" md="3" className="ms-auto">
                        <h6>start date</h6>
                        <DateTimePicker
                            showLeadingZeros
                            onChange={onChange}
                            value={value}
                            format={"yyyy/MM/dd hh:mm:ss"}
                        />
                    </Col>
                    {/* end date */}
                    <Col sm="12" md="3" className="ms-auto">
                        <h6>end date</h6>
                        <DateTimePicker
                            showLeadingZeros
                            onChange={onChangeTwo}
                            value={valueTwo}
                            format={"yyyy/MM/dd hh:mm:ss"}
                        />
                    </Col>
                </Row>
            </Card.Header>

            <Card.Body className="p-0">
                {!value || !new_data.length ? (
                    <h2 className="text-white py-5">
                        Please choose avalid date
                    </h2>
                ) : (
                    <>
                        <Chart
                            options={chart.options}
                            series={chart.series}
                            height={350}
                        />
                        <div className="my-2">
                            <h2 className="text-white">All poisonous gas</h2>
                            <div className="mb-4 w-75 mx-auto d-flex justify-content-around flex-wrap">
                                {new Array(unique_gas_types.size)
                                    .fill({})
                                    .map((_, i) => {
                                        return (
                                            <span
                                                key={i}
                                                style={{
                                                    cursor: "auto",
                                                }}
                                                className="btn btn-secondary mx-2"
                                            >
                                                {data.next().value}{" "}
                                            </span>
                                        );
                                    })}
                            </div>
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}
