import React, { useState, useEffect } from 'react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from '@mui/material';

import { useLocation } from 'react-router-dom'


const db = getFirestore(app);
var date;


export default function UpdateAutori() {
    const [carteId, setcarteid] = useState();
    const [Nume, setnume] = useState('');
    const [Data, setdata] = useState('');
    const [Nationalitate, setnationalitate] = useState('');


    let navigate = useNavigate();
    
    
    
const location = useLocation();
    var id = location.state.id;
    
    const update=()=>{
        
        if(id){
            getDoc(doc(db, "autori", id)).then(docSnap =>{
            
                date = docSnap.data();

                setcarteid(date.Id);
                setnume(date.Nume);
                setdata(date.Data);
                setnationalitate(date.Nationalitate);
                
                
                
                
            });
        } else {
            navigate("/");
        }
    }
    

    useEffect(()=>{
        update();
    },[])
    
    const handleSubmit = (event) => {
        const washingtonRef = doc(db, "autori", id);

        updateDoc(washingtonRef, {
            Nume: Nume,
            Data: Data,
            Nationalitate: Nationalitate
            
            

        });
        
        event.preventDefault();
        alert(`The Book you updated was: ${Nume}`);
        window.location.href = "http://localhost:3000/autori";
    }
    
    




   

    
    return (
        <div className='form'>
            {
               
                        <form className='create-form1' onSubmit={handleSubmit}>
                            
                            <div>

                                <h2 className="bt2">Update autor</h2>

                                <Box
                                    className = "field"
                                    sx = {{ display: 'flex', alignItems: 'flex-start' }}
                                >
                                    <label className='scris'>Nume</label>
                                    <TextField
                                        className="raspuns"
                                        variant = "outlined"
                                        placeholder = {Nume}
                                        onChange = {(e) => {
                                            setnume(e.target.value);
                                        }}
                                        value = {Nume}
                                    />
                                </Box>
                            
                                <Box
                                    className = "field"
                                    sx = {{ display: 'flex', alignItems: 'flex-start' }}
                                >
                                    <label className='scris'>Data</label>
                                    <TextField
                                        className="raspuns"
                                        variant = "outlined"
                                        placeholder = {Data}
                                        onChange = {(e) => {
                                            setdata(e.target.value);
                                        }}
                                        value = {Data}
                                    />
                                </Box>

                                <Box
                                    className = "field"
                                    sx = {{ display: 'flex', alignItems: 'flex-start' }}
                                >
                                    <label className='scris'>Nationalitate</label>
                                    <TextField
                                        className="raspuns"
                                        variant = "outlined"
                                        placeholder = {Nationalitate}
                                        onChange = {(e) => {
                                            setnationalitate(e.target.value);
                                        }}
                                        value = {Nationalitate}
                                    />
                                </Box>

                                

                               

                               
                            
                            </div>

                            <Button className='b1' type='submit' >Update</Button>

                        </form>
                    
                        
            }
        </div>
    )
}