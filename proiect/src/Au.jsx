import { getFirestore, collection, getDocs, doc, deleteDoc, getDoc} from "firebase/firestore";
import { Table,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { app, auth } from './DatabaseConnection';
import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import "./components/des.css"



const db = getFirestore(app);
var date;



const Au = () => {
    
    const [staffs, setStaffs] = useState([]);
    var nume = localStorage.getItem('nume_au');
    var vec=[];

    
    const fetchStaffs = async()=>{
       

        let response=collection(db, 'carti');
    
        await getDocs(response).then((querySnapshot) => {
    
          querySnapshot.forEach(element => {
            
            var date = element.data();
            date.id = element.id;
            
            console.log(date.Autor,nume)
                if(nume == date.Autor){
                
                setStaffs(arr => [...arr , date]);
            }
            
          });
          
        });
        
      }
    
      useEffect(()=>{
        fetchStaffs();
      },[])

      return(
        <div>
            <div className="spatiu"></div>
        
    
          <Table singleLine className='tabel'>
    
            <Table.Header className='tt1'>
    
              <Table.Row>
              
                <Table.HeaderCell className='titlu'>
                  <button
                            >Autor
                  </button>
                </Table.HeaderCell>
                
                <Table.HeaderCell className='titlu'>
                  <button 
                            >Nume
                  </button>
                </Table.HeaderCell>
    
                
                
               
    
                <Table.HeaderCell className='titlu'></Table.HeaderCell>
    
                <Table.HeaderCell className='titlu'></Table.HeaderCell>
                  
              </Table.Row>
    
            </Table.Header>
    
            <Table.Body>
          
              {
                staffs.map((data) =>  {
                  return (
                    <Table.Row key = {data.Nume}>
                      <Table.Cell >{data.Autor}</Table.Cell>
                      <Table.Cell >{data.Nume}</Table.Cell>
                      
                      
                      
                      
                      
                     
    
                     
    
                    </Table.Row>
                  )
                })
              }
    
            </Table.Body>
            
          </Table>
        </div>
      );
}

export default Au;