import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddSite() {
  let navigate = useNavigate();

  const [sitio, setSitio] = useState({
    nombre: "",
    codigo: "",
    modelo: "",
    fecha: "",
    ciudad: "",
  });

  const { nombre, codigo, modelo, fecha, ciudad } = sitio;

  const onInputChange = (e) => {
    setSitio({ ...sitio, [e.target.name]: e.target.value });
  };

  //validate form
  const isFormValid = () => {
    if (
      nombre.trim() === "" ||
      codigo.trim() === "" ||
      modelo.trim() === "" ||
      fecha.trim() === "" ||
      ciudad.trim() === ""
    ) {
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError(true);
      return;
    }
    await axios.post("http://localhost:8080/api/v1/sites", sitio);
    navigate("/");
  };

  const [error, setError] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center mb-4">Agregar registro</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nombre" className="form-label">
                Nombre
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingrese su nombre"
                id="Nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => onInputChange(e)}
                pattern="[A-Za-z]{3,20}"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Codigo" className="form-label">
                Codigo
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Ingrese el codigo del sitio"
                id="Codigo"
                name="codigo"
                value={codigo}
                onChange={(e) => onInputChange(e)}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Modelo" className="form-label">
                Modelo
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingrese el modelo"
                id="Modelo"
                name="modelo"
                value={modelo}
                onChange={(e) => onInputChange(e)}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Fecha" className="form-label">
                Fecha
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="Ingrese la fecha"
                id="Fecha"
                name="fecha"
                value={fecha}
                onChange={(e) => onInputChange(e)}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Ciudad" className="form-label">
                Ciudad
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingrese la ciudad"
                id="Ciudad"
                name="ciudad"
                value={ciudad}
                onChange={(e) => onInputChange(e)}
                required={true}
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-dark">
                Anadir
              </button>
              <Link to={"/"} className="btn btn-danger">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
