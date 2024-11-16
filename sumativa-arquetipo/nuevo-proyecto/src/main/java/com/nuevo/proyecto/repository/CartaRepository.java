package com.nuevo.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nuevo.proyecto.model.Carta;



public interface CartaRepository extends JpaRepository<Carta, Long> {
    
}
