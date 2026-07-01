package edu.cit.cardoso.basuratrack.controller;

import edu.cit.cardoso.basuratrack.entity.User;
import edu.cit.cardoso.basuratrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setRole("RESIDENT");
        return userRepository.save(user);
    }
}
