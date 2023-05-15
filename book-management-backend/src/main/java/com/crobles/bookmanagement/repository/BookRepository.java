package com.crobles.bookmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crobles.bookmanagement.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>{

}
