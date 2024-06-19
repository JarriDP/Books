import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../../services/api";

const BookPage = () => {
    const [book, setBook] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0,0);
        const fetchBookData = async () => {
            try {
                const book = await getBook(id);
                setBook(book);
            } catch (error) {
                console.error("Error al recuperar los datos del libro", error);
            }
        };

        fetchBookData();
    }, [id]); // Añade 'id' como dependencia aquí
    console.log("enviando id "+id)

    if (!book) {
        return <div>Cargando...</div>;
    }


    return (
    <div className="generalBookPage">
        <div className="bookPage" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop: '50px', marginBottom: '20px', marginTop :'10px' }}>
            <img src ={book.imgSrc} className="cover"></img>
            <div style={{ display: 'column', alignItems: 'center',justifyContent: 'center', margin: '20px' }}>
                <h1 style={{marginBottom: '50px' }}>{book.title}</h1>
                <h3>Autor/a: {book.author.name}</h3>
                <button className="goBookButton"><a href={book.src} className="bookLink" target = "_blank">Ir al libro</a></button>
            </div>
        </div>
        <h2>Descripción: </h2>
        <p className="description">{book.description}</p>
    </div>
        
    )
};

export default BookPage;