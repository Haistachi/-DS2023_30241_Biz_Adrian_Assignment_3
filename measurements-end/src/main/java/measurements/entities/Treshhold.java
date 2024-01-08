package measurements.entities;
import lombok.*;

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
public class Treshhold {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTreshhold;

    @Column(nullable = false)
    private int idDevice;

    @Column(nullable = false)
    private Double treshhold;

    @Column(nullable = false)
    private Double current;

    public Treshhold(int idDevice, Double treshhold, Double current) {
        this.idDevice = idDevice;
        this.treshhold = treshhold;
        this.current = current;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idDevice, treshhold, current);
    }
}
