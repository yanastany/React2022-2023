import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { app, auth } from '../../DatabaseConnection';

import { Box, TextField, Button } from '@mui/material';

import "../des.css";


const db = getFirestore(app);


export default function Create_Carti() {
    const [carteId, setcarteid] = useState();
    const [Nume, setnume] = useState('');
    const [Autor, setautor] = useState('');
    const [Tip, settip] = useState('');
    const [Nr_exemplare, setnr_exemplare] = useState('');

    async function add_carti(event) {
        
        var a = await addDoc(collection(db, "carti"), {
            Autor: Autor,
            Nr_exemplare: Nr_exemplare,
            Nume: Nume,
            Tip: Tip,
            
        }).then(alert(`The book you added is: ${Nume}`));
        
        await Promise.all([a]);
        window.location.href = "http://localhost:3000/carti";
    }

   

   


    

    


    return (
        <div className='form'>
            {
                 
               
                        <Form className="create-form1">
                                
                            <h2 className="bt2">Adauga o carte</h2>
                            
                            <Box
                                className = "field"
                                sx = {{ display: 'flex', alignItems: 'flex-start' }}
                            >
                                <label className='scris'>Autor</label>
                                <TextField
                                    className="raspuns"
                                    variant = "outlined"
                                    placeholder = 'Autor'
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
                                <label className='scris'>Numar exemplare</label>
                                <TextField
                                    className="raspuns"
                                    variant = "outlined"
                                    placeholder = 'Numar exemplare'
                                    onChange = {(e) => {
                                        setnr_exemplare(e.target.value);
                                    }}
                                    value = {Nr_exemplare}
                                />
                            </Box>

                            <Box
                                className = "field"
                                sx = {{ display: 'flex', alignItems: 'flex-start' }}
                            >
                                <label className='scris'>Nume</label>
                                <TextField
                                    className="raspuns"
                                    variant = "outlined"
                                    placeholder = 'Nume'
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
                                <label className='scris'>Tip</label>
                                <TextField
                                    className="raspuns"
                                    variant = "outlined"
                                    placeholder = 'Tip'
                                    onChange = {(e) => {
                                        settip(e.target.value);
                                    }}
                                    value = {Tip}
                                />
                            </Box>

                            
                            
                            <Button className='bt2' onClick={add_carti} type = 'submit'>Submit</Button>
                            
                        </Form>
                    
                        
            }
        </div>
    )
}