package measurements.repositories;

import measurements.entities.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IMeasurementRepository extends JpaRepository<Measurement,Integer> {

    List<Measurement> findByIdDeviceAndTimestBetween(Integer idDevice, LocalDateTime timestampStart, LocalDateTime timestampFinish);
    List<Measurement> findByVal(double consumption);
    List<Measurement> findByIdMeasurement(Integer id);
    List<Measurement> findByIdDevice(Integer id);
    List<Measurement> findMeasurementByIdDeviceAndTimest(Integer idDevice, LocalDateTime timestamp);
}
