import React, { useContext } from "react";
import { fetchUser } from "../../../services/api";
import { AdminContext, toggleAdmin } from "../../../AdminContext";

export const LoginPage = () =>{

    const {isAdmin, toggleAdmin} = useContext(AdminContext);

    const handleSubmit = async(event) =>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const loginData = {
            username: formData.get('username'),
            password: formData.get('password'),
        }
        try{
            const result = await fetchUser(loginData);
        if (result.isAdmin){
            toggleAdmin(true);
        }else{
            console.log("Usuario no admin");
        }
        }catch(error){
            console.error("Error al iniciar sesión")
        }
        event.target.reset();
    }
    const closeSession = () =>{
        toggleAdmin(false);
    }

    return(
        <div className="loginPage">
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                    <label htmlFor="username">Nombre de usuario: </label>
                    <input name = "username" type="text"/>
                    </li>
                    <li>
                        <label htmlFor="password">Contraseña: </label>
                        <input name="password" type="password"/>
                    </li>
                    <li>
                        <input type="submit" className="submitButton" value={"enviar"}/>
                        <button className="submitButton" onClick={closeSession}>Cerrar sesion</button>

                    </li>
                </ul>
            </form>
        </div>
    )
}