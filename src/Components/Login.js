import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api-backend-pharmacie-production.up.railway.app/api/login', { email, password });

      if (response.status === 200) {
        console.log(response.data);
        if(response.data.role==="client"){
          setUser({
            isLogged: true,
            user_id: response.data.id,
           
            role:response.data.role
          });
        }else if(response.data.role==="admin"){
          setUser({
            isLogged: true,
            user_id: response.data.id,
            
            role:response.data.role
          });
        }else{
          setUser({
            isLogged: true,
            user_id: response.data.id,
            pharmacy_id: response.data.pharmacy.id,
            role:response.data.role
          });
        }
       
        
      }

      localStorage.setItem('user', 'true');
      localStorage.setItem('user_id', response.data.id.toString());
      localStorage.setItem('pharmacy_id', response.data.pharmacy.id.toString());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-green-900  ring-2 ring-green-600 lg:max-w-xl" style={{ marginTop: '200px' }}>
        <h1 className="text-3xl font-semibold text-center text-[#94a3b8] font-serif ">
          Connectez-vous à votre espace pharmacien
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-green-300 bg-white border rounded-md focus:border-green-600 focus:ring-green-300focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-blue-700 focus:ring-green-300focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
                className="block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-blue-700 focus:ring-green-300focus:outline-none focus:ring focus:ring-opacity-40"
                style={{ background: "#97C9E0" }}
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xl font-bold  text-center text-gray-700">
          {!user.isLogged ? (
            <>
              Don't have an account? <button onClick={handleClick}>Sign up</button>
            </>
          ) : (
            'Vous êtes connecté.'
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
