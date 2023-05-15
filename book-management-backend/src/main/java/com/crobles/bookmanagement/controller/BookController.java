package com.crobles.bookmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crobles.bookmanagement.entity.Book;
import com.crobles.bookmanagement.service.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
	
	@Autowired
	private final BookService bookService;
	
	@GetMapping("/getall")
	public ResponseEntity<List<Book>> getAll(){
		return bookService.getAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Book> getBook(@PathVariable Integer id){
		return bookService.getBook(id);
	}
	
	@PostMapping("/create")
	public ResponseEntity<Book> createBook(@Validated @RequestBody Book book){
		return bookService.createBook(book);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable Integer id, @RequestBody Book book){
		return bookService.updateBook(id, book);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteBook(@PathVariable Integer id){
		return bookService.deleteBook(id);
	}
	
}
