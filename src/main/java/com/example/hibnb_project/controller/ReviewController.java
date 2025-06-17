package com.example.hibnb_project.controller;

import com.example.hibnb_project.data.dto.ReviewDTO;
import com.example.hibnb_project.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping(value = "/review/save")
    public ResponseEntity<?> saveReview(@RequestBody ReviewDTO reviewDTO) {
        this.reviewService.saveReview(reviewDTO);
        return ResponseEntity.ok("Review saved");
    }

    @DeleteMapping(value = "/review/delete")
    public ResponseEntity<?> deleteReview(@RequestParam Integer reviewid) {
        this.reviewService.deleteReview(reviewid);
        return ResponseEntity.ok("Review deleted");
    }



}
