import React from "react"
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { getAuthors, deleteAuthor, updateAuthor } from "../../services/api"

const UpdateAuthorMenu = () => {
const navigate = useNavigate()
const [authors, setAuthors] = useState(null);

useEffect(() => {
    const loadAuthors = async()=> {
        try {
            const authorsData = await getAuthors();
            setAuthors(authorsData);
        }catch(error){
            return error;
        }
    }
    loadAuthors();
}, []);
    const handleDeleteClick = async (id) =>{
        try{
            await deleteAuthor(id);
            const updatedAuthors = await getAuthors();
            setAuthors(updatedAuthors);
        }catch(error){
            
        }
        
    }
    return(
        <div>
            {authors && authors.length>0 ? (
                authors.map((author) =>(
                    <div key ={author.id} className="divList">
                    <p>ID: {author.id}</p>
                    <p><h3 className="bookAuthor">{author.name}</h3></p>
                    <div><a className="editButton" onClick={() => handleDeleteClick(author.id)}>Eliminar</a></div>
                    </div>
                ))
            ): (
                <div>Cargando...</div>
            )}
        </div>
    )
}
export default UpdateAuthorMenu;