package com.crobles.bookmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crobles.bookmanagement.entity.Book;
import com.crobles.bookmanagement.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
	
	@Autowired
	private final BookRepository bookRepository;
	
	public ResponseEntity<List<Book>> getAll(){
		return ResponseEntity.ok(bookRepository.findAll());
	}
	
	public ResponseEntity<Book> getBook(Integer id){
		Optional<Book> book = bookRepository.findById(id);
		
		if(book.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(book.get());
	}
	
	public ResponseEntity<Book> createBook(Book book){
		Book savedBook = bookRepository.save(book);
		
		if(savedBook == null) {
			return ResponseEntity.badRequest().build();
		}
		
		return ResponseEntity.ok(savedBook);
	}
	
	public ResponseEntity<Book> updateBook(Integer id, Book tempBook){
		Optional<Book> book = bookRepository.findById(id);
		
		if(book.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Book updatedBook = bookRepository.save(tempBook);
		return ResponseEntity.ok(updatedBook);
	}
	
	public ResponseEntity<?> deleteBook(Integer id){
		Optional<Book> book = bookRepository.findById(id);
		
		if(book.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		bookRepository.delete(book.get());
		return ResponseEntity.ok().build();
	}
	
}
