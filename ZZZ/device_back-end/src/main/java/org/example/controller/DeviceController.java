package org.example.controller;

import org.example.dtos.DeviceDTO;
import org.example.servicies.DeviceServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/device")
public class DeviceController {
    private final DeviceServices deviceServices;

    @GetMapping()
    public ResponseEntity<List<DeviceDTO>> getDevices() {
        List<DeviceDTO> dtos = deviceServices.findDevices();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
    @Autowired
    public DeviceController(DeviceServices deviceServices) {
        this.deviceServices = deviceServices;
    }

    @PostMapping()
    public ResponseEntity<Integer> insertDevice(@Valid @RequestBody DeviceDTO deviceDTO) {
        Integer deviceId = deviceServices.insert(deviceDTO);
        return new ResponseEntity<>(deviceId, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<DeviceDTO> getDevice(@PathVariable("id") Integer deviceId) {
        DeviceDTO dto = deviceServices.findDeviceById(deviceId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteDevice(@PathVariable("id") Integer deviceId) {
        deviceServices.deleteDevice(deviceId);
        return new ResponseEntity<>("Success delete", HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<String> updateDevice(@Valid @RequestBody DeviceDTO deviceDTO) {
        deviceServices.update(deviceDTO);
        return new ResponseEntity<>("Success Update", HttpStatus.OK);
    }

    @GetMapping(value = "/owner/{person}")
    public ResponseEntity<List<DeviceDTO>> getDeviceByOwner(@PathVariable("person") Integer id) {
        List<DeviceDTO> dtos = deviceServices.findDeviceByPerson(id);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}