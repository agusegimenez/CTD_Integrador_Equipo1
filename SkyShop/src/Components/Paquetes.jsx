import React, { useState } from 'react';
import { productos } from '../utils/products'; 
import customCss from "./Paquetes.module.css";
const Paquetes = () => {
  const [visibleMenu, setVisibleMenu] = useState(null);
  const [visibleMenuCaract, setVisibleMenuCaract] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({});

  const toggleMenu = (productId) => {
    if (visibleMenu === productId) {
      setVisibleMenu(null);
      setVisibleMenuCaract(null);
    } else {
      setVisibleMenu(productId);
    }
  };

  const toggleMenuCaract = (productId) => {
    if (visibleMenuCaract === productId) {
      setVisibleMenuCaract(null);
    } else {
      setVisibleMenu(productId);
      setVisibleMenuCaract(productId);
    }
  };

  const handleCategoryChange = (productId, category) => {
    // funcion para cambiar categorias (?)
    // cambiar: actualizar con fetch
    setSelectedCategories((prevSelected) => {
      const categories = prevSelected[productId] || [];
      if (categories.includes(category)) {
        return {
          ...prevSelected,
          [productId]: categories.filter((cat) => cat !== category),
        };
      } else {
        return {
          ...prevSelected,
          [productId]: [...categories, category],
        };
      }
    });
  };

  return (
    <div className={customCss.padreProds}>
      <div className={customCss.headerProds}>
        <h2>Productos</h2>
        <button className={customCss.añadirProd}><a href="/addProd">Agregar Producto</a></button>
      </div>
      <table className={customCss.tableHeader}>
        <thead>
          <tr className={customCss.headerTitles}>
          <th></th>
            <th>PRODUCTO</th>
            <th>PRECIO</th>
            <th>CATEGORÍA</th>
            <th>VENTAS</th>
            <th>FECHA LISTADO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id} className={customCss.trListado}>
              <td>
                <img src={producto.imagen} alt={producto.nombre} style={{ width: '60px', marginRight: '10px' }} />
              </td>
              <td>{producto.nombre}</td>
              <td className={customCss.letraVer}>${producto.precio.toLocaleString('es-AR')}</td>
              <td>{producto.categoria}</td>
              <td>{producto.stock}</td>
              <td>{producto.fecha}</td>
              <td>
                <div className={customCss.actionMenu} onClick={() => toggleMenu(producto.id)}>
                  &#9776;
                  {visibleMenu === producto.id && (
                    <div className={customCss.actionDropdown}>
                      <a href="#" className={customCss.editar}><img src="./iEdit.png" alt="icon-edit" />Editar</a>
                      <a href="#" className={customCss.editar} onClick={(e) => {
                          e.stopPropagation();
                          toggleMenuCaract(producto.id);
                        }}><img src="./iCategories.png" alt="icon-categories" />Categorias</a>
                      <a href="#" className={customCss.eliminar}><img src="./iDelete.png" alt="icon-Delete" />Eliminar</a>
                    </div>
                  )}
                </div>
              </td>
              {visibleMenuCaract === producto.id && (
                      <td className={customCss.dropdownRow}>
                        <div className={customCss.divCaracteristicas}>
                          <p>Categoría:</p>
                          <div className={customCss.caracteristicas}>
                            {['Alimentos', 'Higiene', 'Diversion', 'Mascotas', 'Perros'].map((category) => (
                              <label key={category}>
                                <input
                                  type="radio"
                                  name={`categoria-${producto.id}`}
                                  value={category}
                                  checked={selectedCategories[producto.id]?.includes(category) || producto.categoria.includes(category)}
                                  onChange={() => handleCategoryChange(producto.id, category)}
                                />
                                <div>
                                  <div className={customCss.customRadio}></div>
                                  <img src={`./caracteristica_${category.toLowerCase()}.png`} alt={`${category}-logo`} />
                                </div>
                                {category}
                              </label>
                            ))}
                          </div>
                        </div>
                      </td>
                    )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className={customCss.btnVer}>Ver más</button>
    </div>
  );
};

export default Paquetes;