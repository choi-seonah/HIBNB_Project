package com.example.hibnb_project.controller;

import com.example.hibnb_project.data.dto.UserDTO;
import com.example.hibnb_project.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/join")
    public ResponseEntity<String> join(@RequestBody UserDTO userDTO) {
        this.userService.join(userDTO);
        return ResponseEntity.ok("join success");
    }

    @PostMapping(value = "/logout1")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
        return ResponseEntity.status(HttpStatus.OK).body("refresh token deleted");
    }

    @GetMapping(value = "/re-confirm-id")
    public ResponseEntity<String> reConfirmId(@RequestParam String email, String code) {
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.findUserByEamil(email, code));
    }

    @GetMapping(value = "/re-confirm-pw")
    public ResponseEntity<String> reConfirmPw(@RequestParam String username, String email, String code) {
        if(this.userService.findByUsernameAndEmail(username, email, code)){
            return ResponseEntity.status(HttpStatus.OK).body("authorizied user");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("unauthorized");
    }

    @PutMapping(value = "/reset-pw")
    public ResponseEntity<String> resetPw(@RequestParam String username, String password) {
        this.userService.resetPassword(username, password);
        return ResponseEntity.ok("reset password success");
    }

}
