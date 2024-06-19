import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getBook, updateBook, updateAuthor } from "../../services/api";


const EditingBookPage = () =>{
    const  {id} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState("");


    useEffect(()=>{
        const fetchBook = async() =>{
        try{
                const bookData = await getBook(id);
                if (!bookData){
                    throw new Error("No se encontró el libro que intentas editar");
                }
                if (bookData)
                setBook(bookData);
                setLoading(false);
                
                
        }catch(error){
            setSubmitError(error.message);
            return error;
        }
    }
    fetchBook();

}, [id]);

    const handleSubmit = async(event) =>{
        
        event.preventDefault();
        const formData = new FormData (event.target) // Se crea un formData con los datos nuevos del libro
        const newBookData = {
            isbn: formData.get('isbn'),
            title: formData.get('title'),
            imgSrc: formData.get('imgSrc'),
            src: formData.get('src'),
            description: formData.get('description'),
            author : { 
                id: book.author.id,
                name: formData.get('authorName'),
            }
        };
        
        try{
            await updateBook(id,newBookData);
            setIsSubmitted(true);
        }catch(error){
            setSubmitError("No se encuentra book")
        }
        
       
    }

    return(
        <div>
            <h2>{loading ? "cargando..." : "Editando libro " + book.title}</h2>
            <p>Solo se editarán los campos rellenados</p>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label htmlFor="isbn">ISBN: </label><input type="text" name="isbn" placeholder={loading ? "Cargando..." : book.isbn}/>
                    </li>
                    <li>
                        <label htmlFor="title">Título: </label><input type="text" name="title" placeholder={loading ? "Cargando..." : book.title}/>
                    </li>
                    <li>
                        <label htmlFor="imgSrc">URL de imagen: </label> <input type="text" name="imgSrc" placeholder={loading ? "Cargando..." : book.imgSrc}/>
                    </li>
                    <li>
                        <label htmlFor="src">URL del libro: </label><input type="text" name="src" placeholder={loading ? "Cargando..." : book.src}/>
                    </li>
                    <li>
                        <label htmlFor="authorName">Nombre del autor:</label><input type="text" name="authorName" placeholder={loading ?"carando" : book.author.name}/>
                    </li>
                    <li>
                        <label className="labelLine" htmlFor="description">Descripción:  </label>
                        <textarea id="description" rows="4" cols="50" name="description" placeholder={loading ? "Cargando..." : book.description}></textarea>
                    </li>
                    <li>
                        {book && book.title != undefined && <input type="submit" value= "Editar" className="submitButton"></input>}
                    </li>
                </ul>
            </form>
            {isSubmitted && <p>Libro actualizado correctamente</p>}
            {submitError != ("") && <p className="error">{submitError}</p>}
        </div>
    )
}
export default EditingBookPage;
