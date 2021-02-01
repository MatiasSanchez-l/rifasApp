import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import './ComprarRifa.css';
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
                text: "Tu cantidad de rifas son " + this.state.cantidadRifas + "\n Tus numeros asignados son: " + res.data.rifas_compradas.map(rifa => rifa),
                icon: "success"
            });
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
                    <h3 className="text-center">¿Como comprar tu rifa?</h3>
                    <div className="row">
                        <div className="col-12 col-md-6 ">
                            <h5 className="fw-bold"><i class="fas fa-caret-right"></i> Primer paso</h5>
                            <p>Seleccione la cantidad de rifas que deseas comprar.</p>
                        </div>
                        <div className="col-12 col-md-6 ">
                            <h5 className="fw-bold"><i class="fas fa-caret-right"></i> Segundo paso</h5>
                            <p>Complete el formulario con los datos correspondientes.</p>
                        </div>
                        <div className="col-12 col-md-6 ">
                            <h5 className="fw-bold"><i class="fas fa-caret-right"></i> Tercer paso</h5>
                            <p>Seleccione el boton 'continuar' para efectuar el pago de su contribucion.</p>
                        </div>
                    </div>
                </div>
                <hr className="hr my-3" />
                <div>
                    <div>
                        <h5 className="fw-bold text-center m-1">Elija la cantidad de rifas</h5>
                        <div className="mt-3 text-center botones">
                            <button onClick={this.sumarCantidadRifas} value="1" className="btn btn-outline-dark mx-1 rounded">+ 1</button>
                            <button onClick={this.sumarCantidadRifas} value="10" className="btn btn-outline-dark mx-1 rounded">+ 10</button>
                            <button onClick={this.sumarCantidadRifas} value="20" className="btn btn-outline-dark mx-1 rounded">+ 20</button>
                            <button onClick={this.sumarCantidadRifas} value="50" className="btn btn-outline-dark mx-1 rounded">+ 50</button>
                            <button onClick={this.sumarCantidadRifas} value="100" className="btn btn-outline-dark mx-1 rounded">+ 100</button>
                        </div>
                    </div>
                    <div className="mt-3 text-center botones">
                        <button onClick={this.restarCantidadRifas} value="1" className="btn btn-outline-dark mx-1 rounded">- 1</button>
                        <button onClick={this.restarCantidadRifas} value="10" className="btn btn-outline-dark mx-1 rounded">- 10</button>
                        <button onClick={this.restarCantidadRifas} value="20" className="btn btn-outline-dark mx-1 rounded">- 20</button>
                        <button onClick={this.restarCantidadRifas} value="50" className="btn btn-outline-dark mx-1 rounded">- 50</button>
                        <button onClick={this.restarCantidadRifas} value="100" className="btn btn-outline-dark mx-1 rounded">- 100</button>
                    </div>
                    <div className="p-2 mt-3">
                        <div className="d-flex c-espe justify-content-between">
                            <div>
                                <h3 className="">Rifas: {this.state.cantidadRifas}</h3>
                                <h3 className="">Valor total: ${this.state.valorTotal}</h3>
                            </div>
                            <button onClick={this.restarCantidad} className="btn"><i className="fas fa-minus"></i></button>
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
            </div>
        )
    }
}
