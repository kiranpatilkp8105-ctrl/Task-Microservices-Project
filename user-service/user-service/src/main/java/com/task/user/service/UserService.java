package com.task.user.service;

import com.task.user.entity.User;
import com.task.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;   // ✅ IMPORTANT

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // REGISTER
    public User register(User user) {
        return repo.save(user);
    }

    // LOGIN
    public boolean login(String email, String password) {
        User user = repo.findByEmail(email);
        return user != null && user.getPassword().equals(password);
    }

    // GET BY ID
    public User getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // UPDATE
    public User updateUser(Long id, User newUser) {
        User existingUser = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(newUser.getName());
        existingUser.setEmail(newUser.getEmail());
        existingUser.setPassword(newUser.getPassword());

        return repo.save(existingUser);
    }

    // DELETE
    public void deleteUser(Long id) {
        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        repo.delete(user);
    }

    // GET ALL USERS (ADMIN)
    public List<User> getAllUsers() {
        return repo.findAll();
    }
}
