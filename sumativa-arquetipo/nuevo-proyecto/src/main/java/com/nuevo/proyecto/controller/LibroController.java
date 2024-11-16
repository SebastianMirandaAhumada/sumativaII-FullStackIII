package com.nuevo.proyecto.controller;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nuevo.proyecto.exception.ResourceNotFoundException;
import com.nuevo.proyecto.model.Libro;
import com.nuevo.proyecto.service.LibroService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/libros")
public class LibroController {
    @Autowired
    private LibroService libroService;

    @GetMapping()
    public List<Libro> listaLibros() {
        return libroService.listaLibros();
    }

    @PostMapping
    public ResponseEntity<Libro> crearLibro(@Valid @RequestBody Libro libro) {
        Libro nuevLibro = libroService.guardarLibro(libro);
        return new ResponseEntity<>(nuevLibro, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> obtenerLibro(@PathVariable Long id) {
        Libro libro = libroService.obtenerLibro(id)
                .orElseThrow(() -> new ResourceNotFoundException("El libro con ID " + id + " no fue encontrado."));
        return ResponseEntity.ok(libro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Long id) {
        libroService.obtenerLibro(id)
                .orElseThrow(() -> new ResourceNotFoundException("El libro con ID " + id + " no fue encontrado."));

        // Elimina el libro si existe
        libroService.eliminarLibro(id);

        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Libro> actualizarLibro(@PathVariable Long id, @Valid @RequestBody Libro detallesLibro) {
        Libro libro = libroService.obtenerLibro(id)
                .orElseThrow(() -> new ResourceNotFoundException("El libro con ID " + id + " no fue encontrado."));

        libro.setTitulo(detallesLibro.getTitulo());
        libro.setAutor(detallesLibro.getAutor());
        libro.setAnioPublicacion(detallesLibro.getAnioPublicacion());
        libro.setGenero(detallesLibro.getGenero());
        Libro libroActualizado = libroService.guardarLibro(libro);
        return ResponseEntity.ok(libroActualizado);
    }

}
