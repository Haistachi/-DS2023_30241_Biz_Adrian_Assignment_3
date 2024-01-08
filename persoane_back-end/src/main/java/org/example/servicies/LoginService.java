package org.example.servicies;

import lombok.extern.slf4j.Slf4j;
import org.example.dtos.PersonDTO;
import org.example.dtos.PersonDTOBuilder;
import org.example.entities.Person;
import org.example.repositories.PersonRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@AllArgsConstructor
@Service
@Transactional
@Slf4j
public class LoginService implements UserDetailsService{
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginService.class);
    public String log(PersonDTO person) throws UsernameNotFoundException
    {
        Optional<Person> prosumerOptional = personRepository.findByUsername(person.getUsername());
        if(passwordEncoder.matches(person.getUserPassword(), prosumerOptional.get().getUserPassword())) {
            LOGGER.debug("Person with name {} has loggedIn", person.getUsername());
            return prosumerOptional.map(value -> value.getRole().toString()).orElse(null);
        }
        else
        {
            LOGGER.debug("Incorect Password {} for {}", person.getUserPassword(), person.getUsername());
            throw new UsernameNotFoundException("User not found with username: " + person.getUsername());
        }
    }

    public Person findPersonByUsername(String username) throws UsernameNotFoundException
    {
        Optional<Person> prosumerOptional = personRepository.findByUsername(username);
        if (prosumerOptional.isPresent()) {
            log.info("Fetching user {}", username);
            return prosumerOptional.get();
        }
        else
            throw new UsernameNotFoundException("User not found with username: " + username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Person> prosumerOptional = personRepository.findByUsername(username);
        if (prosumerOptional.isPresent()) {
            LOGGER.debug("User found for login: {}", prosumerOptional.get().toString());

            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(prosumerOptional.get().getRole().toString()));
            return new org.springframework.security.core.userdetails.User(
                    prosumerOptional.get().getUsername(),
                    prosumerOptional.get().getUserPassword(),
                    authorities
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
