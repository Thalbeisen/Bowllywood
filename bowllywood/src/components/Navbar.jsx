import './../sass/styles.scss';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import imgAccueil from './../assets/img/accueil.png';

const Navbar = () => {
    return (
        <>
            <Router>
                <nav className="side-nav navbar-expand-lg">
                    <button class="navbar-toggler grow" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span><i class="fa-solid fa-bars p-3 text-white"></i></span>
                    </button>
                    <div className="wrapper" id="navbarTogglerDemo02">
                        <div className="nav-bloc">
                            <Link to="/home" className='text-decoration-none text-black'>
                                <i className="fa-solid fa-house text-black"></i>
                                <p className='text-black'>Accueil</p>
                            </Link>
                        </div>
                        <div className="nav-bloc">
                            <Link to="/reservation" className='text-decoration-none text-black'>
                                <i className="fa-solid fa-money-bill text-black"></i>
                                <p className='text-black'>Réservation</p>
                            </Link>
                        </div>
                        <div className="nav-bloc">
                            <Link to="/menu" className='text-decoration-none text-black'>
                                <i className="fa-solid fa-utensils text-black"></i>
                                <p>Menu</p>
                            </Link>
                        </div>
                        <div className="nav-bloc">
                            <Link to="/mark" className='text-decoration-none text-black'>
                                <i className="fa-solid fa-star text-black"></i>
                                <p>Évaluation</p>
                            </Link>
                        </div>
                        <div className="nav-bloc ">
                            <Link to="/register" className="text-black text-decoration-none">Inscription</Link>
                        </div>
                        <div className="nav-bloc">
                            <Link to="/login" className="text-black text-decoration-none">Connexion</Link>
                        </div>
                    </div>
                </nav>
                
                <Routes>
                    <Route path="/">{/* <HomeScreen /> */}</Route>
                    <Route path="/reservation">{/* < /> */}</Route>
                    <Route path="/menu">{/* <MenuScreen /> */}</Route>
                    <Route path="/mark">{/* <MarkScreen /> */}</Route>
                    <Route path="/register">{/* <RegisterScreen /> */}</Route>
                    <Route path="/login">{/* < LoginScreen/> */}</Route>
                </Routes>
            </Router>
                
            <div className="vh-100">
                <img src={imgAccueil} alt="Accueil" className="imgHome" />
            </div>
        </>
    );
};

export default Navbar;
