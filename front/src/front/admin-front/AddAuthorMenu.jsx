import React from 'react'
import { addAuthor } from '../../services/api'
import { useState } from 'react';

const AddAuthorMenu = () => {

  const[isSubmitted, setIsSubmitted] = useState(false);
  const[submitError, setSubmitError] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    setIsSubmitted(false);
    setSubmitError('');
    const formData = new FormData(event.target);
    const authorData = Object.fromEntries(formData);
    const result = await addAuthor(authorData);
    if (result && result.error) {
      // Si hay un error, actualiza el estado submitError
      setSubmitError(result.error);
    } else {
      // Si no hay error, actualiza el estado isSubmitted
      setIsSubmitted(true);
    }
  };
    
  return (
    <div>
      <h2>Añadir autor</h2>
      <form onSubmit={handleSubmit} name='authorData' >
        <ul className='formUL'>
          <li><p>Nombre: <input type = 'text' name='name'></input></p></li>
        </ul>
        <input className='submitButton' type ="submit" value="enviar"></input>
      </form>
      {isSubmitted && <p>El autor se ha añadido correctamente</p>}
      {submitError && <p className='error'>{submitError}</p>}
    </div>
  )
}

export default AddAuthorMenu
