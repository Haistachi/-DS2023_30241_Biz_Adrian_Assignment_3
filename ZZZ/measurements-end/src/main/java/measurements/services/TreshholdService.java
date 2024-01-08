package measurements.services;

import measurements.entities.Treshhold;
import measurements.repositories.ITreshholdRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TreshholdService {

    @Autowired
    ITreshholdRepository iTreshholdRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(TreshholdService.class);

    public Treshhold saveTreshhold(Treshhold treshhold){
        return iTreshholdRepository.save(treshhold);
    }

    public List<Treshhold> getAll(){
        return iTreshholdRepository.findAll();
    }

    public Treshhold findThreshholdByIdDevice(Integer id) {

        List<Treshhold> treshholdOptional = iTreshholdRepository.findByIdDevice(id);
        //System.out.println(treshholdOptional);
        if (treshholdOptional.isEmpty()) {
            LOGGER.error("Treshhold with IdDevice id {} was not found in db", id);
            return null;
        }
        //System.out.println(treshholdOptional.get(0));
        return treshholdOptional.get(0);
    }

    public Double getThreshholdForDevice(Integer id)
    {
        Optional<Treshhold> treshholdOptional = iTreshholdRepository.findById(id);
        if (!treshholdOptional.isPresent()) {
            LOGGER.error("Treshhold with IdDevice id {} was not found in db", id);
        }
        return treshholdOptional.get().getTreshhold();
    }

    public void update(Treshhold TreshholdDTO) {
        Treshhold treshhold = new Treshhold(TreshholdDTO.getIdTreshhold(), TreshholdDTO.getIdDevice(),
                TreshholdDTO.getTreshhold(), TreshholdDTO.getCurrent());
        treshhold = iTreshholdRepository.save(treshhold);
        LOGGER.debug("Treshhold with id {} was updated in db", treshhold.getIdTreshhold());
    }

    public Integer insert(Treshhold TreshholdDTO) {
        Treshhold treshhold = new Treshhold( TreshholdDTO.getIdDevice(),
                TreshholdDTO.getTreshhold(), TreshholdDTO.getCurrent());;
        treshhold = iTreshholdRepository.save(treshhold);
        LOGGER.debug("Treshhold with id {} was inserted in db", treshhold.getIdTreshhold());
        return treshhold.getIdTreshhold();
    }

    public void deleteTreshhold(Integer id) {
        Optional<Treshhold> treshholdOptional = iTreshholdRepository.findById(id);
        if (treshholdOptional.isPresent()) {
            iTreshholdRepository.delete(treshholdOptional.get());
            LOGGER.debug("Treshhold with id {} was deleted in db", id);
        }
    }

}
