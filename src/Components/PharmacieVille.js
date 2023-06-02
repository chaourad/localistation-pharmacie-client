import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PharmacieVille() {
  const [ville, setVille] = useState([]);


  const loadVille = async () => {
    try {
      const response = await axios.get("https://api-backend-pharmacie-production.up.railway.app/api/villes");
      setVille(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadVille();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Pharmacies du Maroc - Toutes Les Régions</h1>
        <div className="container mx-auto py-6 px-6 bg-slate-500 rounded-lg">
          <p className="text-gray-900 leading-relaxed mb-8 text-center">
            Besoin de trouver une pharmacie de garde ? Pas de panique ! Notre application vous permet de trouver toutes les pharmacies de garde en sélectionnant la ville de votre choix. Si vous êtes en déplacement ou que vous ne connaissez pas la ville, vous pouvez également lancer une recherche pour trouver la pharmacie de garde la plus proche de chez vous en temps réel, grâce à votre géolocalisation. Avec notre application, vous pouvez être sûr(e) de trouver la pharmacie dont vous avez besoin, où que vous soyez !
          </p>
        </div>
       <br/>
       <br/>
        <div className="grid grid-cols-2 gap-4">
          {ville.map((item, index) => (
            <Link to={`/pharmacieVille/${item.id}`} key={index}>
              <div className="bg-white shadow-md rounded-lg p-6">
                <p className="text-lg font-medium text-gray-900">{item.nom}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default PharmacieVille;
