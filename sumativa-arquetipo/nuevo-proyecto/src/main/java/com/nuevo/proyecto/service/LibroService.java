package com.nuevo.proyecto.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.nuevo.proyecto.model.Libro;
import com.nuevo.proyecto.repository.LibroRepository;


@Service
public class LibroService {
    @Autowired
    private LibroRepository libroRepository;

    public List<Libro> listaLibros() {
        return libroRepository.findAll();
    }

    public Optional<Libro> obtenerLibro(Long id) {
        return libroRepository.findById(id);
    }

    public Libro guardarLibro(Libro libro) {
        return libroRepository.save(libro);
    }

    public void eliminarLibro(Long id) {
        libroRepository.deleteById(id);
    }

}
