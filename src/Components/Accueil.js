import React from "react";
import equipe from "../assets/Travail d'équipe.jpg"
import service from "../assets/service.jpg";


function Accueil() {
  const valeurs = [
    {
      id: 0,
      nom: "Accessibilité",
      descption:
        "Nous avons à cœur de rendre nos produits et services accessibles à tous, en un seul clic. Nous sommes fiers de vous offrir un accès facile à la pharmacie  la plus proche de chez vous. Notre engagement en matière daccessibilité se reflète dans tout ce que nous faisons pour nos utilisateurs, chaque jour.",
    },
    {
      id: 1,
      nom: "Simplicité",
      descption:
        "Notre priorité absolue est de simplifier chacune de nos actions et de communiquer de manière transparente afin de répondre aux besoins de notre communauté dutilisateurs. Nous nous engageons à vous aider à trouver facilement la pharmacie la plus proche de chez vous.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-20">
      <main className="container mx-auto py-6 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Bienvenue sur notre site de localisation de pharmacies !</h1>
        <p className="text-gray-600 leading-relaxed mb-8 text-center">
        Nous sommes là pour vous aider à trouver la pharmacie la plus proche
            de chez vous, que ce soit pour une urgence médicale ou pour
             une ordonnance. Grâce à notre système de géolocalisation,
            vous pouvez facilement trouver les pharmacies les plus proches de
            votre position actuelle, ainsi que leurs horaires d'ouverture et
            leurs numéros de téléphone. Nous sommes fiers de vous offrir un
            service rapide et efficace pour vous aider à prendre soin de votre
            santé.
            <br></br>
        </p>
        <h4 className="font-semibold leading-relaxed mb-8 text-center text-[#6366f1]"> N'hésitez pas à utiliser notre site pour trouver la
            pharmacie la plus proche de chez vous dès maintenant !</h4>
      </main>
        <div className="md:flex">
          <div className="md:w-1/2 md:mr-4">
            <img src={equipe} style={{ height: "450px" }} alt="placeholder" className="w-full rounded-md shadow-lg" />
          </div>
          <div className="md:w-1/2" style={{marginLeft:"20px"}}>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Qui sommes-nous ?</h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              Notre site web de localisation de pharmacies a été créé pour
              faciliter l'accès aux services de santé pour les résidents du Maroc.
              <br></br>
              <br></br>
              Notre mission est de fournir une plateforme conviviale et accessible
              pour trouver facilement des pharmacies à proximité, ainsi que pour
              fournir des informations utiles sur les services offerts, les
              horaires d'ouverture, les numéros de téléphone et les adresses des
              pharmacies.
              <br></br>
              <br></br>
              Nous nous engageons à assurer la confidentialité et la sécurité des
              données des utilisateurs, ainsi qu'à fournir un service fiable et
              précis.
              <br></br>
              <br></br>
              N'hésitez pas à nous contacter pour toute question ou suggestion.
              Nous sommes là pour vous aider !
            </p>
          </div>
        </div>
        <div className="md:flex " style={{ marginTop: '50px' }}>

          <div className="md:w-1/2" style={{marginRight:"20px"}}>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center"> Nos services</h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              Notre site web est conçue pour offrir une expérience utilisateur simple et intuitive.
              Avec notre interface conviviale, il est facile de rechercher une pharmacie de garde dans une ville donnée ou de la localiser sur une carte interactive. Vous pouvez également filtrer votre recherche en fonction de vos besoins spécifiques, tels que les pharmacies
              ouvertes 24h/24 ou celles qui offrent des services de livraison à domicile.
              <br></br>
              <br></br>
              Notre plateforme est constamment mise à jour pour garantir que les informations sur les pharmacies de garde sont précises et à jour. Vous pouvez également recevoir des notifications en temps réel sur les pharmacies ouvertes les plus proches de votre position actuelle.
            </p>
          </div>
          <div className="md:w-1/2 md:mr-4"style={{marginLeft:"20px"}} >
            <img src={service} style={{ height: "400px", width: '550px' }} alt="placeholder" className="w-full rounded-md shadow-lg" />
          </div>
        </div>

        <div
          className="flex flex-col justify-center mx-42 bg-[#eef2f3]"
          style={{ marginTop: "40px" }}
        >

          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center"> Nos valeurs</h1>

          <br></br>
          <div
            className="flex flex-row justify-evenly"
            style={{ marginTop: "30px" }}
          >
            {valeurs.map((e) => {
              return (
                <div className="flex flex-col w-80 space-y-2" style={{ marginBottom: '25px' }}>
                  <h1
                    className="text-[#6366f1] font-bold  text-lg"
                    style={{ marginLeft: "80px" }}
                    key={e.id}
                  >
                    {e.nom}
                  </h1>
                  <p>{e.descption}</p>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Accueil;
