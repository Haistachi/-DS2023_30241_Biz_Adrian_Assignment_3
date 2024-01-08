package org.example.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Person {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false,unique = true)
    private String username;
    @Column(nullable = false)
    private String userPassword;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    public Person(String username) {
        this.username = username;
    }
    public Person(String username, String userPassword) {
        this.username = username;
        this.userPassword = userPassword;
    }

    public Person(String username, String userPassword, Role role) {
        this.username = username;
        this.userPassword = userPassword;
        this.role = role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }
}
