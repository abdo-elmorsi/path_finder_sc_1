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

    // to filter all data and get data between strDate and endDate
    const new_data = Data.filter((ele) => {
        return ele.time_collected < endDate && ele.time_collected > strDate;
    });
    const chart = {
        series: [
            {
                name: "Humidity",
                data: [...new_data?.map((el) => el?.humidity)],
            },
            {
                name: "Temperature",
                data: [...new_data?.map((el) => el?.temperature)],
            },
            {
                name: "Speed",
                data: [...new_data?.map((el) => el?.speed)],
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
                        <h5 className="">All readings</h5>
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
                    <Chart
                        options={chart.options}
                        series={chart.series}
                        height={350}
                    />
                )}{" "}
            </Card.Body>
        </Card>
    );
}
