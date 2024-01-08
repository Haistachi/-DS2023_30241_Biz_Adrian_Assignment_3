package org.example.controller;

import org.example.dtos.PersonDTO;
import org.example.servicies.PersonServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/person")
public class PersonController {
    private final PersonServices personService;

    @GetMapping()
    public ResponseEntity<List<PersonDTO>> getPersons() {
        List<PersonDTO> dtos = personService.findUsers();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @Autowired
    public PersonController(PersonServices personServices) {
        this.personService = personServices;
    }

    @PostMapping()
    public ResponseEntity<Integer> insertPerson(@Valid @RequestBody PersonDTO personDTO) {
        Integer personID = personService.insert(personDTO);
        return new ResponseEntity<>(personID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<PersonDTO> getPerson(@PathVariable("id") Integer personId) {
        PersonDTO dto = personService.findUserById(personId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deletePerson(@PathVariable("id") Integer personId) {
        personService.deleteUser(personId);
        return new ResponseEntity<>("Success delete", HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<String> updatePerson(@Valid @RequestBody PersonDTO personDTO) {
        personService.update(personDTO);
        return new ResponseEntity<>("Success Update", HttpStatus.OK);
    }

    @GetMapping(value = "/id/{name}")
    public ResponseEntity<Integer> getIdPerson(@PathVariable("name") String name) {
        PersonDTO dto = personService.findUserByUsername(name);
        return new ResponseEntity<>(dto.getId(), HttpStatus.OK);
    }

}
