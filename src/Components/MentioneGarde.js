import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';


function MentionerGarde({pharmacie}) {
    
    const [type, setType] = useState("");
    const [garde, setGarde] = useState("");
    const [dateDebut, setDateDebut] = useState(new Date());
    const [dateFin, setDateFin] = useState(new Date());
    const { user } = useContext(UserContext);
 
    useEffect(() => {
        axios.get("http://localhost:8080/api/garde/all").then((response) => {
            setType(response.data);
            
        });
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/api/pharmacie-garde/save", {
        id:{
            pharmacie:user.pharmacy_id,
            garde,
          dateDebut,
        }   , 
        dateFin}        )
        .then(async (res) => {
          console.log(res.status, res.data);
        });
      
    };
  
    return (
      <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-20">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Create Garde</h1>
        <h2>ID de la pharmacie : {user.pharmacieId}</h2>
      <form onSubmit={handleSubmit}  className="flex flex-col space-y-2 ">
      <div className="flex flex-row space-x-20">
                <label htmlFor="typeId"  className="text-lg  text-center" style={{marginTop:'5px'}}>Garde:</label>
                <select
                    className= "bg-dashBlack  block w-full p-2.5 outline-none border border-gray-700 text-sm py-2 px-3 rounded-md "
                    id="typeId"
                    value={garde}
                    onChange={(event) => setGarde(event.target.value)}
                >
                    <option value="">Select a garde </option>
                    {type && type.map((e) => (
                        <option key={e.id} value={e.id}>
                            {e.type}
                        </option>
                    ))}
                </select>
            </div>
<div className='flex flex-row space-x-4'>
           <label htmlFor="dateDebut" className='w-32' >Date debut:</label>

            <DatePicker selected={dateDebut} onChange={(date) => setDateDebut(date)} className= "bg-dashBlack  block w-full p-2.5 outline-none border border-gray-700 text-sm py-2 px-3 rounded-md " />
            </div>
            <div className='flex flex-row space-x-4'>
           <label htmlFor="dateFin" className='w-32' >Date de fin:</label>

            <DatePicker selected={dateFin} onChange={(date) => setDateFin(date)} className= "bg-dashBlack  block w-full p-2.5 outline-none border border-gray-700 text-sm py-2 px-3 rounded-md "  />
            </div>
          
          <button type="submit" className="py-2.5 px-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Create
          </button>
        </form>
      </div>
          </main>
          </div>
    
    );
  };


export default MentionerGarde