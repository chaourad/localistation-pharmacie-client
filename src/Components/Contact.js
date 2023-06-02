
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SocialIcon } from 'react-social-icons'

import gif from '../assets/3d-casual-life-woman-in-online-meeting-with-graphic-tablet.png'
import axios from 'axios';
import UserContext from '../context/UserContext';


const Contact = () => {

  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [laltitude, setLaltitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const {user} = useContext(UserContext);
  const [zoneId, setZoneId] = useState("");
  const [villess, setvilless] = useState([]);
  const [zones, setZoness] = useState([]);
  const [villeId, setvilleId] = useState("");
  const [image , setImage] = useState('')


  useEffect(() => {
    axios.get("https://api-backend-pharmacie-production.up.railway.app/api/villes").then((response) => {
        setvilless(response.data);
    });
}, []);
useEffect(() => {
  axios.get(`https://api-backend-pharmacie-production.up.railway.app/api/villes/ville/${villeId}/zones`).then((response) => {
    setZoness(response.data);
    
  });
}, [villeId]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Créer l'objet de la demande de pharmacie
    const pharmacyRequest = {
      nom,
      adresse,
      laltitude,
      longitude,
      image,
      user:{
        id:user.user_id
      },
      zone: {
        id: zoneId
    },

    };
console.log(pharmacyRequest)

    try {
      // Envoyer la demande de pharmacie au backend
      await axios.post('https://api-backend-pharmacie-production.up.railway.app/api/pharmacy-requests', pharmacyRequest);

      // Réinitialiser les champs du formulaire
      setNom('');
      setAdresse('');
      setLaltitude('');
      setLongitude('');
      setImage('')
     
      // Afficher un message de succès ou effectuer une action supplémentaire si nécessaire
      alert('La demande de pharmacie a été soumise avec succès!');
    } catch (error) {
      // Gérer les erreurs de soumission de la demande de pharmacie
      console.error('Erreur lors de la soumission de la demande de pharmacie:', error.message);
      alert('Une erreur s\'est produite lors de la soumission de la demande de pharmacie. Veuillez réessayer plus tard.');
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
    <main className="container mx-auto px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-20">
      <div className="grid grid-cols-2">
        
        {/* :MAP CONTAINER */}
        <div className="order-1 col-span-full  h-60 flex flex-row justify-evenly " style={{background:'#025159'}}>
        <img src={gif}></img>
        <p className='text-white font-semibold w-[40rem]'style={{marginTop:'30px'}}>N'hésitez pas à nous contacter pour toute question, demande de renseignements ou commentaire. Nous sommes là pour vous aider et répondre à toutes vos demandes. Vous pouvez nous contacter via le formulaire de contact ci-dessous ou en nous envoyant un e-mail directement à l'adresse indiquée. Nous nous engageons à vous répondre dans les meilleurs délais et à traiter toutes vos demandes avec soin et professionnalisme. Merci de nous faire confiance</p>
        </div>



        {/* :CONTACT FORM CONTAINER */}
        <div className="order-3 md:order-2 col-span-full md:col-span-1 py-5 md:py-10 px-6">
        <form onSubmit={handleSubmit}>
          <div className='flex flex-row space-x-4'>
            <label className='w-16' >Nom </label>
        <input type="text" className= "bg-dashBlack  block w-full p-2.5 outline-none border border-gray-700 text-sm py-2 px-3 rounded-md " value={nom} onChange={(e) => setNom(e.target.value)} required /></div>
        
        <br />
        <div  className='flex flex-row space-x-4'>
        <label className='w-16'>Adresse </label>
        <input type="text" className= "bg-dashBlack  block w-full p-2.5 outline-none border border-gray-700 text-sm py-2 px-3 rounded-md "value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
        </div>
        <br />
        <div  className='flex flex-row space-x-4'> 
        <label className='w-16'>Latitude </label>
        <input type="number" className= "bg-dashBlack  block w-full p-2.5 outline-none border border-gray-700 text-sm py-2 px-3 rounded-md " value={laltitude} onChange={(e) => setLaltitude(e.target.value)} required />
       
        </div> <br />
        <div  className='flex flex-row space-x-4'>
        <label className='w-16'>Longitude </label>
        <input type="number" className= "bg-dashBlack  block w-full p-2.5 outline-none border border-gray-700 text-sm py-2 px-3 rounded-md " value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        </div>
        <br></br>
        <div  className='flex flex-row space-x-4'> 
        <label className='w-16'>image </label>
        <input type="text" className= "bg-dashBlack  block w-full p-2.5 outline-none border border-gray-700 text-sm py-2 px-3 rounded-md " value={image} onChange={(e) => setImage(e.target.value)} required />
       
        </div> <br/>
       <div className="flex flex-col space-y-2  col-span-2">
       <label className='w-16'>ville</label>
               
               <select 
                   id="villeId"
                   style={{height:38 ,borderRadius:5}}
                   value={villeId}
                   onChange={(event) => setvilleId(event.target.value)}
               >
                   <option value="">Select a ville </option>
                   {villess && villess.map((ville) => (
                       <option key={ville.id} value={ville.id}>
                           {ville.nom}
                       </option>
                   ))}
               </select>
           </div>
        <br />
        <div className="flex flex-col space-y-2  col-span-2">
               <span>Zone</span>
               
               <select
                   id="zoneId"
                   style={{height:38 ,borderRadius:5}}
                   value={zoneId}
                   onChange={(event) => setZoneId(event.target.value)}
               >
                   <option value="">Select a zone </option>
                   {zones && zones.map((zon) => (
                       <option key={zon.id} value={zon.id}>
                           {zon.nom}
                       </option>
                   ))}
               </select>
           </div>
           <br/>
        <button type="submit" className="py-2 px-6 rounded  text-base text-black font-semibold uppercase " style={{ background: "#a6d5cc" }}>Demande</button>
      </form>
        </div>



        <div className="order-2 md:order-3 col-span-full md:col-span-1 py-5 md:py-10 px-6">
          <div className="mx-auto max-w-xl flex flex-col space-y-5">

            <h2 className="text-4xl font-oswald uppercase">Demande de Pharmacie</h2>
            
            <p className="text-sm text-gray-500">Contactez-nous et nous vous répondrons dans les meilleurs délais.</p>
            
            <a href="#mail" className="inline-flex items-center text-sm text-blue-400 font-semibold hover:text-blue-500">
              
              chaourad59@gmail.com
            </a>
         
            <p className="text-sm text-gray-500 leading-6">Jnan Awrad  <br /> Marrakech <br /> Maroc</p>
          
            <div className="flex items-center">
    
              <a href="" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#1DA1F2] text-white filter hover:brightness-125" style={{ backgroundColor: "#1DA1F2" }}>
             
                <SocialIcon url="https://www.linkedin.com/in/imane-chaourad-466819182/" style={{ height: 20, width: 20 }}/>

              </a>
              
              <a href="https://www.facebook.com/imane.chaourad/" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#4267B2] text-white filter hover:brightness-125" style={{ backgroundColor: "#4267B2" }}>
            
                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16.403,9H14V7c0-1.032,0.084-1.682,1.563-1.682h0.868c0.552,0,1-0.448,1-1V3.064c0-0.523-0.401-0.97-0.923-1.005C15.904,2.018,15.299,1.999,14.693,2C11.98,2,10,3.657,10,6.699V9H8c-0.552,0-1,0.448-1,1v2c0,0.552,0.448,1,1,1l2-0.001V21c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8.003l2.174-0.001c0.508,0,0.935-0.381,0.993-0.886l0.229-1.996C17.465,9.521,17.001,9,16.403,9z"/>
                </svg>
              </a>
              {/* :Instagram */}
              <a href="https://www.instagram.com/chaourad_imane/?next=%2F" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white filter hover:brightness-125">
                {/* ::instagram svg */}
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
     
 
    </main>
    </div>
  )
}

export default Contact
