package com.tfg.books.books.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
@Setter
@Table(name="books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true, unique = false)
    private String isbn;

    @Column(unique = true, nullable = false)
    private String title;

    private String imgSrc;

    private String src;

    private String description;


    @ManyToOne(optional = false)
    private Author author;
}




