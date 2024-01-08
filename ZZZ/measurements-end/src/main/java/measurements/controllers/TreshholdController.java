package measurements.controllers;

import lombok.AllArgsConstructor;
import measurements.entities.Measurement;
import measurements.entities.Treshhold;
import measurements.services.TreshholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/treshhold")
public class TreshholdController {

    @Autowired
    public TreshholdController(TreshholdService treshholdService) {
        this.treshholdService = treshholdService;
    }
    @Autowired
    private final TreshholdService treshholdService;

    @GetMapping()
    public ResponseEntity<List<Treshhold>> getAll() {
        List<Treshhold> dtos = treshholdService.getAll();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/findByDevice/{device}")
    public ResponseEntity<Treshhold> getTreshholdByDevice(@PathVariable("device") Integer device) {
        Treshhold dtos = treshholdService.findThreshholdByIdDevice(device);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteTreshhold(@PathVariable("id") Integer idTreshhold) {
        treshholdService.deleteTreshhold(idTreshhold);
        return new ResponseEntity<>("Success delete", HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteByDevice/{id}")
    public ResponseEntity<String> deleteTreshholdByDevice(@PathVariable("id") Integer id) {
        Treshhold dtos = treshholdService.findThreshholdByIdDevice(id);
        System.out.println(dtos);
        treshholdService.deleteTreshhold(dtos.getIdTreshhold());
        return new ResponseEntity<>("Success delete", HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<String> updateTreshhold(@Valid @RequestBody Treshhold treshholdDTO) {
        treshholdService.update(treshholdDTO);
        return new ResponseEntity<>("Success Update", HttpStatus.OK);
    }

    @PostMapping(value = "/insert/{device}/{treshhold}")
    public ResponseEntity<Integer> insertTreshhold(@PathVariable("device") Integer device, @PathVariable Double treshhold) {
        Treshhold t= new Treshhold();
        t.setCurrent(0.0);
        t.setTreshhold(treshhold);
        t.setIdDevice(device);
        Integer idTreshhold = treshholdService.insert(t);
        return new ResponseEntity<>(idTreshhold, HttpStatus.CREATED);
    }

    @PutMapping(value = "/update/{device}/{treshhold}")
    public ResponseEntity<String> updateTreshhold(@PathVariable("device") Integer device, @PathVariable Double treshhold) {
        Treshhold oldt = treshholdService.findThreshholdByIdDevice(device);
        oldt.setTreshhold(treshhold);
        treshholdService.update(oldt);
        return new ResponseEntity<>("Success Update", HttpStatus.OK);
    }
}
