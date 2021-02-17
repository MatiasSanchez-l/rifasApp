import './App.css';
import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from './components/Home';
import CompraRifa from './components/CompraRifa';
import Contacto from './components/Contacto';
import Dashboard from './components/Dashboard';
import Premios from './components/Premios';
import Login from './components/Login';
//import Footer from './components/Footer';

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      const response = await fetch("https://www.juntosxoscar.com.ar/usuarios/verificado", {
        method: "GET",
        headers: { token: localStorage.token }
      });
      try {
        const parseRes = await response.json();

        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (error) {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <Fragment>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/matisanti" component={Home} />
            <Route exact path="/comprarBonomatisanti" component={CompraRifa} />
            <Route exact path="/contactomatisanti" component={Contacto} />
            <Route exact path="/premiosmatisanti" component={Premios} />
            <Route exact path="/loginmatisanti" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to="/dashboardmatisanti" />)} />
            <Route exact path="/dashboardmatisanti" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/loginmatisanti" />} />
            <Route render={() => <Redirect to={{ pathname: "/matisanti" }} />} />
          </Switch>
        </div>
        
      </Router>
    </Fragment>
  );
}

export default App;
