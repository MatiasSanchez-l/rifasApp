import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import swal from 'sweetalert';

const columnas = [
    {
        name: "Id rifa",
        selector: "numero_rifa",
        sortable: true
    },
    {
        name: "Disponibilidad",
        selector: "disponible",
        sortable: true
    },
    {
        name: "Cliente Nombre",
        selector: "cliente_nombre",
        sortable: true
    },
    {
        name: "Cliente Apellido",
        selector: "cliente_apellido",
        sortable: true
    },
    {
        name: "Cliente Email",
        selector: "cliente_email",
        sortable: true
    },
    {
        name: "Cliente Telefono",
        selector: "cliente_telefono",
        sortable: true
    },
    {
        name: "Numero de Compra",
        selector: "compra_id",
        sortable: true
    }
]

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");

    const [inputs, setInputs] = useState({
        cantidadRifasAGenerar: ""
    });
    const [rifas, setRifas] = useState([]);

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

    function verificarCamposVacios(arreglo) {
        if (arreglo instanceof Array) {
            const arrayNuevo = [];
            for (let i = 0; i < arreglo.length; i++) {
                arrayNuevo[i] = arreglo[i];

                if (arrayNuevo[i].disponible) {
                    arrayNuevo[i].disponible = "Esta disponible";
                } else {
                    arrayNuevo[i].disponible = "No esta disponible";
                }

                if (arrayNuevo[i].compra_id === null) {
                    arrayNuevo[i].compra_id = "No hay una compra hecha";
                }

                if (arrayNuevo[i].cliente_nombre === null && arrayNuevo[i].cliente_email === null &&
                    arrayNuevo[i].cliente_telefono === null && arrayNuevo[i].cliente_apellido === null) {

                    arrayNuevo[i].cliente_nombre = "No comprada";
                    arrayNuevo[i].cliente_apellido = "No comprada";
                    arrayNuevo[i].cliente_email = "No comprada";
                    arrayNuevo[i].cliente_telefono = "No comprada";
                }

            }
            return arrayNuevo;
        } else {
            TypeError("No es un array")
        }
    }

    async function getRifas() {
        try {
            const res = await fetch("http://localhost:5000/rifas", {
                method: "GET"
            });
            const parseRes = await res.json();
            if (parseRes.status === "success") {
                const arrayNuevo = verificarCamposVacios(parseRes.data.rifas);
                setRifas(arrayNuevo);
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    /*async function componentDidMount() {
        const res = await axios.get('http://localhost:5000/rifas');
        const arrayNuevo = this.verificarCamposVacios(res.data.data.rifas);
        this.setState({
            rifas: arrayNuevo
        })
    }*/

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.info("Loggeed out successfully, goodbye Fagliano")
    }

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const cantidadRifasAGenerar = inputs;

    useEffect(() => {
        getName();
        getRifas();
    }, []);
    const generarRifas = async e => {
        e.preventDefault();
        try {
            if (cantidadRifasAGenerar.cantidadRifasAGenerar === "" || cantidadRifasAGenerar.cantidadRifasAGenerar === '0') {
                swal({
                    title: "Ocurrio un error",
                    text: "Ocurrio un error al crear las rifas, por favor intentelo de nuevo",
                    icon: "error"
                })
            } else {
                console.log(cantidadRifasAGenerar.cantidadRifasAGenerar)
                const res = await fetch('http://localhost:5000/rifas/crear/' + cantidadRifasAGenerar.cantidadRifasAGenerar, {
                    method: "POST",
                });
                if (res.status === 200) {
                    getRifas();
                    swal({
                        title: "Creadas Correctamente",
                        text: "Cantidad de rifas creadas " + cantidadRifasAGenerar.cantidadRifasAGenerar,
                        icon: "success"
                    });
                    e.target.reset();

                } else {
                    swal({
                        title: "Ocurrio un error",
                        text: "Ocurrio un error al crear las rifas, por favor intentelo de nuevo",
                        icon: "error"
                    })
                }
            }
        } catch (err) {
            console.error(err.message);
        }

    }
    return (
        <Fragment>
            <div className="container">
                <div className="row mt-3">
                    <h1 className="col-6">Dashboard {name}</h1>
                    <button onClick={e => logout(e)} className="btn btn-outline-danger col-6">Logout</button>
                </div>
                <div className="row p-2 mt-3">
                    <div className="col-12 col-md-4">
                        <h3><i className="fas fa-caret-right"></i> Generar Rifas</h3>
                    </div>

                    <div className="col-12 col-md-8">
                        <form onSubmit={generarRifas} >
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="cantidadRifasAGenerar" className="form-label"><span className="fs-6"> Ingrese la cantidad de rifas que desea generar</span></label>
                                </div>
                                <div className="col-6">
                                    <input type="number" name="cantidadRifasAGenerar" onChange={e => onChange(e)} className="form-control" />
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="mt-3 btn btn-success">Generar Rifas</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row p-2 mt-3">
                    <div className="col-12">
                        <h3><i className="fas fa-caret-right"></i> Rifas</h3>
                    </div>
                    <div className="col-12 table-responsive">
                        <DataTable
                            columns={columnas}
                            data={rifas}
                            title="Informacion Sobre Las Rifas"
                            pagination
                            fixedHeader
                            theme="dark"
                            fixedHeaderScrollHeight="500px"
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;