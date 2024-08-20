import React, { useState } from 'react';
import customCss from './MenuHamburguesa.module.css';

const MenuHamburguesa = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={customCss.hamburgerMenu}>
      <div className={customCss.hamburgerIcon} onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`${customCss.menu} ${isOpen ? customCss.open : ''}`}>
        <ul>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Carrito</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuHamburguesa;