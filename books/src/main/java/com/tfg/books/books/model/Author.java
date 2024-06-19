package com.tfg.books.books.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.tfg.books.books.repository.AuthorRepository;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.repository.NoRepositoryBean;

import javax.lang.model.element.Name;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table (name="authors")
public class Author {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (unique = true, nullable = false)
    private String name;
    @JsonBackReference
    @OneToMany (mappedBy = "author", cascade = CascadeType.ALL)
    private List<Book> books = new ArrayList<>();




}