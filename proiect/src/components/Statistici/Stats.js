import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from '../../DatabaseConnection';
import React, { useEffect } from 'react';
import Chart_tip from "./Tip";

import '../des.css';
import "../test.css";

const db = getFirestore(app);
let response = collection(db, 'carti');

export async function fetchJucatori(){
    try{
      await getDocs(response)
      .then((querySnapshot) => {
  
        let tip = [0, 0, 0];  //array for Chart_picior(stanga, dreapta, ambele)
       
        querySnapshot.forEach(element => {
  
          var date = element.data();
            console.log(date)
          if(date?.Tip === "Manga"){
            tip[0]+=1;
          } else if(date?.Tip === "Fictiune"){
            tip[1]+=1;
          } else {
            tip[2]+=1;
          }
  
          
  
         
          
          
  
 
        });
        console.log(tip)
        localStorage.setItem("picior_preferat", JSON.stringify(tip));
        
      })
      .catch((e) => console.log(e));
    }
    catch(e){
      console.log(e);
    }
  }



  

function Read_Statistics(){

    useEffect(() =>{
        fetchJucatori();
        
        if(localStorage.getItem("reloadedPage") === null){
          setTimeout(window.location.reload(), 100);
          localStorage.setItem("reloadedPage", true);
        } else {
          localStorage.removeItem("reloadedPage");
        }
      });

  return(
    <div>
      <div className="divHome divStats">
        <div>

          <h1> Tip </h1>
            <Chart_tip/>
          
        </div>
        <div>

          <h1> Pozitie </h1>

          
        </div>
        <div>
          
          <h1> Varsta </h1>

          
        </div>
      </div>
      
    </div>
  );
}


export default Read_Statistics;