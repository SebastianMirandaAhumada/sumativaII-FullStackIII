package com.nuevo.proyecto.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "libro_seq")
    @SequenceGenerator(name = "libro_seq", sequenceName = "libro_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull(message = "El título no puede ser nulo")
    @Size(min = 1, max = 100, message = "El título debe tener entre 1 y 100 caracteres")
    @Column(name = "titulo")
    private String titulo;
    @NotNull(message = "El autor no puede ser nulo")
    @Size(min = 1, max = 100, message = "El nombre del autor debe tener entre 1 y 100 caracteres")
    @Column(name = "autor")
    private String autor;
    @Column(name = "ANIO_PUBLICACION")
    private String anioPublicacion;
    @NotNull(message = "El género no puede ser nulo")
    @Size(min = 1, max = 50, message = "El género debe tener entre 1 y 50 caracteres")
    @Column(name = "genero")
    private String genero;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getAnioPublicacion() {
        return anioPublicacion;
    }
    

    public void setAnioPublicacion(String anioPublicacion) {
        this.anioPublicacion = anioPublicacion;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

}
