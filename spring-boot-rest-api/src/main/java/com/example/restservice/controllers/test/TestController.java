package com.example.restservice.controllers.test;

import com.example.restservice.models.tests.Test;
import com.example.restservice.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    TestRepository testRepository;

    @GetMapping("/tests")
    public ResponseEntity<List<Test>> getAllTests() {
        try {
            List<Test> tests = new ArrayList<Test>();
            testRepository.findAll().forEach(tests::add);

            if (tests.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tests/{id}")
    public ResponseEntity<Test> gettest(@PathVariable("id") String id) {
        Optional<Test> testData = testRepository.findById(id);
        if (testData.isPresent()) {
            return new ResponseEntity<>(testData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/tests")
    public ResponseEntity<Test> createTest(@RequestBody Test test) {
        try {
            Test _test = testRepository.save(new Test(
                    test.getId(),
                    test.getName(),
                    test.getShortname(),
                    test.getSamname(),
                    test.getPrice(),
                    test.getQuantity()
            ));
            return new ResponseEntity<>(_test, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/tests/{id}")
    public ResponseEntity<Test> updateTest(@PathVariable("id") String id, @RequestBody Test test) {
        Optional<Test> testData = testRepository.findById(id);
        if (testData.isPresent()) {
            Test _test = testData.get();
            _test.setName(test.getName());
            _test.setShortname(test.getShortname());
            _test.setSamname(test.getSamname());
            _test.setPrice(test.getPrice());
            _test.setQuantity(test.getQuantity());
            return new ResponseEntity<>(testRepository.save(_test), HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/tests/{id}")
    public ResponseEntity<HttpStatus> deleteTest(@PathVariable("id") String id) {
        try {
            testRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
