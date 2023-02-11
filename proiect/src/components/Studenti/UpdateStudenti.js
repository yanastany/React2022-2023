import React, { useState, useEffect } from 'react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from '@mui/material';




const db = getFirestore(app);
var date;


export default function UpdateStudenti() {
    const [carteId, setcarteid] = useState();
    const [Nume, setnume] = useState('');
    const [Prenume, setprenume] = useState('');
    const [Mail, setmail] = useState('');
    


    let navigate = useNavigate();
    
    
    const location = useLocation();
    var id = location.state.id;
    
    const update=()=>{
        
        if(id){
            getDoc(doc(db, "studenti", id)).then(docSnap =>{
                console.log(id);
                date = docSnap.data();
                setcarteid(date.Id);
                setnume(date.Nume);
                setprenume(date.Prenume);
                setmail(date.Mail);
                
                
                
                
            });
        } else {
            navigate("/");
        }
    }
    

    useEffect(()=>{
        update();
    },[])
    
    const handleSubmit = (event) => {
        const washingtonRef = doc(db, "studenti", id);

        updateDoc(washingtonRef, {
            Nume: Nume,
            Prenume: Prenume,
            Mail: Mail,
           
            
            

        });
        
        event.preventDefault();
        alert(`The Student you updated was: ${Nume}`);
        window.location.href = "http://localhost:3000/studenti";
    }
    
    




   

    
    return (
        <div className='form'>
            {
               
                        <form className='create-form1' onSubmit={handleSubmit}>
                            
                            <div>

                                <h2 className="bt2">Update student</h2>

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
                                    <label className='scris'>Prenume</label>
                                    <TextField
                                        className="raspuns"
                                        variant = "outlined"
                                        placeholder = {Prenume}
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
                                    <label className='scris'>Mail</label>
                                    <TextField
                                        className="raspuns"
                                        variant = "outlined"
                                        placeholder = {Mail}
                                        onChange = {(e) => {
                                            setmail(e.target.value);
                                        }}
                                        value = {Mail}
                                    />
                                </Box>

                                

                               

                               
                            
                            </div>

                            <Button className='b1' type='submit' >Update</Button>

                        </form>
                    
                        
            }
        </div>
    )
}