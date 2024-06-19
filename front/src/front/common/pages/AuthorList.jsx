import React, { useEffect, useState } from "react";
import { getAuthors } from "../../../services/api";

const AuthorList = () =>{
    const[authors, setAuthors] = useState([]);

    useEffect(() => {
        const loadAuthors = async() => {
            try{
                const authorsData = await getAuthors();
                setAuthors(authorsData);
            }catch(error){
            console.error(error);
        }
    };
    loadAuthors();
}, []);

if (!authors){
    return(<h2>No se encuentran autores</h2>)
}

return(
    <div>
        {authors && authors.length>0 ? (
            authors.map((author) =>(
                <div key ={author.id} className="divList">
                <h3 className="nameOfAuthor">{author.name}</h3>
                </div>
            ))
        ): (
            <div>Cargando...</div>
        )}
    </div>
)
}

export default AuthorList;