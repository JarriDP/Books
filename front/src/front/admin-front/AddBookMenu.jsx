import React from "react";
import { addBook } from "../../services/api";
import { useState } from "react";

const AddBookMenu = () => {
    const[isSubmitted, setIsSubmitted] = useState(false);
    const[submitError, setSubmitError] = useState('');

const handleSubmit = async(event) =>{
    event.preventDefault();
    setIsSubmitted(false);
    setSubmitError('');
    const formData = new FormData(event.target);
    const bookData = {
        isbn: formData.get('isbn'),
        title: formData.get('title'),
        imgSrc: formData.get('imgSrc'),
        src: formData.get('src'),
        description: formData.get('description'),
        author: {
            name: formData.get('authorName')
        }
    };
    if (bookData.isbn === ""){
        bookData.isbn = "n/a";
    }
        const result = await addBook(bookData);
    if(result && result.error){
        setSubmitError(result.error);
    }else{
        setIsSubmitted(true);
    }
    
}
return(
    <div>
        <h2>Añadir libro</h2>
        <form onSubmit={handleSubmit} name='bookData'>
            <ul className="formUL">
                <li>
                    <label htmlFor="isbn">ISBN:  </label>
                    <input type="text" id="isbn" name="isbn" />
                </li>
                <li>
                    <label htmlFor ="title">Título:  </label>
                    <input type="text" id="title" name="title"/>
                </li>
                <li>
                    <label htmlFor="imgSrc">URL de la imagen:  </label>
                    <input type="text" id="imgSrc" name="imgSrc" />
                </li>
                <li>
                    <label htmlFor="src">Url del libro:  </label>
                    <input type="text" name="src" id="src"/>
                </li>
                <li>
                    <label htmlFor="authorName">Nombre del autor:  </label>
                    <input type="text" id="authorName" name="authorName" />
                </li>
                <li>
                    <label className="labelLine" htmlFor="description">Descripción:  </label>
                    <textarea id="description" rows="4" cols="50" name="description"></textarea>
                </li>
                <li>
                    <input className="submitButton" type="submit" value="enviar"/>
                </li>
            </ul>
        </form>
        {isSubmitted && <p>Libro añadido correctamente</p>}
        {submitError && <p className="error">{submitError}</p>}
    </div>
)};

export default AddBookMenu


