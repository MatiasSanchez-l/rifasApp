import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert'

export default class Admin extends Component {

    state = {
        cantidadRifasAGenerar: ''
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
                swal({
                    title: "Creadas Correctamente",
                    text: "Cantidad de rifas creadas " + this.state.cantidadRifasAGenerar,
                    icon: "success"
                })
            } else {
                swal({
                    title: "Ocurrio un error",
                    text: "Ocurrio un error al crear las rifas, por favor intentelo de nuevo",
                    icon: "error"
                })
            }
        }
        e.target.reset();
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div>
                <h3 className="text-center">
                    Bienvenido a la Seccion Admin
                </h3>
                <div className="p-2">
                    <ul>
                        <li>Generar Rifas</li>
                    </ul>
                    <form onSubmit={this.generarRifas}>
                        <div className="row">
                            <label htmlFor="cantidadRifasAGenerar" className="col-6 form-label">Ingrese la cantidad de rifas que desea generar</label>
                            <input type="number" name="cantidadRifasAGenerar" className=" form-control col-6" onChange={this.onInputChange} defaultValue={this.state.cantidadRifasAGenerar} />
                        </div>
                        <button type="submit" className="mt-3 btn btn-success">Generar Rifas</button>
                    </form>
                </div>
            </div>
        )
    }
}
