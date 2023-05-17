import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditSite from "../sites/EditSite";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";




export default function AllSites() {
  const navigate = useNavigate();

  
  // console.log(localStorage.getItem('token'));

    const [sites, setSites] = useState([]);


    const { id } = useParams();
  
    // useEffect(() => {
    //   loadSites();
    // }, []);
  
    async function loadSites() {
  

      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get("http://localhost:8080/api/v1/sites", {
           headers: { Authorization: `Bearer ${token}` },
           });
        setSites(response.data);
      } catch (error) {
        console.error(error);
      }
     
    };

    async function logout() {
  

      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.post("http://localhost:8080/api/v1/auth/logout");
        navigate('/');   
      } catch (error) {
        console.error(error);
      }
     
    };

   

    
  
    const deleteSite = async (id) => {
      await axios.delete(`http://localhost:8080/api/v1/sites/${id}`);
      // loadSites();
    };

   
    // async function getProtectedData() {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     try {
    //       const response = await axios.get("http://localhost:8080/api/v1/sites", {
    //        headers: { Authorization: `Bearer ${token}` },
    //        });
    //        console.log(response + "HOLAAA");
           
    //     } catch (error) {
    //       console.error(error + "testingngng");
          
    //     }
    //   }
    // }

    


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
                  <Link
                    to={`/viewsite/${site.id}`}
                    className="btn btn-dark mx-2"
                  >
                    Visualizar
                  </Link>
                  <Link
                    to={`/editsite/${site.id}`}
                    className="btn btn-dark mx-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteSite(site.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={ loadSites }>Load Sites</button>
        <button onClick={ logout }>Logout</button>
        
      </div>
    </div>
  );
            };
