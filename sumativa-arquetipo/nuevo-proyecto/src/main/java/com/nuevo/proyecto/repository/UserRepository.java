package com.nuevo.proyecto.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.nuevo.proyecto.model.Usuarios;


public interface UserRepository extends JpaRepository<Usuarios, Long> {

}
