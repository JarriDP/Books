import React, { useEffect, useState } from "react";
import { getBooks } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import BookPage from "./BookPage";

const BookList = () => {
    const[books, setBooks] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const loadBooks = async() => {
            try {
                const booksData = await getBooks();
                setBooks(booksData);
              } catch (error) {
                console.error('Error:', error);
              }
        };

        loadBooks()
    }, []); 
    const handleBookClick = (id) =>{
      navigate(`/books/${id}`);
    }
    if (!books){
      return(
        <h1>No se encontraron libros</h1>
      )
    }
    return (
        <div>
          {books && books.length > 0 ? (
            books.map((book) => (
              <div key={book.id}className="divList">
                <a className="aList" onClick={() =>handleBookClick(book.id)}>
                <h3 className="title">{book.title}</h3></a>
                <p className="bookAuthor"><b>Autor:</b> {book.author.name}</p>
                <p className="isbn"><b>ISBN: </b>{book.isbn}</p>
              </div>
            ))
          ) : (
            <div>Cargando...</div>
          )}
        </div>
      );
    };
    
    export default BookList;
