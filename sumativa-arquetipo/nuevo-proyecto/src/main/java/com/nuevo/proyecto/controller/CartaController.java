package com.nuevo.proyecto.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.nuevo.proyecto.exception.ResourceNotFoundException;
import com.nuevo.proyecto.model.Carta;

import com.nuevo.proyecto.service.*;


import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/cartas")
public class CartaController {

    @Autowired
    private CartaService cartaService;

    @GetMapping()
    public List<Carta> listaCartas() {
        return cartaService.listaCartas();
    }

    @PostMapping()
    public ResponseEntity<Carta> crearCarta(@RequestBody Carta carta) {
        Carta nuevaCarta = cartaService.guardarCarta(carta);
        return new ResponseEntity<>(nuevaCarta, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carta> obtenerCarta(@PathVariable Long id) {
        Carta carta = cartaService.obtenerCarta(id)
                .orElseThrow(() -> new ResourceNotFoundException("La carta con id" + id + "no fue encontrado"));
        return ResponseEntity.ok(carta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCarta(@PathVariable Long id) {
        cartaService.obtenerCarta(id)
                .orElseThrow(() -> new ResourceNotFoundException("La carta con ID " + id + " no fue encontrado."));

        cartaService.eliminarCarta(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Carta> actualizarCarta(@PathVariable Long id, @Valid @RequestBody Carta detallesCarta) {
        Carta carta = cartaService.obtenerCarta(id)
                .orElseThrow(() -> new ResourceNotFoundException("La carta con ID " + id + " no fue encontrado."));
        carta.setNombre(detallesCarta.getNombre());
        carta.setDescripcion(detallesCarta.getDescripcion());
        carta.setPrecion(detallesCarta.getPrecio());
        carta.setTipo(detallesCarta.getTipo());
        Carta cartaActualizada = cartaService.guardarCarta(carta);

        return ResponseEntity.ok(cartaActualizada);
    }

}
