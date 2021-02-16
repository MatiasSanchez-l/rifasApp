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
                        <Navbar.Brand>
                            <Link to="/" className="header-link">
                                <img src={logo} className="img-fluid img-header mx-2" alt="Logo | Pagina " />
                                #JuntosxOscar
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link eventKey="1" as={Link} to="/">Inicio</Nav.Link>
                                <Nav.Link eventKey="2" as={Link} to="/comprarBono">Comprar Bonos</Nav.Link>
                                <Nav.Link eventKey="3" as={Link} to="/contacto">Contacto</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </header>
        )
    }
}
