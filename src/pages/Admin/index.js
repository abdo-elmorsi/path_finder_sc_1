import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Bootstrap
import { Button } from "react-bootstrap";

// React Data Table Comp To handle the table
import DataTable from "react-data-table-component";

// Icon
import trash from "../../images/trash.svg";

// Import Component Delete User
import DeleteUser from "./DeleteUser";

function Admin({ layouts, setLayouts }) {
    // Get Token From Locale storage
    const { token } = JSON.parse(localStorage.getItem("UserLogin"));

    const [Users, setUsers] = useState([]);

    const [Loading, setLoading] = useState(false);
    const [delUserIndex, setDelUserIndex] = useState(null);
    const [delUserName, setDelUserName] = useState(null);

    // Columns to handle Table Header
    const columns = [
        {
            name: `Id`,
            selector: (row) => row?.id,
            sortable: true,
            maxWidth: "90px",
        },
        {
            name: `User name`,
            selector: (row) => row?.username,
            sortable: true,
        },
        {
            name: `Email`,
            selector: (row) => row?.email,
            sortable: true,
            minWidth: "110px",
        },
        {
            name: `Phone`,
            selector: (row) => row.phone || "No phone",
            sortable: true,
            minWidth: "110px",
        },
        {
            name: `Actions`,
            selector: (row) => <Actions id={row.id} name={row.username} />,
            sortable: true,
            minWidth: "110px",
        },
    ];

    const Actions = ({ id, name }) => {
        return (
            <Button
                variant="outline-dark"
                size="sm"
                onClick={() => {
                    setDelUserIndex(id);
                    setDelUserName(name);
                    setLayouts({
                        ...layouts,
                        deleteUser: true,
                    });
                }}
            >
                <img src={trash} alt="two" />
            </Button>
        );
    };

    // Request to get all users
    useEffect(() => {
        setLoading(true);
        (async () => {
            await axios
                .get("https://pathfinder-v1.herokuapp.com/maps/users/", {
                    headers: { Authorization: `Token ${token}` },
                })
                .then((res) => {
                    setUsers(res.data);
                    setLoading(false);
                })
                .catch((er) => {
                    toast.error(er.message, "Please refresh the page");
                    setLoading(false);
                });
        })();
    }, [token]);

    return (
        <>
            <DeleteUser
                layouts={layouts.deleteUser}
                setLayouts={setLayouts}
                delUserIndex={delUserIndex}
                delUserName={delUserName}
                Users={Users}
                setUsers={setUsers}
            />
            <div className="pt-4 text-start">
                {!Loading ? (
                    <DataTable
                        title="All Users"
                        columns={columns}
                        data={Users}
                        highlightOnHover
                        pagination
                        theme="solarized"
                    />
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        </>
    );
}

export default Admin;
