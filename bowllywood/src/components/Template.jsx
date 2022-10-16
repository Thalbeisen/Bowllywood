import './../sass/styles.scss';

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// IMPORTER LES ELEMENTS A METTRE DANS LA NAVIGATION COMME CI DESSOUS
// import Test from './Test';
import { render } from 'react-dom';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

const items = [
    <SidebarItem>
        <Link to="/" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-house text-black flex-center"></i>
            <p className='text-black'>Accueil</p>
        </Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/reservations" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-money-bill text-black flex-center"></i>
            <p className='text-black'>Réservation</p>
        </Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/menus" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-utensils text-black flex-center"></i>
            <p>Menu</p>
        </Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/mark" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-star text-black flex-center"></i>
            <p>Évaluation</p>
        </Link>
    </SidebarItem>,
    <SidebarItem> 
        <Link to="/franchise-request" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-people-roof text-black flex-center"></i>
            <p>Devenir franchisé</p>
        </Link>
    </SidebarItem>,
    <SidebarItem className="text-center">
        <Link to="/my-franchise-requests" className='text-decoration-none text-black text-center'>
            <i className="fa-solid fa-people-roof text-black flex-center"></i>
            <p>Mes demandes de franchise</p>
        </Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/register" className="text-black text-decoration-none flex-center">Inscription</Link>
    </SidebarItem>,
    <SidebarItem>
        <Link to="/login" className="text-black text-decoration-none flex-center">Connexion</Link>
    </SidebarItem>,
    <SidebarItem>CCCCCCC</SidebarItem>,
    <SidebarItem>AAAAAAAAAA</SidebarItem>,
    <SidebarItem>BBBBBBBBBB</SidebarItem>,
    <SidebarItem>CCCCCCC</SidebarItem>,
    <SidebarItem>AAAAAAAAAA</SidebarItem>,
    <SidebarItem>BBBBBBBBBB</SidebarItem>,
    <SidebarItem>CCCCCCC</SidebarItem>,
  ];

const Template = () => {
    return (
        <>
         <Sidebar content={items} background="#91D5A3" width={200} >
          </Sidebar>
            {/* <nav className="side-nav navbar-expand-lg">
                <button class="navbar-toggler grow" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span><i class="fa-solid fa-bars p-3"></i></span>
                </button>
                <div className="wrapper" id="navbarTogglerDemo02">
                    <div className="nav-bloc">
                        <Link to="/" className='text-decoration-none text-black'>
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
                    <div className="nav-bloc">
                        <Link to="/franchise-request" className='text-decoration-none text-black'>
                            <i className="fa-solid fa-people-roof text-black"></i>
                            <p>Devenir franchisé</p>
                        </Link>
                    </div>
                    <div className="nav-bloc">
                        <Link to="/my-franchise-requests" className='text-decoration-none text-black'>
                            <i className="fa-solid fa-people-roof text-black"></i>
                            <p>Mes demandes de franchise</p>
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
             */}
            <div className='main-content'>
                {/* INSÉRER LES ÉLÉMENTS CENTRAUX ICI */}
                <Outlet />
            <div className='col-12 footer'></div>
            </div>

        </>
    );
};

export default Template;
