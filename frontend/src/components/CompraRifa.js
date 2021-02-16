import React, { Component, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import './css/ComprarRifa.css';


export default class CompraRifa extends Component {
    state = {
        cantidadRifas: 0,
        valorTotal: 0,
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        compras: {},
        isWaiting: false
    }
    async componentDidMount() {
        let urlElements = window.location.href.split('&')
        if (urlElements[2]) {
            if (urlElements[3].split('=')[1] === "approved") {
                try {
                    const external_reference = urlElements[4].split('=')[1];
                    const res = await fetch('https://www.juntosxoscar.com.ar/rifas/obtener_rifas_compra/' + external_reference, {
                        method: "GET"
                    });
                    const response = await res.json();
                    swal({
                        title: "Gracias por tu colaboracion",
                        text: "Tu cantidad de rifas son " + (response.rifas_compradas).length + "\n Tus numeros asignados son: " + response.rifas_compradas.map(rifa => rifa),
                        icon: "success"
                    });

                } catch (error) {
                    console.log(error.message)
                }
            } else {
                swal({
                    title: "Ocurrio un error en el pago",
                    text: "Al momento de realizar la compra, sucedio un error. Por favor intentelo de nuevo!",
                    icon: "error"
                });
            }
        }
    }

    sumarCantidadRifas = e => {
        let cantidad = Number(e.target.value)
        let nuevaCantidad = this.state.cantidadRifas + cantidad;
        let nuevoValor = (nuevaCantidad * 200);
        this.setState({
            cantidadRifas: nuevaCantidad,
            valorTotal: nuevoValor
        });
    };

    restarCantidadRifas = e => {
        let cantidad = Number(e.target.value)

        let nuevaCantidad = this.state.cantidadRifas - cantidad <= 0 ? 0 : this.state.cantidadRifas - cantidad;
        let nuevoValor = (nuevaCantidad * 200);
        this.setState({
            cantidadRifas: nuevaCantidad,
            valorTotal: nuevoValor
        });
    };

    sumarCantidad = () => {
        let cantidad = this.state.cantidadRifas += 1;
        let nuevoValor = (cantidad * 200);
        this.setState({
            cantidadRifas: cantidad,
            valorTotal: nuevoValor
        });
    };

    restarCantidad = () => {
        let cantidad = this.state.cantidadRifas === 0 ? 0 : this.state.cantidadRifas -= 1;
        let nuevoValor = (cantidad * 200);

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
        let camposValidos = true;
        e.preventDefault();
        this.setState({
            isWaiting: true
        });
        if (1 > 0) {
            camposValidos = true;
        }

        if (camposValidos) {
            console.log("true" + camposValidos);
        } else {
            console.log("false" + camposValidos);
        }
        const newCompra = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            email: this.state.email,
            telefono: this.state.telefono,
            cantidad: this.state.cantidadRifas,
        };

        this.setState({ compras: newCompra });

        const res = await axios.put('https://www.juntosxoscar.com.ar/rifas/comprar_mp', newCompra);
        if (res.data.errores !== undefined) {
            swal({
                title: "Ocurrio un error en la compra de sus rifas",
                text: res.data.errores[0].mensaje,
                icon: "error"
            })
            this.setState({
                isWaiting: false
            });
        } else {
            let win = window.open(res.data.data.init_point, "_self");
            win.focus();
            this.vaciarState();
            e.target.reset();
            this.setState({
                isWaiting: false
            });
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
                    <h2 className="text-center mb-3">¿C&Oacute;MO COMPRAR TU BONO?</h2>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h5 className="fw-bold"> Primer paso</h5>
                            <p>Seleccione la cantidad de bonos que deseas comprar.</p>
                        </div>
                        <div className="col-12 text-center">
                            <h5 className="fw-bold"> Segundo paso</h5>
                            <p>Complete el formulario con los datos correspondientes.</p>
                        </div>
                        <div className="col-12 text-center">
                            <h5 className="fw-bold"> Tercer paso</h5>
                            <p>Seleccione el bot&oacute;n 'continuar' para efectuar el pago de su contribuci&oacute;n.</p>
                        </div>
                    </div>
                </div>
                <hr className="hr my-3" />
                <div>
                    <div>
                        <h5 className="fw-bold text-center m-1">Elija la cantidad de bonos</h5>
                        <p className="text-center">Precio por Unidad: $200</p>
                        <div className="mt-3 text-center botones">
                            <button disabled={this.state.isWaiting} onClick={this.sumarCantidadRifas} value="1" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">+ 1</button>
                            <button disabled={this.state.isWaiting} onClick={this.sumarCantidadRifas} value="10" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">+ 10</button>
                            <button disabled={this.state.isWaiting} onClick={this.sumarCantidadRifas} value="20" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">+ 20</button>
                            <button disabled={this.state.isWaiting} onClick={this.sumarCantidadRifas} value="50" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">+ 50</button>
                            <button disabled={this.state.isWaiting} onClick={this.sumarCantidadRifas} value="100" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">+ 100</button>
                        </div>
                    </div>
                    <div className="mt-3 text-center botones">
                        <button disabled={this.state.isWaiting} onClick={this.restarCantidadRifas} value="1" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">- 1</button>
                        <button disabled={this.state.isWaiting} onClick={this.restarCantidadRifas} value="10" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">- 10</button>
                        <button disabled={this.state.isWaiting} onClick={this.restarCantidadRifas} value="20" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">- 20</button>
                        <button disabled={this.state.isWaiting} onClick={this.restarCantidadRifas} value="50" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">- 50</button>
                        <button disabled={this.state.isWaiting} onClick={this.restarCantidadRifas} value="100" className="btn btn-outline-dark btn-outline-verde mx-1 my-1 rounded">- 100</button>
                    </div>
                    <div className="p-2 mt-3">
                        <div className="row justify-content-center c-espe">
                            <div className="col-6 datos">
                                <h3 className="">Bonos: {this.state.cantidadRifas}</h3>
                                <h3 className="">Valor total: ${this.state.valorTotal}</h3>
                            </div>
                            <div className="col-6">
                                <button disabled={this.state.isWaiting} onClick={this.restarCantidad} className="btn btn-outline-verde-signos mx-3"><i className="fas fa-minus"></i></button>
                                <button disabled={this.state.isWaiting} onClick={this.sumarCantidad} className="btn btn-outline-verde-signos mx-3"><i className="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
                <hr className="hr my-3" />
                <div>
                    <div>
                        <h5 className="fw-bold text-center mb-4">Formulario de datos</h5>
                    </div>
                    <form onSubmit={this.registrarUsuarioYCompra} className="formulario-datos">
                        <div className="row justify-content-between my-3">
                            <div className="col-3">
                                <label htmlFor="nombre" className="form-label m-auto ">Nombre</label>
                            </div>
                            <div className="col-9">
                                <input name="nombre" id="nombre" type="text" className="form-control" placeholder="nombre" onChange={this.onInputChange} value={this.state.nombre} />
                            </div>
                        </div>

                        <div className="row justify-content-between my-3">
                            <div className="col-3">
                                <label htmlFor="apellido" className="form-label m-auto ">Apellido</label>
                            </div>
                            <div className="col-9">
                                <input name="apellido" id="apellido" type="text" className="form-control" placeholder="apellido" onChange={this.onInputChange} value={this.state.apellido} />
                            </div>
                        </div>
                        <div className="row justify-content-between my-3">
                            <div className="col-3">
                                <label htmlFor="email" className="form-label m-auto ">Email</label>
                            </div>
                            <div className="col-9">
                                <input name="email" id="email" type="email" className="form-control" placeholder="email@email.com" onChange={this.onInputChange} value={this.state.email} />
                            </div>
                        </div>
                        <div className="row justify-content-between my-3">
                            <div className="col-3">
                                <label htmlFor="telefono" className="form-label m-auto ">Tel&eacute;fono</label>
                            </div>
                            <div className="col-9">
                                <input name="telefono" id="telefono" type="number" className="form-control" placeholder="11 12345678" onChange={this.onInputChange} value={this.state.telefono} />
                            </div>
                        </div>
                        <p className="text-center">Indicaciones: </p>
                        <ul className="a">
                            <li>Ingresar un email valido como el de ejemplo.</li>
                            <li>Ingresar un numero de telefono valido como el de ejemplo.</li>
                            <li>Antes de realizar el pago, verifique sus datos ya que con ellos sera contactado si gana un premio.</li>
                            <li>Los numeros asignados se le mostraran en pantalla luego de que realize el pago, a su vez se le enviaran al email que haya puesto.</li>
                            <li>Ante cualquier consulta o pregunta no dude en pasar por nuestra seccion de contacto y dejarnos su problema.</li>
                        </ul>
                        <div className="text-end">
                            <button disabled={this.state.isWaiting} type="submit" className="btn btn-outline-dark btn-outline-verde">Proceder a realizar el pago</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
