import './../sass/styles.scss';

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// IMPORTER LES ELEMENTS A METTRE DANS LA NAVIGATION COMME CI DESSOUS
// import Test from './Test';

const Template = () => {
    return (
        <>
                <nav className="side-nav navbar-expand-lg">
                    <button class="navbar-toggler grow" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span><i class="fa-solid fa-bars p-3"></i></span>
                    </button>
                    <div className="wrapper" id="navbarTogglerDemo02">
                        <div className="nav-bloc">
                            <Link to="/home" className='text-decoration-none text-black'>
                                <i className="fa-solid fa-house text-black"></i>
                                <p className='text-black'>Accueil</p>
                            </Link>
                        </div>
                        <div className="nav-bloc">
                            <Link to="/reservations" className='text-decoration-none text-black'>
                                <i className="fa-solid fa-money-bill text-black"></i>
                                <p className='text-black'>Réservation</p>
                            </Link>
                        </div>
                        <div className="nav-bloc">
                            <Link to="/menus" className='text-decoration-none text-black'>
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
                     
            <div className="vh-100">
                {/* INSÉRER LES ÉLÉMENTS CENTRAUX ICI */}
                <Outlet />
            </div>

            <div className='col-12 footer'></div>
        </>
    );
};

export default Template;
