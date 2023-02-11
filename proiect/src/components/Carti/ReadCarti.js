import { getFirestore, collection, getDocs, doc, deleteDoc, getDoc} from "firebase/firestore";
import { Table,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { app, auth } from '../../DatabaseConnection';
import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import "../des.css"

const db = getFirestore(app);
let param ="width=500,height=500";


const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {

    let sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {

    let direction = 'ascending';

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};


function ReadCarti(){

  const docRef = doc(db, "carti", "id");

  deleteDoc(docRef)
  .then(() => {
      //console.log("Entire Document has been deleted successfully.")
  })
  .catch(error => {
      console.log(error);
  })

  function update(x){  
    localStorage.setItem('carte_id',x)
  }

  function onDelete(id) {
    deleteDoc(doc(db, "carti", id));
    window.location.reload();
  }


  const [staffs, setStaffs] = useState([]);
  

  const fetchStaffs = async()=>{
    let response=collection(db, 'carti');

    await getDocs(response).then((querySnapshot) => {

      querySnapshot.forEach(element => {
        
        var date = element.data();
        date.id = element.id;
        
        setStaffs(arr => [...arr , date]);
      });
    });
  }

  useEffect(()=>{
    fetchStaffs();
  },[])
    
  const { items, requestSort, sortConfig } = useSortableData(staffs);
  
  const getClassNamesFor = (nume) => {
    if (!sortConfig) {
        return;
    }

    return sortConfig.key === nume ? sortConfig.direction : undefined;
  };

  
 
  function add_carti(){
    window.open('http://localhost:3000/add_carti','_parent','Add a book',param);
  }
  const [user, loading] = useAuthState(auth);
  const [rol_user, setRol_user] = useState("");
    
    
  async function get_detalii_user(docID){
    const ref = doc(db, "studenti", docID);

    await getDoc(ref)
    .then((response) => {
        let res = response.data();
        
        setRol_user(res.rol);
    })
    .catch((e) => console.log(e));
  }

  const [date_tabel, SetDate] = useState([]);
  
  useEffect(() => {
    if (loading){
      return;
    } else if(user){
      get_detalii_user(user.uid)
    } else {
      setRol_user("guest");
    }
  }, [loading, user]);
  

  


  return(
    <div>
      <h1>Carti</h1>
     
     {
        rol_user === "admin" || rol_user === "staff"
          ?
            <Button type="button" className="bt4" id="butonAdd" onClick={()=>add_carti()}>
                Adauga o carte
            </Button>
          :
            <></>
      }

      <Table singleLine className='tabel'>

        <Table.Header className='tt1'>

          <Table.Row>
          
            <Table.HeaderCell className='titlu'>
              <button type="button"
                      onClick={() => requestSort('Autor')}
                      className={getClassNamesFor('Autor')}
                        >Autor
              </button>
            </Table.HeaderCell>
            
            <Table.HeaderCell className='titlu'>
              <button type="button"
                      onClick={() => requestSort('Nume')}
                      className={getClassNamesFor('Nume')}
                        >Nume
              </button>
            </Table.HeaderCell>

            <Table.HeaderCell className='titlu'>
              <button type="button"
                      onClick={() => requestSort('Tip')}
                      className={getClassNamesFor('Tip')}
                        >Tip
              </button>
            </Table.HeaderCell>
            
            <Table.HeaderCell className='titlu'>
              <button type="button"
                      onClick={() => requestSort('Nr_exemplare')}
                      className={getClassNamesFor('Nr_exemplare')}
                        >Numar exemplare
              </button>
            </Table.HeaderCell>
            
           

            <Table.HeaderCell className='titlu'></Table.HeaderCell>

            <Table.HeaderCell className='titlu'></Table.HeaderCell>
              
          </Table.Row>

        </Table.Header>

        <Table.Body>
      
          {
            items.map((data) =>  {
              return (
                <Table.Row key = {data.Nume}>
                  <Table.Cell >{data.Autor}</Table.Cell>
                  <Table.Cell >{data.Nume}</Table.Cell>
                  
                  <Table.Cell >{data.Tip}</Table.Cell>
                  <Table.Cell >{data.Nr_exemplare}</Table.Cell>
                  
                  {
                     rol_user === "admin" || rol_user === "staff"
                     ?
                       <>
                         <Table.Cell>
                           <Button onClick={() =>onDelete(data.id)}>Delete</Button>
                         </Table.Cell> 

                         <Table.Cell> 
                           <Link to={'/update_carti'} state={{id:data.id}}>
                               <Button onClick={() =>update(data.id)}>Update</Button>
                           </Link> 
                         </Table.Cell>
                       </>
                     :
                       <></>
                 }
                  
                 

                 

                </Table.Row>
              )
            })
          }

        </Table.Body>
        
      </Table>
    </div>
  );
}

export default ReadCarti;