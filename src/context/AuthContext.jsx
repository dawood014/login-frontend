import { createContext, useContext, useState } from "react";
import api from "../api/axios";


const AuthContext = createContext();



export function AuthProvider({children}){


    const [user,setUser] = useState(

        JSON.parse(
            localStorage.getItem("user")
        ) || null

    );



    const [token,setToken] = useState(

        localStorage.getItem("token") || null

    );




    const login = (userData, tokenData)=>{


        setUser(userData);

        setToken(tokenData);


        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );


        localStorage.setItem(
            "token",
            tokenData
        );


    };




    const logout = async ()=>{


    try {


        await api.post("/logout");


    }
    catch(error){


        console.log(error);


    }
    finally{


        setUser(null);

        setToken(null);


        localStorage.removeItem("user");

        localStorage.removeItem("token");


    }


};





    return (

        <AuthContext.Provider

        value={{

            user,

            token,

            login,

            logout

        }}

        >

            {children}

        </AuthContext.Provider>

    )


}




export function useAuth(){

    return useContext(AuthContext);

}