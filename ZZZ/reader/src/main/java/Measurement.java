import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
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
}
