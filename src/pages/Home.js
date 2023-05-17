import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditSite from "../sites/EditSite";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();


  async function save(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
        email: email,
        password: password,
        
      });
      setToken(response.data.token);
      setUserRole(response.data.role);
      localStorage.setItem('token', response.data.token);
      let roleTest = response.data;
      console.log(roleTest);
      console.log(response);
      
      
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  }



  async function getProtectedData() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/auth/protected-data", {
         headers: { Authorization: `Bearer ${token}` },
         });
         console.log(response);
         
      } catch (error) {
        console.error(error);
        
      }
    }
  }


if (userRole === 'USER') {
  navigate('/addSite');

} else if (userRole === 'ADMIN') {
  navigate('/allSites');
}

  return (

    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center mb-4">Ingresar</h2>
          <form>
            <div className="form-group">
              <label>Correo electrónico</label>
              //need to add email error message
              <input type="email" className="form-control" id="email" placeholder="Ingresar correo electrónico"

                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}

              />
             


            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-control" id="password" placeholder="Ingresar contraseña"

                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}

              />


            </div>
            
            
            <div className="d-grid gap-2 col-6 mx-auto ">
              <button variant="primary" type="submit" className="btn btn-dark" onClick={save}>
                Iniciar Sesión
              </button>
            </div>
          </form>

        </div>
      </div>


    </div>

  );



  // const [sites, setSites] = useState([]);

  // const { id } = useParams();

  // useEffect(() => {
  //   loadSites();
  // }, []);

  // const loadSites = async () => {
  //   const result = await axios.get("http://localhost:8080/api/v1/sites");
  //   setSites(result.data);
  // };

  // const deleteSite = async (id) => {
  //   await axios.delete(`http://localhost:8080/api/v1/sites/${id}`);
  //   loadSites();
  // };

  // return (
  //   <div className="container">
  //     <div className="py-4">
  //       <table className="table table-striped table-hover">
  //         <thead>
  //           <tr>
  //             <th scope="col">#</th>
  //             <th scope="col">Nombre</th>
  //             <th scope="col">Codigo</th>
  //             <th scope="col">Modelo</th>
  //             <th scope="col">Fecha</th>
  //             <th scope="col">Ciudad</th>
  //             <th scope="col">Acciones</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {sites.map((site, index) => (
  //             <tr>
  //               <th scope="row" key={index}>
  //                 {index + 1}
  //               </th>
  //               <td>{site.nombre}</td>
  //               <td>{site.codigo}</td>
  //               <td>{site.modelo}</td>
  //               <td>{site.fecha}</td>
  //               <td>{site.ciudad}</td>
  //               <td>
  //                 <Link
  //                   to={`/viewsite/${site.id}`}
  //                   className="btn btn-dark mx-2"
  //                 >
  //                   Visualizar
  //                 </Link>
  //                 <Link
  //                   to={`/editsite/${site.id}`}
  //                   className="btn btn-dark mx-2"
  //                 >
  //                   Editar
  //                 </Link>
  //                 <button
  //                   className="btn btn-danger mx-2"
  //                   onClick={() => deleteSite(site.id)}
  //                 >
  //                   Eliminar
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}
