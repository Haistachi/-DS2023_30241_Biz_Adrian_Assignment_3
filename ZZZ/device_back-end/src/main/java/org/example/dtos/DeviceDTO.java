package org.example.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeviceDTO {


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer person;
    private String description;
    private String address;
    private double consumption;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DeviceDTO deviceDTO = (DeviceDTO) o;
        return Objects.equals(description, deviceDTO.description) &&
                Objects.equals(address, deviceDTO.address) &&
                person==deviceDTO.person &&
                consumption==deviceDTO.consumption;
    }

    @Override
    public int hashCode() {
        return Objects.hash(person, description, address, consumption);
    }
}
