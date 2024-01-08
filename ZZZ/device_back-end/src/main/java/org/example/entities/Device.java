package org.example.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Device {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Integer person;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String address;

    private double consumption;

    public Device(Integer person, String description , String address, double consumption)
    {
        this.person=person;
        this.description=description;
        this.address=address;
        this.consumption=consumption;
    }

    @Override
    public int hashCode() {
        return Objects.hash(person, description, address, consumption);
    }
}
