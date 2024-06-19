package com.tfg.books.books.controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.tfg.books.books.model.Author;
import com.tfg.books.books.model.AuthorDto;
import com.tfg.books.books.model.Book;
import com.tfg.books.books.service.Service;
import feign.Body;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
public class Controller {
    @Autowired
    private Service bookService;

    @GetMapping("/books")
    public List<Book>getAllBooks(){

        return bookService.getAllBooks();

    }

    @GetMapping("/books/{id}")
    public Book getBookById(@PathVariable long id){
        return bookService.getBook(id);
    }

    @GetMapping ("/authors")
    public List<Author>getAllAuthors(){ return bookService.getAllAuthors();}

    @GetMapping ("/authors/{name}")
    public Author getAuthorByName(@PathVariable String name){return bookService.getAuthor(name);}


    @PostMapping("/authors/modify/{actualName}")
    public ResponseEntity updateName(@RequestBody String newName, @PathVariable String actualName){
        try{

            bookService.modifyName(actualName, newName);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al cambiar nombre del autor");
        }
    }

    @PostMapping("/authors/add-author")
    public ResponseEntity<?> addAuthor(@RequestBody Author author){
        try{
            Author existingAuthor = bookService.getAuthor(author.getName());
            if(existingAuthor == null){
                Author newAuthor = Author.builder()
                        .name(author.getName())
                        .build();
            }
            bookService.saveAuthor(author);
            return ResponseEntity.accepted().body(author);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Problema añadiendo autor");

        }
    }

    @DeleteMapping("/authors/delete")
    public String deleteAuthorId(@RequestParam long id){
        bookService.deleteAuthorId(id);
        return "TODO OK";
    }

    @DeleteMapping("/books/delete")
    public String deleteBookId(@RequestParam("id") long id){
        bookService.deleteBookId(id);
        return "TODO OK";
    }

    //Para que te pida autor cuando no lo detecta
    @PostMapping("/books/add-book")
    public ResponseEntity<?> addBook(@RequestBody Book book){
        try {
            Author existingAuthor = bookService.getAuthor(book.getAuthor().getName());
            if(existingAuthor == null){

                Author author = Author.builder()
                        .name(book.getAuthor().getName())
                        .books(Collections.singletonList(book))
                        .build();
                book.setAuthor(author);
                bookService.saveAuthor(author);
            } else {
                book.setAuthor(existingAuthor);
                existingAuthor.getBooks().add(book);
                bookService.saveAuthor(existingAuthor);
            }
            bookService.saveBook(book);
            return ResponseEntity.accepted().body(book);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error fatal");
        }
    }



}
