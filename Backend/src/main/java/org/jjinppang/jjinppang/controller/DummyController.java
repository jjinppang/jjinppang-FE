package org.jjinppang.jjinppang.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DummyController {

    @GetMapping("/dummy")
    public ResponseEntity dummy() {
        return ResponseEntity.ok(HttpStatus.OK);
    }
}