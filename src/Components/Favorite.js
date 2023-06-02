import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { FaStar } from 'react-icons/fa';

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Récupérer les favoris de l'utilisateur depuis l'API
    axios.get(`https://api-backend-pharmacie-production.up.railway.app/api/user/${user.user_id}/favorites`)
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center" style={{ marginTop: "20px" }}>Mes favoris Pharmacie</h1>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map(favorite => (
            <li key={favorite.id} className="bg-white shadow rounded-md p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{favorite.nom}</h2>
              <h4 className="text-xs font-roboto text-gray-800 mb-2">{favorite.adresse}</h4>
              {/* Ajoutez ici d'autres informations sur la pharmacie */}
              <div className="flex items-center justify-end mt-4">
                <FaStar color="gold" className="mr-2" />
                <span className="text-gray-600">Favori</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
export default PharmacyList;
