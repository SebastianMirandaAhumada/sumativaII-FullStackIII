package com.nuevo.proyecto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.nuevo.proyecto.model.Usuarios;
import com.nuevo.proyecto.repository.UserRepository;

import java.util.Optional;



@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Usuarios createUser(Usuarios user) {       
        return userRepository.save(user);
    }

    public List<Usuarios> listaUsuarios() {
        return userRepository.findAll();
    }

    public Optional<Usuarios> findByUsername(Long id) {
        return userRepository.findById(id);
    }
}
