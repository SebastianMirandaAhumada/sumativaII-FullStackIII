package com.nuevo.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nuevo.proyecto.model.Libro;

public interface LibroRepository extends JpaRepository<Libro, Long> {

    
} 
