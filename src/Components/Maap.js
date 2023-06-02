import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet-src.esm";
import { Icon } from "leaflet";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";

function Maap() {
  const [villess, setvilless] = useState([]);
  const [zones, setZoness] = useState([]);
  const [villeId, setvilleId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [type, setType] = useState("");
  const [garde, setGarde] = useState("");
  const [pharmacy, setPharmacy] = useState([]);

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

  
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3349/3349322.png",
    iconSize: [38, 38],
  });


 // Fetch pharmacy data from the API
 const loadGarde = async () => {
  try {
    const response = await axios.get(
      `https://api-backend-pharmacie-production.up.railway.app/api/pharmacies/${villeId}/pharmacy`
    );
    console.log(response.data)
    setPharmacy(response.data);
  } catch (error) {
    console.log(error);
  }
};


const handleClick = () => {
  loadGarde();
};

  return (
    <div className="map">
      <div className="map-container flex flex-col">
        <div className="map-container-inner w-full h-16 bg-[#385170] ">
          <h1 className="font-bold flex justify-center py-5 font-serif text-white">
            ANNUAIRE DES PARAPHARMACIES AU MAROC
          </h1>
        </div>
        <div className=" w-full">
          <MapContainer center={[30.3477201, -11.0172497, 6.95]} zoom={6}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors '
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
  {pharmacy.length > 0 ? (
    pharmacy.map((marker) => (
      <Marker
        position={[marker.laltitude, marker.longitude ,12]}
        icon={customIcon}
        key={marker.id} // Ajoutez une clé unique pour chaque marqueur
      >
      <Popup>
        <div>
          <h3>Nom  :{marker.nom}</h3>
          <p>Adresse : {marker.adresse}</p>
          <p>Ville : {marker.zone.ville.nom}</p>
          {/* Ajoutez d'autres informations sur la pharmacie ici */}
        </div>
      </Popup>
      </Marker>
    ))
  ) : (
    <p>Aucune pharmacie disponible</p>
  )}
</MarkerClusterGroup>

          </MapContainer>
        </div>

        <div className="w-full h-24" style={{ background: "#a6d5cc" }}>
          <div className="flex flex-row h-16  justify-start space-x-9 rounded-full"
            style={{ marginTop: "20px", marginLeft: "30px" }}
          >
         <div className="flex flex-col space-y-2  col-span-2">
            
               
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
           <div className="flex flex-col space-y-2  col-span-2">

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
           <button onClick={handleClick}  style={{height:38 ,borderRadius:5}}>Chercher</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maap;
