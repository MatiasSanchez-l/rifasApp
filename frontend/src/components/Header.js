import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Header extends Component {
    render() {
        return (
            <header className="">
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
                                    <Link className="nav-link" to="/">Donar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Contacto</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}
