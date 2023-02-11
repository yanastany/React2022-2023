import React, { useState, useEffect } from 'react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from '@mui/material';

import { useLocation } from 'react-router-dom'


const db = getFirestore(app);
var date;


export default function UpdateCarti() {
    const [carteId, setcarteid] = useState();
    const [Nume, setnume] = useState('');
    const [Autor, setautor] = useState('');
    const [Tip, settip] = useState('');
    const [Nr_exemplare, setnr_exemplare] = useState('');


    let navigate = useNavigate();
    
   

const location = useLocation();
    var id = location.state.id;
    
    const update=()=>{
        
        if(id){
            getDoc(doc(db, "carti", id)).then(docSnap =>{
            
                date = docSnap.data();

                setcarteid(date.Id);
                setnume(date.Nume);
                setautor(date.Autor);
                settip(date.Tip);
                setnr_exemplare(date.Nr_exemplare);
                
                
                
            });
        } else {
            navigate("/");
        }
    }
    

    useEffect(()=>{
        update();
    },[])
    
    const handleSubmit = (event) => {
        const washingtonRef = doc(db, "carti", id);

        updateDoc(washingtonRef, {
            Nume: Nume,
            Autor: Autor,
            Tip: Tip,
            Nr_exemplare: Nr_exemplare
            

        });
        
        event.preventDefault();
        alert(`The Book you updated was: ${Nume}`);
        window.location.href = "http://localhost:3000/carti";
    }
    
    




   

    
    return (
        <div className='form'>
            {
               
                        <form className='create-form1' onSubmit={handleSubmit}>
                            
                            <div>

                                <h2 className="bt2">Update carte</h2>

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
                                    <label className='scris'>Autor</label>
                                    <TextField
                                        className="raspuns"
                                        variant = "outlined"
                                        placeholder = {Autor}
                                        onChange = {(e) => {
                                            setautor(e.target.value);
                                        }}
                                        value = {Autor}
                                    />
                                </Box>

                                <Box
                                    className = "field"
                                    sx = {{ display: 'flex', alignItems: 'flex-start' }}
                                >
                                    <label className='scris'>Tip</label>
                                    <TextField
                                        className="raspuns"
                                        variant = "outlined"
                                        placeholder = {Tip}
                                        onChange = {(e) => {
                                            settip(e.target.value);
                                        }}
                                        value = {Tip}
                                    />
                                </Box>

                                

                                <Box
                                    className = "field"
                                    sx = {{ display: 'flex', alignItems: 'flex-start' }}
                                >
                                    <label className='scris'>Numar exemplare</label>
                                    <TextField
                                        className="raspuns"
                                        variant = "outlined"
                                        placeholder = {Nr_exemplare}
                                        onChange = {(e) => {
                                            setnr_exemplare(e.target.value);
                                        }}
                                        value = {Nr_exemplare}
                                    />
                                </Box>

                               
                            
                            </div>

                            <Button className='b1' type='submit' >Update</Button>

                        </form>
                    
                        
            }
        </div>
    )
}