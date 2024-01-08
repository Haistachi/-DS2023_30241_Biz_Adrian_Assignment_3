package measurements.repositories;

import jdk.jfr.Threshold;
import measurements.entities.Treshhold;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Repository
public interface ITreshholdRepository extends JpaRepository<Treshhold, Integer> {
    List<Treshhold> findByIdDevice(Integer id);

}
