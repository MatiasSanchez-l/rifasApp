import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
//import emailjs from 'emailjs-com';


export default class CompraRifa extends Component {
    state = {
        cantidadRifas: 0,
        valorTotal: 0,
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        compras: {}
    }

    sumarCantidadRifas = e => {
        let cantidad = Number(e.target.value)
        let nuevaCantidad = this.state.cantidadRifas + cantidad;
        let nuevoValor = (nuevaCantidad * 100);
        this.setState({
            cantidadRifas: nuevaCantidad,
            valorTotal: nuevoValor
        });

    };

    restarCantidadRifas = e => {
        let cantidad = Number(e.target.value)
        let nuevaCantidad = this.state.cantidadRifas - cantidad;
        let nuevoValor = (nuevaCantidad * 100);
        this.setState({
            cantidadRifas: nuevaCantidad,
            valorTotal: nuevoValor
        });

    };

    sumarCantidad = () => {
        let cantidad = this.state.cantidadRifas += 1;
        let nuevoValor = (cantidad * 100);
        this.setState({
            cantidadRifas: cantidad,
            valorTotal: nuevoValor
        });
    };

    restarCantidad = () => {
        let cantidad = this.state.cantidadRifas -= 1;
        let nuevoValor = (cantidad * 100);

        this.setState({
            cantidadRifas: cantidad,
            valorTotal: nuevoValor
        });
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    registrarUsuarioYCompra = async e => {
        e.preventDefault();
        const newCompra = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            email: this.state.email,
            telefono: this.state.telefono,
            cantidad: this.state.cantidadRifas,
            valorTotal: this.state.valorTotal
        };
        this.setState({ compras: newCompra });

        const res = await axios.put('http://localhost:5000/rifas/comprar', newCompra);

        console.log(res.data.rifas_compradas);
        if (res.data.errores !== undefined) {
            swal({
                title: "Ocurrio un error en la compra de sus rifas",
                text: res.data.errores[0].mensaje,
                icon: "error"
            })
        }
        else {
            console.log(res)
            swal({
                title: "Gracias por tu colaboracion",
                text: "Tu cantidad de rifas son " + this.state.cantidadRifas + "\n Tus numeros asignados son: "+ res.data.rifas_compradas.map(rifa => rifa),
                icon: "success"
            })
            this.vaciarState();
            e.target.reset();
        }

    }

    vaciarState = () => {
        this.setState({
            cantidadRifas: 0,
            valorTotal: 0,
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            compras: {}
        })
    }

