import React, { useContext } from "react";
import NavLink from "./NavLink";
import { Col, Row } from "react-bootstrap";
import { AdminContext, AdminProvider } from "../../AdminContext";


const Navbar = () => {

  const {isAdmin} =useContext(AdminContext);

  //de momento cambiar true o false manualmente par aque se vea el panelAdmin
  return (
    <nav className="navLink">
        
        <NavLink to="/">Inicio</NavLink>
        <NavLink to ="/Books">Libros</NavLink>
        <NavLink to ="/Authors" className="navLinkP">Autores</NavLink>
        {isAdmin && <NavLink to = "/AdminPanel">panel admin</NavLink>}
        <NavLink to= "/login">Iniciar sesión</NavLink>
        
        
    </nav>
  );
};

export default Navbar;
