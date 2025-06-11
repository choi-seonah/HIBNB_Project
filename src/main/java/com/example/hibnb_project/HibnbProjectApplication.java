package com.example.hibnb_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HibnbProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(HibnbProjectApplication.class, args);
    }

}
