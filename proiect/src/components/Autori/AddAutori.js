import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { app, auth } from '../../DatabaseConnection';

import { Box, TextField, Button } from '@mui/material';

import "../des.css";


const db = getFirestore(app);


export default function Create_Autori() {
    const [carteId, setcarteid] = useState();
    const [Nume, setnume] = useState('');
    const [Data, setdata] = useState('');
    const [Nationalitate, setnationalitate] = useState('');
    

    async function add_Autori(event) {
        
        var a = await addDoc(collection(db, "autori"), {
            Data: Data,
            Nationalitate: Nationalitate,
            Nume: Nume
            
            
        }).then(alert(`The auhtor you added is: ${Nume}`));
        
        await Promise.all([a]);
        window.location.href = "http://localhost:3000/autori";
    }

   

   


    

    


    return (
        <div className='form'>
            {
                 
               
                        <Form className="create-form1">
                                
                            <h2 className="bt2">Add an author</h2>
                            
                            <Box
                                className = "field"
                                sx = {{ display: 'flex', alignItems: 'flex-start' }}
                            >
                                <label className='scris'>Data</label>
                                <TextField
                                    className="raspuns"
                                    variant = "outlined"
                                    placeholder = 'Data'
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
                                    placeholder = 'Nationalitate'
                                    onChange = {(e) => {
                                        setnationalitate(e.target.value);
                                    }}
                                    value = {Nationalitate}
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

                            

                            
                            
                            <Button className='bt2' onClick={add_Autori} type = 'submit'>Submit</Button>
                            
                        </Form>
                    
                        
            }
        </div>
    )
}