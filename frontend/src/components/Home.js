import React, { Component } from 'react';
import './home.css';
import { Link as button } from 'react-router-dom';
import { Slider } from '@material-ui/core';
import regaloVerde from './helper/cajaVerde.png';

const marks = [
    {
        value: 0,
        label: '0%'
    },
    {
        value: 200000,
        label: '50%'
    },
    {
        value: 400000,
        label: '100%'
    }
]

export default class Home extends Component {
    state = {
        recaudado: 250000
    }
    irAlInstagram = () => {
        let win = window.open("https://www.instagram.com/ProyectoOscar/", '_blank');
        win.focus();
    }
    render() {
        return (
            <div className="container mt-3 mb-3">
                <h2 className="text-center">BONO CONTRIBUCI&Oacute;N</h2>
                <div className="text-center my-4">
                    <hr className="hr" />
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3>Nuestra Historia</h3>
                        <p className="lh-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Earum fuga dolorum aspernatur consequatur exercitationem?
                        Blanditiis dolor sunt modi quam totam iure ipsa veritatis soluta at, vel voluptatibus eveniet, quod fugit.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quia, labore ducimus animi sapiente
                        sed tempore laborum omnis ipsum, assumenda quo unde, optio laboriosam minus voluptas soluta! Quia, quidem minima.</p>
                        <div className="d-flex justify-content-between p-2">
                            <Slider
                                valueLabelDisplay="off"
                                value={this.state.recaudado}
                                min={0}
                                max={400000}
                                marks={marks}
                            />
                            <i className="p-1 fas fa-home"></i>
                        </div>
                        <div className="d-flex justify-content-center fs-5">
                            <p className="p-1 m-auto">SI QUIERES SEGUIR EL PROCESO DEL PROYECTO HAZ CLICK EN EL LOGO</p>
                            <div className="p-1 m-auto logo-instagram">
                                <p
                                    className="pointer"
                                    onClick={this.irAlInstagram}>
                                    <i className="fab fa-instagram fs-1"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Proyecto</h3>
                        <iframe
                            title="video papa"
                            width="560" height="315"
                            src="https://www.youtube.com/embed/vdE_cZgx_L0"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="videoHome"></iframe>
                    </div>
                </div>
                <hr />
                <div className="fondo-home1" >
                    <h5 className="text-center">Premios a sortear</h5>
                    <div className="row p-2">
                    </div>
                    <div className="row p-2">
                        <div className="col-4">
                            <div className="row premio-verde">
                                <img src={regaloVerde} alt="" />
                            </div>
                            <p className="text-center">1° premio</p>
                        </div>
                        <div className="col-4">
                            <div className="row premio-verde">
                                <img src={regaloVerde} alt="" />
                            </div>
                            <p className="text-center">2° premio</p>
                        </div>
                        <div className="col-4">
                            <div className="row premio-verde">
                                <img src={regaloVerde} alt="" />
                            </div>
                            <p className="text-center">3° premio</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-dark btn-outline-verde-home" to="/premios">Ver premios</button>
                    </div>
                </div>
            </div>
        )
    }
}
/*

                        <div className="col-4">
                            <div className="row premio">
                                <div>s</div>
                            </div>
                            <p className="text-center">1° premio</p>
                        </div>
                        <div className="col-4">
                            <div className="row premio">
                                <div>s</div>
                            </div>
                            <p className="text-center">2° premio</p>
                        </div>
                        <div className="col-4">
                            <div className="row premio">
                                <div>s</div>
                            </div>
                            <p className="text-center">3° premio</p>
                        </div>
*/
