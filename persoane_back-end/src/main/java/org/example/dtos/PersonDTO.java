package org.example.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonDTO{
    private Integer id;
    private String username;

    private String userPassword;

    private String rol;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PersonDTO personDTO = (PersonDTO) o;
        return Objects.equals(username, personDTO.username) && Objects.equals(userPassword, personDTO.userPassword) && Objects.equals(rol, personDTO.rol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, userPassword, rol);
    }
}
