import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaStar } from 'react-icons/fa';
import UserContext from "../context/UserContext";

function PharmaciZone() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(UserContext);

  // Fetch pharmacy data from the API
  const loadGarde = async () => {
    try {
      const response = await axios.get(
        `https://api-backend-pharmacie-production.up.railway.app/api/pharmacies/${id}/pharmacy`
      );
      setPharmacy(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = (pharmacy) => {
    if (user) {
      // User is logged in, add pharmacy to favorites
      axios.post(`https://api-backend-pharmacie-production.up.railway.app/api/user/${user.user_id}/favorites`, pharmacy)
        .then(() => {
          setFavorites([...favorites, pharmacy]);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // User is not logged in, navigate to login page
      navigate("/login");
    }
  };

  const isFavorite = (pharmacy) => {
    return favorites.some(favorite => favorite.id === pharmacy.id);
  };

  // Fetch pharmacy data when the component mounts
  useEffect(() => {
    loadGarde();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Pharmacies 
        </h1>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          صيدليات الحراسة
        </h1>
        <main className="container mx-auto py-6 px-6 bg-slate-500 rounded-lg">
          <p className="text-gray-900 leading-relaxed mb-8 text-center">
            Besoin de trouver une pharmacie de garde ? Pas de panique ! Notre
            application vous permet de trouver toutes les pharmacies de garde en
            sélectionnant la ville de votre choix. Si vous êtes en déplacement
            ou que vous ne connaissez pas la ville, vous pouvez également lancer
            une recherche pour trouver la pharmacie de garde la plus proche de
            chez vous en temps réel, grâce à votre géolocalisation. Avec notre
            application, vous pouvez être sûr(e) de trouver la pharmacie dont
            vous avez besoin, où que vous soyez !
          </p>
        </main>
        <h1
          className="text-3xl font-bold text-gray-800 mb-4 text-center"
          style={{ marginTop: "20px" }}
        >
          Voici les pharmacies
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {pharmacy.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-4 px-6 border-b border-gray-200"
            >
              <div className="flex items-center">
                <div className="ml-4 text-center">
                <div key={item.image} className='slide'>
                        <img src={item.image} alt="" className='slide-image h-15 ' />
                    </div>
                  <p className="text-lg font-medium text-gray-900">{item.nom}</p>
                  <p className="text-xs font-sans text-gray-900">{item.adresse}</p>
                 
                </div>
              </div>
              <button onClick={() => addToFavorites(item)}>
  {isFavorite(item) ? (
    <FaStar color="gold" />
  ) : (
    <FaStar />
  )}
  Ajouter aux favoris
</button>

            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default PharmaciZone;
