import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';


const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            setName(parseRes.nombre_usuario);
        } catch (err) {
            console.error(err.message);
        }

    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.info("Loggeed out successfully, goodbye Fagliano")
    }

    useEffect(() => {
        getName();
    }, []);

    return (
        <Fragment>
            <div className="container">
                <h1>Dashboard {name}</h1>
                <button onClick={e => logout(e)} className="btn btn-outline-danger">Logout</button>
            </div>
        </Fragment>
    );
};

export default Dashboard;