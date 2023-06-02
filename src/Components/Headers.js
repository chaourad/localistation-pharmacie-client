import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import Pharmacies from "./Pharmacies";
import Accueil from "./Accueil";
import Footer from "./Footer";
import { IoLocationSharp } from "react-icons/io5";
import Test from "./PharmacieVille";
import PharmacyDetails from "./PharmacyZoneDetails";
import PharmaciZone from "./PharmaciZone";
import Login from "./Login";
import Register from "./Register";
import UserContext from "../context/UserContext";
import UnLogged from './UnLogged'
import PharmacyRequestForm from "./Favorite";
import Favorite from "./Favorite";
import MentioneGarde from "./MentioneGarde";
import PharmacieVille from "./PharmacieVille";
import VotrePharmacie from "./VotrePharmacie";


function Headers() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

const {user} = useContext(UserContext);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <BrowserRouter>
          <div className="container mx-auto py-4 px-6 flex justify-between items-center">
            <a href="/" className=" flex  items-cente text-lg font-bold text-gray-800" > <IoLocationSharp size={30} height={10} color={"red"} /> <span>Pharmacie</span></a>
            <button className="sm:hidden" onClick={toggleMenu}>
              <svg viewBox="0 0 20 20" fill="currentColor" className="menu-icon w-6 h-6">
                <path fillRule="evenodd" d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2z" clipRule="evenodd" />
              </svg>
            </button>

            <nav className={`${menuOpen ? "block" : "hidden"
              } sm:block sm:flex`}>
              <ul className="flex flex-wrap items-center justify-between gap-x-4 text-sm font-medium text-black">
                <li className="nav-item"> <Link to="/" className="px-3 py-2 text-gray-600 hover:text-blue-500 ">Home</Link></li>
                <li className="nav-item"> <Link to="/pharmacieVille" className="px-3 py-2 text-gray-600 hover:text-gray-800 ">Pharmacie par ville</Link></li>
                <li className="nav-item"> <Link to="/Pharmacies" className="px-3 py-2 text-gray-600 hover:text-gray-800">Pharmacies</Link></li>
                <li className="nav-item"> <Link to="/login" className="px-3 py-2 text-gray-600 hover:text-gray-800 ">Me connecter</Link></li>
                <li className="nav-item"> <Link to="/contact" className="px-3 py-2 text-gray-600 hover:text-gray-800 ">Demande Pharmacie</Link></li>
                <li className="nav-item"> <Link to="/favorite" className="px-3 py-2 text-gray-600 hover:text-gray-800 ">Favorite</Link></li>
                {user.role === 'pharmacien' && (
  <li className="nav-item">
    <Link to="/mentionne-garde" className="px-3 py-2 text-gray-600 hover:text-gray-800">
      MentioneGarde
    </Link>
  </li>
)}   
        </ul>
            </nav>

          </div>
          <div>
            <Routes>
            
              <Route exact path="/" element={<Accueil />}></Route>
              <Route path="/pharmacies" element={<Pharmacies />} />
              <Route exact path="/pharmacieVille/:id" element={<PharmacyDetails />}  />
              <Route path="/pharmacieZone/:id" element={<PharmaciZone />} />
              <Route path="/pharmacieVille" element={<PharmacieVille />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={user.isLogged ? <Contact /> : <UnLogged />} />
              <Route path="/favorite" element={user.isLogged ? <Favorite /> : <UnLogged />} />
              <Route path="/register" element={<Register />} />
              <Route path="/mentionne-garde" element={<MentioneGarde />} />
           
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default Headers;
