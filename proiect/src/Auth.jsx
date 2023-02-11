import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';
import { app, auth } from './DatabaseConnection';
import { Button } from '@mui/material';

import Login from './Login';


import "./components/des.css";


const db = getFirestore(app);

function Auth(){
    const logout = () => {
        signOut(auth);
    }

    const [user, loading] = useAuthState(auth);
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
            get_detalii_user(user.uid);
        } else {
            setRol_user("guest");
        }
    }, [loading, user]);

    return (
        <div>
            {
                rol_user === "guest"
                    
                    ?

                        <div className='test'>
                            
                            <Login />

                            
                            
                        </div>

                    : user 
                        
                        ?

                            rol_user === "admin"
                                
                                ?

                                    <div className = "logged">
                                        <div className = "text">
                                            <div display="flex">
                                                
                                                <h3>Logged in as: {det_user.Prenume} {det_user.Nume}</h3>
                                                <p></p>
                                                    <h3>Mail: {det_user.Mail}</h3>
                                            </div>
                                            <p></p>
                                            <h3>Role: admin</h3>
                                        </div>

                                        <div>
                                            <Link to="/">
                                                <Button 
                                                    className = "buton"
                                                    variant = "contained"
                                                    onClick={() => {
                                                        logout();
                                                        }}>
                                                            Logout
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                
                                :

                                    rol_user === "jucator"

                                    ?
                                    
                                        <div className = "logged">
                                            <div className = "text">
                                                    <h3>Logged in as: {det_user.Prenume} {det_user.Nume}</h3>
                                                    
                                                    <h3>Mail: {det_user.Mail}</h3>
                                                    
                                                    <br/>
                                                    <h3>Role: {rol_user}</h3>
                                            </div>

                                            <div>
                                                <Link to="/">
                                                    <Button 
                                                        className = "buton"
                                                        variant = "contained"
                                                        onClick={() => {
                                                            logout();
                                                            }}>
                                                                Logout
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                    :
                                        <div className = "logged">
                                            <div className = "text">
                                            <h3>Logged in as: {det_user.Prenume} {det_user.Nume}</h3>
                                                    
                                                    <h3>Mail: {det_user.Mail}</h3>
                                                    
                                                    <br/>
                                                    <h3>Role: {rol_user}</h3>
                                            </div>

                                            <div>
                                                <Link to="/">
                                                    <Button 
                                                        className = "buton"
                                                        variant = "contained"
                                                        onClick={() => {
                                                            logout();
                                                            }}>
                                                                Logout
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                        
                        :

                            <></>
            }
        </div>
    )
}

export default Auth;