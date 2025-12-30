package com.task.user.service;

import com.task.user.entity.User;
import com.task.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    //post for ragistration
    public User register(User user) {
        return repo.save(user);
    }

    //post for login
    public boolean login(String email, String password) {
        User user = repo.findByEmail(email);
        return user != null && user.getPassword().equals(password);
    }

    //get
    public User getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }

    //put
    public User updateUser(Long id, User newUser) {

        User existingUser = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(newUser.getName());
        existingUser.setEmail(newUser.getEmail());
        existingUser.setPassword(newUser.getPassword());

        return repo.save(existingUser);
    }

    //delete
    public void deleteUser(Long id) {

        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        repo.delete(user);
    }


}

