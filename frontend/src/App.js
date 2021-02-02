import './App.css';
import React from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import CompraRifa from './components/CompraRifa';
import Contacto from './components/Contacto';
import Admin from './components/Admin';
import Premios from './components/Premios';
import Instagram from './components/Instagram';


function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/comprarRifa" component={CompraRifa} />
        <Route exact path="/contacto" component={Contacto} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/premios" component={Premios} />
        <Route exact path="/instagram" component={Instagram} />
      </div>
    </Router>
  );
}

export default App;
