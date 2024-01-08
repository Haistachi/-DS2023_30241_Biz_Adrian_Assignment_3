package org.example.servicies;

import lombok.extern.slf4j.Slf4j;
import org.example.dtos.PersonDTO;
import org.example.dtos.PersonDTOBuilder;
import org.example.entities.Person;
import org.example.repositories.PersonRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
@Transactional
@Slf4j
public class PersonServices {

    @Autowired
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger LOGGER = LoggerFactory.getLogger(PersonServices.class);
    public List<PersonDTO> findUsers() {
        List<Person> personList = personRepository.findAll();
        personList.forEach(e-> System.out.println(e.getUsername()));
        return personList.stream()
                .map(PersonDTOBuilder::toPersonDTO)
                .collect(Collectors.toList());
    }

    public PersonDTO findUserById(Integer id) {
        Optional<Person> prosumerOptional = personRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("Person with id {} was not found in db", id);
        }
        return PersonDTOBuilder.toPersonDTO(prosumerOptional.get());
    }

    public Integer insert(PersonDTO personDTO) {
        Person person = PersonDTOBuilder.toEntity(personDTO);
        person.setUserPassword(passwordEncoder.encode(person.getUserPassword()));
        person = personRepository.save(person);
        LOGGER.debug("Person with id {} was inserted in db", person.getId());
        return person.getId();
    }

    public void deleteUser(Integer id) {
        Optional<Person> prosumerOptional = personRepository.findById(id);
        if (prosumerOptional.isPresent()) {
            personRepository.delete(prosumerOptional.get());
            LOGGER.debug("Person with id {} was deleted in db", id);
        }
    }

    public void update(PersonDTO personDTO) {
        Person person = PersonDTOBuilder.toEntityWithId(personDTO);
        person = personRepository.save(person);
        LOGGER.debug("Person with id {} was updated in db", person.getId());
    }

    public PersonDTO findUserByUsername(String username) {
        Optional<Person> prosumerOptional = personRepository.findByUsername(username);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("Person with id {} was not found in db", username);
        }
        return PersonDTOBuilder.toPersonDTO(prosumerOptional.get());
    }

    public List<Person> getAll(){
        return personRepository.findAll();
    }

//    @PostConstruct
//    public void add()
//    {
//        PersonDTO personDTO=new PersonDTO();
//        personDTO.setUsername("Haistachi");
//        personDTO.setUserPassword("Crusader2");
//        personDTO.setRol("admin");
//        insert(personDTO);
//        PersonDTO user=new PersonDTO();
//        personDTO.setUsername("User");
//        personDTO.setUserPassword("123");
//        personDTO.setRol("user");
//        insert(user);
//    }
}
