package com.research.assistant.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.research.assistant.Model.User;
import com.research.assistant.Repository.UserRepository;
import com.research.assistant.request.LoginRequest;
import com.research.assistant.request.RegisterRequest;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(
        @RequestBody RegisterRequest request) {

    if(userRepository.findByEmail(request.getEmail())
            .isPresent()) {

        return ResponseEntity
                .badRequest()
                .body(Map.of("error", "Email already exists"));
    }

    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());

    user.setPassword(
            passwordEncoder.encode(
                    request.getPassword()
            )
    );

    userRepository.save(user);

    return ResponseEntity.ok(Map.of("message", "Registered"));
    
   }

@PostMapping("/login")
public ResponseEntity<?> login(
        @RequestBody LoginRequest request,
        HttpSession session) {

    User user =
            userRepository.findByEmail(
                    request.getEmail()
            ).orElse(null);

    if(user == null) {
        return ResponseEntity
                .badRequest()
                .body(Map.of("error", "Invalid Credentials"));
    }

    if(!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword())) {

        return ResponseEntity
                .badRequest()
                .body(Map.of("error", "Invalid Credentials"));
    }

    session.setAttribute(
            "USER_ID",
            user.getId()
    );

    return ResponseEntity.ok(Map.of("message", "Login Success"));
   }

@GetMapping("/me")
public ResponseEntity<?> me(
        HttpSession session) {

    Long userId =
            (Long) session.getAttribute(
                    "USER_ID"
            );

    if(userId == null) {
        return ResponseEntity
                .status(401)
                .body(Map.of("error", "Unauthorized"));
    }

    return ResponseEntity.ok(userId);
}

@PostMapping("/logout")
public ResponseEntity<?> logout(
        HttpSession session) {

    session.invalidate();

    return ResponseEntity.ok(Map.of("message", "Logged Out"));
}


}
