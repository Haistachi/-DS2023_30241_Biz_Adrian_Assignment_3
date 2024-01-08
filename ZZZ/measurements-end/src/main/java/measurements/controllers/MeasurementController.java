package measurements.controllers;

import measurements.entities.Treshhold;
import measurements.services.TreshholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import measurements.entities.Measurement;
import measurements.services.MeasurementService;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/measurement")
public class MeasurementController {

    @Autowired
    public MeasurementController(MeasurementService measurementService) {
        this.measurementService = measurementService;
    }
    @Autowired
    private final MeasurementService measurementService;

    @GetMapping()
    public ResponseEntity<List<Measurement>> getAll() {
        List<Measurement> dtos = measurementService.getAll();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/findByDevice/{device}")
    public ResponseEntity<List<Measurement>> getMeasurementByDevice(@PathVariable("device") Integer device) {
        List<Measurement> dtos = measurementService.findMeasurementsByIdDevice(device);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/findByDeviceAndDate/{device}/{date}")
    public ResponseEntity<List<Measurement>> getMeasurementByDeviceAndDate(@PathVariable("device") Integer device,
                                                            @PathVariable("date")
                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                                                            LocalDateTime date) {
        System.out.println(device);
        System.out.println(date.toString());
        List<Measurement> dtos = measurementService.findMeasurementsByIdDeviceAndTimest(device, date);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteMeasurement(@PathVariable("id") Integer idMeasurement) {
        measurementService.deleteMeasurement(idMeasurement);
        return new ResponseEntity<>("Success delete", HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/findByDevice/{id}")
    public ResponseEntity<String> deleteMeasurementDevice(@PathVariable("id") Integer id) {
        ArrayList<Measurement> dtos =new ArrayList<Measurement>( measurementService.findMeasurementsByIdDevice(id));
        for( Measurement m : dtos)
        {measurementService.deleteMeasurement(m.getIdMeasurement());}
        return new ResponseEntity<>("Success delete", HttpStatus.OK);
    }
}
