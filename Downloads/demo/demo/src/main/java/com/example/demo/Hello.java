package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hello {

    @RequestMapping("/Home")

    public String greet() {
        return "Welcome to Home Page";
    }

        @RequestMapping("/About")

        public String show() {
            return "Welcome to About Page";
        }

}
