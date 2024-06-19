import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { getLastBooks } from "../../services/api";

const LastAddedBooks = () => {

    const [books, setBooks] = useState([]);
    useEffect (() =>{
        const fetchLastAddedBooks = async ()=>{
            const lastBooks = await getLastBooks();
            if(lastBooks){
                setBooks(lastBooks);
            }
        };
        fetchLastAddedBooks();
    }, [])//El array vacío asegura que el efecto see ejecute solo una vez al montar
    return(
        <div className="lastAddedBooks">
            {books.map (book => <BookCard key={book.id} book = {book}/>)}
        </div>
    )
}

export default LastAddedBooks;