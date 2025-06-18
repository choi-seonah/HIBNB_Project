package com.example.hibnb_project.controller;

import com.example.hibnb_project.jwt.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReissueController {

    private final JwtUtil jwtUtil;

    @PostMapping(value = "/reissue")
    public ResponseEntity<String> reissue(HttpServletRequest request, HttpServletResponse response) {
        String refresh_token = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh")) {
                    refresh_token = cookie.getValue();
                    break;
                }
            }
        }

        if (refresh_token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("token is null");
        }

        try {
            this.jwtUtil.isExpired(refresh_token);
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("token is expired");
        }

        String category = jwtUtil.getCategory(refresh_token);
        if (!category.equals("refresh")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("token is invalid");
        }

        String username = this.jwtUtil.getUsername(refresh_token);
        String role = this.jwtUtil.getRole(refresh_token);
        String access = this.jwtUtil.createToken("access", username, role, 60*60*1000L);
        response.addHeader("Authorization", "Bearer " + access);
        return ResponseEntity.status(HttpStatus.CREATED).body("token created");
    }
}
