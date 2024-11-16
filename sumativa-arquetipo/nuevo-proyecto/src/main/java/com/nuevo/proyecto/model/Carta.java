package com.nuevo.proyecto.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Carta {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "carta_seq")
    @SequenceGenerator(name = "carta_seq", sequenceName = "carta_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull(message = "El título no puede ser nulo")
    @Size(min = 1, max = 100, message = "El título debe tener entre 1 y 100 caracteres")
    @Column(name = "nombre")
    private String nombre;
    @NotNull(message = "El nombre no puede ser nulo")    
    @Column(name = "precio")
    private int precio;
    @Column(name = "descripcion")
    private String descripcion;
    @NotNull(message = "La descripcion no puede ser nulo")
    @Size(min = 1, max = 50, message = "El tipo debe tener entre 1 y 50 caracteres")
    @Column(name = "tipo")
    private String tipo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecion(int precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

}
