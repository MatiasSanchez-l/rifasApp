import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import DataTable from 'react-data-table-component';

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

export default class Admin extends Component {

    state = {
        cantidadRifasAGenerar: '',
        rifas: []
    }
    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/rifas');
        const arrayNuevo = this.verificarCamposVacios(res.data.data.rifas);
        this.setState({
            rifas: arrayNuevo
        })
    }
    verificarCamposVacios = (arreglo) => {
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
    generarRifas = async e => {
        e.preventDefault();
        if (this.state.cantidadRifasAGenerar === "" || this.state.cantidadRifasAGenerar === '0') {
            swal({
                title: "Ocurrio un error",
                text: "Ocurrio un error al crear las rifas, por favor intentelo de nuevo",
                icon: "error"
            })
        } else {
            const res = await axios.post('http://localhost:5000/rifas/crear/' + this.state.cantidadRifasAGenerar);
            if (res.status === 200) {
                this.componentDidMount();
                swal({
                    title: "Creadas Correctamente",
                    text: "Cantidad de rifas creadas " + this.state.cantidadRifasAGenerar,
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
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="mt-3">
                <h3 className="text-center">
                    Bienvenido a la Seccion Admin
                </h3>
                <div className="row p-2 mt-3">
                    <div className="col-12 col-md-4">
                        <h3><i className="fas fa-caret-right"></i> Generar Rifas</h3>
                    </div>

                    <div className="col-12 col-md-8">
                        <form onSubmit={this.generarRifas}>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="cantidadRifasAGenerar" className="form-label"><span className="fs-6"> Ingrese la cantidad de rifas que desea generar</span></label>
                                </div>
                                <div className="col-6">
                                    <input type="number" name="cantidadRifasAGenerar" className="form-control" onChange={this.onInputChange} defaultValue={this.state.cantidadRifasAGenerar} />
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
                            data={this.state.rifas}
                            title="Informacion Sobre Las Rifas"
                            pagination
                            fixedHeader
                            theme="dark"
                            fixedHeaderScrollHeight="500px"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