    render() {
        return (
            <div className="compraRifa mb-5">
                <div className="mt-2">
                    <h3>Pasos a seguir para la compra de rifas</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, doloremque esse provident labore laboriosam praesentium laudantium fugiat nulla vel reprehenderit beatae, enim quas minima cupiditate facilis, sed adipisci. Molestiae, minus?</p>
                    <ul>
                        <li className="my-2">
                            Elija la cantidad de numeros
                        </li>
                        <li className="my-2">
                            Complete los datos del formulario
                        </li>
                        <li className="my-2">
                            Proceda a realizar el pago
                        </li>
                    </ul>
                </div>
                <hr />
                <div>
                    <div>
                        <h5 className="m-1">Elija la cantidad de rifas</h5>
                        <div className="mt-3 text-center">
                            <button onClick={this.sumarCantidadRifas} value="1" className="btn btn-outline-dark mx-1 rounded">+1</button>
                            <button onClick={this.sumarCantidadRifas} value="10" className="btn btn-outline-dark mx-1 rounded">+10</button>
                            <button onClick={this.sumarCantidadRifas} value="20" className="btn btn-outline-dark mx-1 rounded">+20</button>
                            <button onClick={this.sumarCantidadRifas} value="50" className="btn btn-outline-dark mx-1 rounded">+50</button>
                            <button onClick={this.sumarCantidadRifas} value="100" className="btn btn-outline-dark mx-1 rounded">+100</button>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <button onClick={this.restarCantidadRifas} value="1" className="btn btn-outline-dark mx-1 rounded">-1</button>
                        <button onClick={this.restarCantidadRifas} value="10" className="btn btn-outline-dark mx-1 rounded">-10</button>
                        <button onClick={this.restarCantidadRifas} value="20" className="btn btn-outline-dark mx-1 rounded">-20</button>
                        <button onClick={this.restarCantidadRifas} value="50" className="btn btn-outline-dark mx-1 rounded">-50</button>
                        <button onClick={this.restarCantidadRifas} value="100" className="btn btn-outline-dark mx-1 rounded">-100</button>
                    </div>
                    <div className="p-2 ">
                        <h5 htmlFor="cantidadRifas" className="form-label">Cantidad especifica</h5>
                        <div className="d-flex c-espe justify-content-between">
                            <button onClick={this.restarCantidad} className="btn"><i className="fas fa-minus"></i></button>
                            <div>
                                <h3 className="text-center">Cantidad de rifas elegidas: {this.state.cantidadRifas}</h3>
                                <h3 className="text-center">Valor total: ${this.state.valorTotal}</h3>
                            </div>
                            <button onClick={this.sumarCantidad} className="btn"><i className="fas fa-plus"></i></button>
                        </div>
                    </div>

                </div>
                <hr />
                <div>
                    <div>
                        <h5>Formulario de datos</h5>
                        <p><span className="text-decoration-underline">Indicaciones: </span> <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod error, voluptatem repudiandae vero inventore itaque praesentium et, consectetur pariatur reiciendis similique quos excepturi doloremque placeat? Perspiciatis sapiente ratione provident rerum!</p>
                    </div>
                    <form onSubmit={this.registrarUsuarioYCompra} className="formulario-datos">
                        <div className="d-flex justify-content-between my-3">
                            <label htmlFor="nombre" className="form-label m-auto ">Nombre</label>
                            <input name="nombre" id="nombre" type="text" className="form-control ms-4" onChange={this.onInputChange} value={this.state.nombre} />
                        </div>
                        <div className="d-flex justify-content-between my-3">
                            <label htmlFor="apellido" className="form-label m-auto ">Apellido</label>
                            <input name="apellido" id="apellido" type="text" className="form-control ms-4" onChange={this.onInputChange} value={this.state.apellido} />
                        </div>
                        <div className="d-flex justify-content-between my-3">
                            <label htmlFor="email" className="form-label m-auto ">Email</label>
                            <input name="email" id="email" type="email" className="form-control ms-4" onChange={this.onInputChange} value={this.state.email} />
                        </div>
                        <div className="d-flex justify-content-between my-3">
                            <label htmlFor="telefono" className="form-label m-auto ">Telefono</label>
                            <input name="telefono" id="telefono" type="number" className="form-control ms-4" onChange={this.onInputChange} value={this.state.telefono} />
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-outline-secondary"> Proceder a realizar el pago</button>
                        </div>
                    </form>
                </div>
                <div className="my-5">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Cantidad Rifas</th>
                                <th>Valor Total</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <th>{this.state.compras.nombre !== undefined ? (this.state.compras.nombre) : "Sin valor asignado"}</th>
                                <th>{this.state.compras.apellido !== undefined ? (this.state.compras.apellido) : "Sin valor asignado"}</th>
                                <th>{this.state.compras.email !== undefined ? (this.state.compras.email) : "Sin valor asignado"}</th>
                                <th>{this.state.compras.telefono !== undefined ? (this.state.compras.telefono) : "Sin valor asignado"}</th>
                                <th>{this.state.compras.cantidad !== undefined ? (this.state.compras.cantidad) : "Sin valor asignado"}</th>
                                <th>{this.state.compras.valorTotal !== undefined ? ("$" + this.state.compras.valorTotal) : "Sin valor asignado"}</th>
                            </tr>

                        </tbody>


                    </table>
                </div>
            </div>
        )
    }
}
