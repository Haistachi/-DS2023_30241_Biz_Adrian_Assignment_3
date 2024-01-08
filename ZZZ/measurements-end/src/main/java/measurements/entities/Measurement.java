package measurements.entities;

import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
public class Measurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idMeasurement;

    @Column(nullable = false)
    private int idDevice;
    @Column(nullable = false)
    //@Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime timest;

    @Column(nullable = false)
    private Double val;

    public Measurement(LocalDateTime timest, Double val) {
        this.timest = timest;
        this.val = val;
    }

    public Measurement(int idDevice, LocalDateTime timest, Double val) {
        this.idDevice = idDevice;
        this.timest = timest;
        this.val = val;
    }

    @Override
    public int hashCode() {
        return Objects.hash(timest, idDevice, val);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Measurement measurementDTO = (Measurement) o;
        return Objects.equals(timest, measurementDTO.timest) &&
                idDevice==measurementDTO.idDevice &&
                val==measurementDTO.val;
    }
}
