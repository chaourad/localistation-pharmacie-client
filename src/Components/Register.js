import React, { useContext, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai';
import Logoo from "../assets/sammy-doctors-consultation.png";
import axios from 'axios';
import UserContext from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';


function Register() {
   const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {setUser , user} = useContext(UserContext);
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api-backend-pharmacie-production.up.railway.app/api/user/signup', {nom, email, password });
      // Traitement de la réponse de l'API
      console.log(response.data);
      
      setUser({
        isLogged : true
      })
      navigate('/login'); // Redirect to the login page

    } catch (error) {
      // Gestion des erreurs
      console.error(error);
      
    }
  };
  return (
    <div className="flex flex-row w-full">
      <div
        className="w-1/2 h-full "
        style={{ paddingBottom: "150px", background: "#385170" }}
      >
        <img src={Logoo} height={400} width={400} style={{ marginLeft: "100px" , marginTop:'50px'}}/>
        <div
          className="flex flex-col justify-center space-y-2"
          style={{ marginLeft: "30px" }}
        >
          <h2 className="font-bold text-white text-xl font-serif ">Vous n'avez pas encore de compte ?</h2>
          <h4 className="text-white">
            Inscrivez-vous pour bénéficier de tous nos services de mise en
            relation avec vos patients.
          </h4>

          <div className="flex flex-row space-x-2 text-white">
            {" "}
            
              <AiOutlineCheck color="green" size={20 }/>
            <h6>  Un site internet personnalisé
            </h6>
          </div>
          <div className="flex flex-row space-x-2 text-white">

              <AiOutlineCheck color="green" size={20 }/>
              <h6> Une application mobile au nom de votre pharmacie</h6>

          </div>
          <div className="flex flex-row space-x-2 text-white">

              <AiOutlineCheck color="green" size={20 }/>
              <h6>Localisation de votre pharmacie</h6>

          </div>
        </div>
      </div>
      <div className=" w-1/2 relative flex flex-col ">
        <div
          className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-green-900  ring-2 ring-blue-700 lg:max-w-xl"
        
        >
          <h1 className="text-3xl font-semibold text-center text-[#94a3b8] font-serif ">
          Crée un compte  à votre espace pharmacien
          </h1>
          <form className="mt-6"  onSubmit={handleSignup}>
            <div className="mb-2">
              <label
                htmlFor="nom"
                className="block text-sm font-semibold text-gray-800"
              >
                Nom
              </label>
              <input
                placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} 
                className="block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-blue-700 focus:ring-green-300focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
         
        
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-blue-700 focus:ring-green-300focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} 
                className="block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-blue-600 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
           
            <div className="mt-6">
             <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-300"
                style={{ background: "#97C9E0" }}
              >
                Login
              </button>
            </div>
          </form>
          {error && <p>{error}</p>}

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <a href="/login" className="font-medium text-purple-600 hover:underline">
            Sign in.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register