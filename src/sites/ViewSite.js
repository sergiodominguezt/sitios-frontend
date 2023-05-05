import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewSite() {
  const [sitio, setSitio] = useState({
    nombre: "",
    codigo: "",
    modelo: "",
    fecha: "",
    ciudad: "",
  });

  const { id } = useParams();

  const loadSite = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/sites/${id}`);
    setSitio(result.data);
  };

  useEffect(() => {
    loadSite();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center mb-4">Detalles de registro</h2>
          <div className="card">
            <div className="card-header">
              Sitio id: {sitio.id}
              <ul className="list-group">
                <li className="list-group-item">Nombre: {sitio.nombre}</li>
                <li className="list-group-item">Código: {sitio.codigo}</li>
                <li className="list-group-item">Modelo: {sitio.modelo}</li>
                <li className="list-group-item">Fecha: {sitio.fecha}</li>
                <li className="list-group-item">Ciudad: {sitio.ciudad}</li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary mt-4" to={"/"}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
