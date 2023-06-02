
import { useEffect, useState } from "react";
import Headers from "./Components/Headers";
import UserContext from "./context/UserContext";
function App() {
  const [user, setUser] = useState({
    isLogged : false ,
    user_id : -1,
    role: "",
    pharmacy_id:-1
  })

  const checkUser = () => {
    // HNA KHSKI TJIBI ID 
    const founded = localStorage.getItem("user");
    if(founded === "true"){
          setUser({
            isLogged : true,
            user_id:localStorage.getItem("user_id"),
            pharmacy_id:localStorage.getItem("pharmacy_id"),
            role : localStorage.getItem("role")
          })
    }
  }
  

  useEffect(() => {
    checkUser()
  },[])

  return (
   <div>
   <UserContext.Provider value={{user, setUser}}>
   <Headers/>
   </UserContext.Provider>
     
   </div>
  );
}

export default App;
