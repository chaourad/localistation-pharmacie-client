import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';

function SignupForm() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        <input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
       {user.isLogged ? <div></div> :  <button type="submit">S'inscrire</button>}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignupForm;
