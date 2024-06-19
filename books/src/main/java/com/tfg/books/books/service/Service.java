package com.tfg.books.books.service;

import com.tfg.books.books.model.Author;
import com.tfg.books.books.model.Book;
import com.tfg.books.books.repository.AuthorRepository;
import com.tfg.books.books.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;


import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class Service {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;

    public Service(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository=bookRepository;
        this.authorRepository=authorRepository;
    }

    public Book getBook(long id){
        Optional<Book> book = bookRepository.findById(id);
        if(book.isEmpty()){
            return null;
        }
        return book.get();
    }

    public Author getAuthor(String name){
        Optional<Author> author = authorRepository.findByName(name);
        if(author.isEmpty()){
            return null;
        }
        return author.get();
    }


    @Transactional
    public void saveAuthor(Author author) {
        authorRepository.save(author);
    }

    @Transactional
    public void updateListBooksToAuthor(Book book, String name) {
        Author author = getAuthor(name);
        author.getBooks().add(book);
        authorRepository.save(author);
    }

    @Transactional
    public void saveBook(Book book) {
        bookRepository.save(book);
    }

    @Transactional
    public void modifyName(String oldName, String newName){
        Author author = authorRepository.findByName(oldName).orElseThrow(() -> new EntityNotFoundException("No se encontró el autor: "+ oldName));
        author.setName(newName);
        authorRepository.save(author);
    }
    @Transactional
    public void deleteAuthorId(long id) {
        authorRepository.deleteById(id);
    }
    @Transactional
    public void deleteBookId(long id){
        bookRepository.deleteById(id);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();

    }
    public List<Author> getAllAuthors(){
        return authorRepository.findAll();
    }


}