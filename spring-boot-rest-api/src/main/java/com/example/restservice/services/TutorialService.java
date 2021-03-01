package com.example.restservice.services;

import com.example.restservice.models.tutorial.Tutorial;
import com.example.restservice.repository.TutorialRepository;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@Service
public class TutorialService {

//    @Repository
    @Autowired
    TutorialRepository tutorialRepository;

    public String addTutorial(String title, String description, MultipartFile file) throws IOException {
        try {
            System.out.println("test1");
            Tutorial tutorial = new Tutorial(title, description);
            tutorial.setImage(
                    new Binary(BsonBinarySubType.BINARY, file.getBytes()));
            System.out.println("test2");
            System.out.println(tutorial.getImage());
            tutorial = tutorialRepository.insert(tutorial);
            System.out.println("Saved");
            return tutorial.getId();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return title;
    }

    public Tutorial getTutorial(String id) {
        return tutorialRepository.findById(id).get();
    }

}
