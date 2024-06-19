

//FUNCIÓN PARA VER LOS LIBROS
export const getBooks = async () =>{
    try{
        //respuesta = esperar respuesta de la api
        const response = await fetch('http://localhost:8100/books');
        //si no hay respuesta, error
        if(!response.ok){
            throw new Error('error al obtener los datos de los libros');
        }
        //datos = esperar respuesta en json
        const data = await response.json();
        //los datos ya convertidos se pasan
        return data;
    }catch(error){
        console.error('error: ', error);
    }
}

//función para ver un LIBRO según el ID
export const getBook = async (bookId) =>{
    try{
        const response = await fetch(`http://localhost:8100/books/${bookId}`)
        if(!response.ok){
            throw new Error('Error al obtener los datos del libro');
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error al obtener los datos del libro");
        return error;
    }

}

export const getLastBooks = async() =>{
    try{
        const response = await fetch('http://localhost:8100/books/last-added');
        if(response.ok){
            const lastAddedBooks = await response.json();
            return lastAddedBooks;
        }else{
            throw new Error("Error al obtener los últimos libros");
        }
    }catch(error){
        console.error('Error ', error);
    }
}

//Función para ver todos los autores
export const getAuthors = async () => {
    try{
        const response = await fetch('http://localhost:8100/authors');
    if(!response.ok){
        throw new Error('error al obtener los datos de los autores');
    }
    const data  = await response.json();
    console.log(data);
    return data;
    }catch(error){
        console.error(error);
    }
    
} 

//función para añadir autor
export const addAuthor = async (authorData) =>{

    try{
        if (!authorData.name){
            throw new Error('Campo "Nombre" necesario');
        }
        const response = await fetch('http://localhost:8100/authors/add-author',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(authorData),
        });
        if(!response.ok){
            throw new Error('Error al añadir autor');
        }
        return await response.json();
    }catch(error){
        console.error('addAuthor error: ', error);
        return{error: error.message}
    }
};


//Función para añadir libro
export const addBook = async(bookData) =>{
    try{
            //Error más genérico
        if(!bookData.title && !bookData.author.name){
            throw new Error('Es necesario rellenar el formulario para añadir un libro :)');
        }
            //Errrores para si falta algún campo del formulario en concreto
        if(!bookData.title){
            throw new Error('Campo "título" necesario');
        }else if(!bookData.author.name){
            throw new Error('Completa los datos del autor');
        }else if(!bookData.isbn){
            throw new Error ('campo ISBN vacio');
        }else if (!bookData.description){
            throw new Error ('Completa una  descripción para el libro');
        }else if(!bookData.imgSrc){
            throw new Error ('Inserta URL de imagen');
        }else if(!bookData.src || bookData.src === ""){
            throw new Error ('Es necesario poner el enlace al libro');
        }
        const response = await fetch("http://localhost:8100/books/add-book", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });
        if(!response.ok){
            throw new Error('Error al añadir libro');
        }
        return await response.json();

    }catch(error){
        console.error("error en la solicitud: ", error);
        //El error que retorne va a ser el que se muestre debajo del form
        return{error:error.message};
        
    }
}

    //para BORRAR libros
export const deleteBook = async(id) =>{
    try{const response = await fetch(`http://localhost:8100/books/delete?id=${id}`,{
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    })
    if(!response.ok){
        throw new Error("Error al eliminar el libro");
    }
    return await response.json();
    }catch(error){
        return error;
    }

}

    //Función para BORRAR autores
export const deleteAuthor = async(id) =>{
    try{
        const response = await fetch(`http://localhost:8100/authors/delete?id=${id}`, {
            method: 'DELETE',
            //headers: {'content-type': 'application/json',},
        });
        if(!response.ok){
            throw new Error('Error al borrar el autor');
        }
        return await response.json();

    }catch(error){
        return error;
    }
}

//Actualizar book
export const updateBook = async(id,newBookData) =>{
    try{

        const response = await fetch(`http://localhost:8100/books/modify/${id}`, {
            method: 'POST',
            headers: {
                'content-type':'application/json',
            },
            body: JSON.stringify(newBookData),
        });
        if(!response.ok){
            throw new Error("Error al encontrar el libro " + id);
        }
        return await response.json();

    }catch(error){
        return error.message;

    }
    
}

export const updateAuthor = async(id, newAuthorName) =>{
    try{
        const response  = await fetch(`http://localhost:8100/authors/modify/${id}`, {
            method : 'POST', 
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({newName: newAuthorName }),
        });
        if(!response.ok){
            console.error("no se puede actualizar el autor");
            throw new Error("Error al encontrar el autor: " + id);
        }
        return await response.json();
        
    }catch(error){
        return error.message;
    }


}

    export const fetchUser = async (userData) =>{
        try{
            const response = await fetch('http://localhost:8110/login',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)});
            if(!response.ok){
                throw Error('Error del servidor ');
            }
            const data = await response.json();
            
            return data;
            if(data){
                console.log("logged");
            }
        }catch(error){
            console.error(error.message);
        }
};



    
