import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/sites");
    setSites(result.data);
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Codigo</th>
              <th scope="col">Modelo</th>
              <th scope="col">Fecha</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{site.nombre}</td>
                <td>{site.codigo}</td>
                <td>{site.modelo}</td>
                <td>{site.fecha}</td>
                <td>{site.ciudad}</td>
                <td>
                  <button className="btn btn-light mx-2">Visualizar</button>
                  <button className="btn btn-dark mx-2">Editar</button>
                  <button className="btn btn-danger mx-2">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
