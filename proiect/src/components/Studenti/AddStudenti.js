import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { app, auth } from '../../DatabaseConnection';

import { Box, TextField, Button } from '@mui/material';

import "../des.css";


const db = getFirestore(app);


export default function Create_Studenti() {
    const [carteId, setcarteid] = useState();
    const [Nume, setnume] = useState('');
    const [Prenume, setprenume] = useState('');
    const [Mail, setmail] = useState('');
    

    async function add_studenti(event) {
        
        var a = await addDoc(collection(db, "studenti"), {
            Prenume: Prenume,
            Mail: Mail,
            Nume: Nume,
            
            
        }).then(alert(`The student you added is: ${Nume} ${Prenume}`));
        
        await Promise.all([a]);
        window.location.href = "http://localhost:3000/studenti";
    }

   

   


    

    


    return (
        <div className='form'>
            {
                 
               
                        <Form className="create-form1">
                                
                            <h2 className="bt2">Add a match</h2>
                            
                            <Box
                                className = "field"
                                sx = {{ display: 'flex', alignItems: 'flex-start' }}
                            >
                                <label className='scris'>Prenume</label>
                                <TextField
                                    className="raspuns"
                                    variant = "outlined"
                                    placeholder = 'Prenume'
                                    onChange = {(e) => {
                                        setprenume(e.target.value);
                                    }}
                                    value = {Prenume}
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
                                <label className='scris'>Mail</label>
                                <TextField
                                    className="raspuns"
                                    variant = "outlined"
                                    placeholder = 'Mail'
                                    onChange = {(e) => {
                                        setmail(e.target.value);
                                    }}
                                    value = {Mail}
                                />
                            </Box>

                            
                            
                            <Button className='bt2' onClick={add_studenti} type = 'submit'>Submit</Button>
                            
                        </Form>
                    
                        
            }
        </div>
    )
}