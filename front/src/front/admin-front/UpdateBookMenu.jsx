import React, { useState, useEffect } from "react";
import { getBooks, deleteBook} from "../../services/api";
import {useNavigate} from  "react-router-dom";
import { Col } from "react-bootstrap";

const UpdateBookMenu = () => {
const [books, setBooks] = useState(null);
const navigate = useNavigate();

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const booksData = await getBooks();
            setBooks(booksData);
            }catch (error){
                return error;
            }};
            loadBooks();

}, []);

    const handleBookClick = (id) => {
        navigate(`/books/${id}`)
    } 

    const handleEditClick = (id) =>{
      navigate (`/books/edit/${id}`)
    }

    const handleDeleteClick = async (id) => {
      try{
        await deleteBook(id);
      //refrescar despues de eliminar
      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
      }catch(error){
        console.error("error");
      }
      
    }

    return (
            <div>
          {books && books.length > 0 ? (
            books.map((book) => (
              <div key={book.id}className="divList">
                <p><a className="aList" onClick={() =>handleBookClick(book.id)} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="title">{book.title}</h3></a></p>
                <p className="bookAuthor"><b>Autor:</b> {book.author.name}</p>
                <p className="isbnE"><b>ISBN: </b>{book.isbn}</p>
                <p className="isbnE"><b>ID: </b>{book.id}</p>
                <div className="editingBookDiv">
                <Col xs= {7}>
                  <a onClick= {()=> handleEditClick(book.id)} className="editButton" style={{color: 'black'}}>Editar</a>
                  <a onClick= {()=> handleDeleteClick(book.id)} className="editButton" style={{color: 'red'}}>Eliminar</a>
                </Col>
                </div>
              </div>
            ))
          ) : (
            <div>Cargando...</div>
          )}
        </div>
    )
}

export default UpdateBookMenu;