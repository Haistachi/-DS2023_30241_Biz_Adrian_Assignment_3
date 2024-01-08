package org.example.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.example.dtos.PersonDTO;
import org.example.entities.Person;
import org.example.servicies.LoginService;
import lombok.AllArgsConstructor;
import org.example.servicies.PersonServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.io.IOException;
import java.util.*;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(value = "/login")
@Slf4j
public class LoginController {
    @Autowired
    private final LoginService loginService;

    private static final Logger LOGGER = LoggerFactory.getLogger(PersonServices.class);

    @PostMapping("/aut1")
    public ResponseEntity<String> singIn(@Valid @RequestBody PersonDTO personDTO) {
        String rol= loginService.log(personDTO);
        return new ResponseEntity<>(rol, HttpStatus.OK);
    }

    @GetMapping("/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer "))
        {
            try{
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier= JWT.require(algorithm).build();
                DecodedJWT decodedJWT= verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                Person person = loginService.findPersonByUsername(username);
                LOGGER.debug(person.toString());
                ArrayList<String> list= new ArrayList<>();
                list.add(person.getRole().toString());
                String access_token = JWT.create()
                        .withSubject(person.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", list)
                        .sign(algorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            }catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }else{
            throw new RuntimeException("Refresh token fail!");
        }
    }

    @PostMapping("/aut2")
    public ResponseEntity<UserDetails> singInDet(@Valid @RequestBody PersonDTO personDTO) {
        String rol= loginService.log(personDTO);
        if(rol != null) {
            UserDetails userDetails = loginService.loadUserByUsername(personDTO.getUsername());
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }
}