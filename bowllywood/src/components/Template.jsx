import './../sass/styles.scss';

import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { AuthContext } from '../contexts/AuthContext';

const Template = () => {

    const authContext = useContext(AuthContext);

    const handleLogout = () => {
        // Supprimer les données utilisateur du localStorage
        localStorage.removeItem('userTokens');
        // Mettre à jour l'état pour afficher le lien de connexion
        authContext.setAuth(null);
    };

    const items = [
        <SidebarItem>
            <Link to="/" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-house text-black flex-center"></i>
                <p className='text-black'>Accueil</p>
            </Link>
        </SidebarItem>,
        <SidebarItem>
            <Link to="/menus" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-utensils text-black flex-center"></i>
                <p>Menu</p>
            </Link>
        </SidebarItem>,
        <SidebarItem>
            <Link to="/reviews" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-star text-black flex-center"></i>
                <p>Évaluation</p>
            </Link>
        </SidebarItem>,
        <SidebarItem>
            <Link to="/register" className="text-black text-decoration-none text-center">
                <i className="fa-solid fa-user-plus text-black flex-center"></i>
                <p>Inscription</p>
            </Link>
        </SidebarItem>,
        <SidebarItem>
            <Link to="/login" className="text-black text-decoration-none text-center">
                <i className="fa-solid fa-drivers-license text-black flex-center"></i>
                <p>Connexion</p>
            </Link>
        </SidebarItem>
    ];

    const itemsLogged = [
        <SidebarItem>
            <Link to="/" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-house text-black flex-center"></i>
                <p className='text-black'>Accueil</p>
            </Link>
        </SidebarItem>,
        <SidebarItem>
            <Link to="/profile" className='text-decoration-none text-black text-center'>
                <i className="fa-solid fa-user text-black flex-center"></i>
                <p className='text-black'>Profile</p>
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
            <Link to="/reviews" className='text-decoration-none text-black text-center'>
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
            <Link to="/" className='text-decoration-none text-black text-center' onClick={handleLogout}>
                <i className="fa-solid fa-user-times text-black flex-center"></i>
                <p>Déconnexion</p>
            </Link>
        </SidebarItem>
    ]

    return (
        <Sidebar content={authContext.auth ? itemsLogged : items} background="#91D5A3" width={200}>
            <div className="main-content">
                <Outlet />
                <div className="col-12 footer"></div>
            </div>
        </Sidebar>
    );
};

export default Template;
