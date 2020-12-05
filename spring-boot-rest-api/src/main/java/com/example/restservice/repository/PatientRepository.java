package com.example.restservice.repository;

import java.time.LocalDate;
import java.util.List;

import com.example.restservice.models.patient.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PatientRepository extends MongoRepository<Patient, String> {
    List<Patient> findByNameContaining(String name);

    List<Patient> findByNameContainingAndDob(String name, LocalDate dob);
}
