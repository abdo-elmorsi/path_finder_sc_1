import React, { useEffect, useMemo, useState } from "react";

// React Data Table Comp To handle the table
import DataTable from "react-data-table-component";

// Bootstrap
import { Card, Col, Form, Row } from "react-bootstrap";
const ProjectTablePois = ({ Data, GasType, setGasType }) => {
    const [Filter, setFilter] = useState("");
    const [NewData, setNewData] = useState([]);

    const uniqueValues = useMemo(() => {
        let unique = [];
        NewData.forEach((ele) => {
            if (
                ele?.gas_type !== null &&
                unique.indexOf(ele?.gas_type) === -1
            ) {
                unique.push(ele?.gas_type);
                console.log(ele.gas_type);
            }
        });
        // (unique = unique.sort());
        return unique;
    }, [NewData]);
    // handle filter By Id
    useEffect(() => {
        const newData = Data?.filter((item) => {
            return item?.project_data_id.toString().includes(Filter) || false;
        });
        setNewData(newData);
    }, [Filter, Data]);

    // Columns to handle Table Header
    const columns = [
        {
            name: `Id`,
            selector: (row) => row?.project_data_id,
            sortable: true,
            maxWidth: "90px",
        },
        {
            name: `Project`,
            selector: (row) => row?.project,
            sortable: true,
            maxWidth: "90px",
        },
        {
            name: `Time collected`,
            selector: (row) => row?.time_collected.slice(11, 19),
            sortable: true,
            minWidth: "110px",
        },
        {
            name: `Temperature`,
            selector: (row) => row?.temperature,
            sortable: true,
            minWidth: "110px",
        },
        {
            name: `Humidity`,
            selector: (row) => row?.humidity,
            sortable: true,
            minWidth: "110px",
        },
        {
            name: `Gas reading`,
            selector: (row) =>
                row?.gas_reading ? row?.gas_reading : "No data",
            sortable: true,
            minWidth: "110px",
        },
        {
            name: `Gas type`,
            selector: (row) => (row?.gas_type ? row.gas_type : "No data"),
            sortable: true,
            minWidth: "110px",
        },

        {
            name: `Speed`,
            selector: (row) => row?.speed,
            sortable: true,
            minWidth: "110px",
        },
        {
            name: `X position`,
            selector: (row) => row?.x_position,
            sortable: true,
            minWidth: "110px",
        },
        {
            name: `Y position`,
            selector: (row) => row?.y_position,
            sortable: true,
            minWidth: "110px",
        },
    ];

    return (
        <Card style={{ background: "#0c1824" }}>
            {/* table header (input search And selectBox Gas Type) */}
            <Card.Header className="text-white text-start">
                <Row className="align-items-center mb-2">
                    <Col sm="12" md="6" className="">
                        <h5 className="">Project readings Poisonous</h5>
                    </Col>
                    {/* Input search */}
                    <Col sm="12" md="3">
                        <Form.Group className="">
                            <Form.Label className="text-white">
                                Search
                            </Form.Label>
                            <Form.Control
                                className="text-white"
                                style={{
                                    background: "#0c1824",
                                }}
                                value={Filter}
                                type="search"
                                id="search"
                                onChange={(e) => setFilter(e.target.value)}
                                placeholder={`Id...`}
                            />
                        </Form.Group>
                    </Col>
                    {/* Select box */}
                    <Col sm="12" md="3">
                        <Form.Group className="mt-3 mt-md-0">
                            <Form.Label className="text-white">
                                Choose Poisonous Gas Type
                            </Form.Label>
                            <Form.Select
                                className="text-white"
                                style={{
                                    background: "#0c1824",
                                    cursor: "pointer",
                                }}
                                aria-label="Floating label select example"
                                onChange={(e) => setGasType(e.target.value)}
                            >
                                <option value="">All Types</option>
                                {uniqueValues.map((ele) => {
                                    return <option key={ele}>{ele}</option>;
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Header>
            {/* Table */}
            <Card.Body className="p-0">
                <DataTable
                    columns={columns}
                    data={NewData.filter((ele) => {
                        return ele?.gas_type?.includes(GasType);
                    })}
                    highlightOnHover
                    pagination
                    theme="solarized"
                />
            </Card.Body>
        </Card>
    );
};

export default ProjectTablePois;
