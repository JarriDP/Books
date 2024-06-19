import React from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookCard = ({book}) =>{
    
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate(`/books/${book.id}`)
    }
    return(
        <Col xs={12}>

        
        <div className="bookCard">
            <Col xs={10} md={6}>
            <div style={{display :'flex', alignItems: 'center'}}>
                <img src={book.imgSrc} alt = {book.title}/>
                <h3>{book.title}</h3>
            </div>
            </Col>
            <Col xs={5}>
                <p>{book.description}</p>
            </Col>
            
            <h4 onClick={handleClick}>Ver más</h4>
        </div>
        </Col>
    );
};

export default BookCard;