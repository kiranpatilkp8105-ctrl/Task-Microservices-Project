package com.task.user.controller;

import com.task.user.entity.User;
import com.task.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;   // ✅ IMPORTANT

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService service;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        boolean success = service.login(user.getEmail(), user.getPassword());
        return success ? "Login Successful" : "Invalid Credentials";
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return service.getUserById(id);
    }

    // UPDATE USER
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user) {
        return service.updateUser(id, user);
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return "User deleted successfully";
    }

    // ✅ GET ALL USERS (ADMIN)
    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }
}
