import React, { useEffect, useState } from "react";
import { app, auth } from "../DatabaseConnection";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";

import "./nav.scss";

const db = getFirestore(app);


function Navigation() {

    const [user, loading, error] = useAuthState(auth);
  const [rol_user, setRol_user] = useState("");
  const [det_user, setDet_user] = useState({});

  async function get_detalii_user(docID){
    const ref = doc(db, "studenti", docID);

    await getDoc(ref)
    .then(async (response) => {
        let res = response.data();
        
        setRol_user(res.rol);
        setDet_user(res);
        
          
      
    })
    .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (loading){
        return;
    } else if(user){
        get_detalii_user(user.uid)
    } else {
        setRol_user("guest");
    }
  }, [loading, user]);


  return (
    <div>
     
      <div className="navigation ">
        <nav className="navbar navbar-expand  ">
          <div className="container">

            <div>
              <ul className="navbar-nav ml-auto menu">

                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
               
                
                  
                
                

                <li className="nav-item">
                  <NavLink className="nav-link" to="/carti">
                    Carti
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/autori">
                    Autori
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/studenti">
                    Studenti
                  </NavLink>
                </li>

                

                {
                  rol_user === "guest"
                    ?
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/toauth">
                          Auth
                        </NavLink>
                      </li>
                    :
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/toauth">
                          Profil
                        </NavLink>
                      </li>
                }


                
                
              </ul>
            </div>
            
          </div>
        </nav>
      </div>

    </div>
  );
}

export default Navigation;