import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        nombre_usuario: "",
        contrasenia: ""
    });

    const { nombre_usuario, contrasenia } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { nombre_usuario, contrasenia };
            const response = await fetch("https://juntosxoscar.com.ar/usuarios/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Login successfully Fagliano, welcome!");
            } else {
                toast.error(parseRes)
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={onSubmitForm} className="form" >
                <div className="row  mt-1">
                    <div className="col-6">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="text" name="nombre_usuario" value={nombre_usuario} onChange={e => onChange(e)} />

                    </div>
                    <div className="col-6">
                        <label className="form-label">Contrasenia</label>
                        <input className="form-control" type="password" name="contrasenia" value={contrasenia} onChange={e => onChange(e)} />
                    </div>
                    <div className="col-12 mt-3">
                        <button className="form-control btn-outline-success" type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;
