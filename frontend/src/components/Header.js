import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import logo from './helper/casa.png';

export default class Header extends Component {

    render() {
        return (
            <header className="border-bottom">
                <Navbar className="p-2 nav-bg" collapseOnSelect expand="lg">
                    <div className="container">
                        <Navbar.Brand href="#home">
                            <img src={logo} className="img-fluid img-header mx-2" alt="Logo | Pagina " />
                            #JuntosxOscar
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link eventKey="1" as={Link} to="/">Inicio</Nav.Link>
                                <Nav.Link eventKey="2" as={Link} to="/comprarRifa">Comprar Bonos</Nav.Link>
                                <Nav.Link eventKey="3" as={Link} to="/contacto">Contacto</Nav.Link>
                                <Nav.Link eventKey="4" as={Link} to="/admin">Admin</Nav.Link>

                            </Nav>

                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </header>
        )
    }
}
/*

<nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Rifas App</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Incio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Acerca de Oscar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/comprarRifa">Comprar Rifas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Contacto</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

*/