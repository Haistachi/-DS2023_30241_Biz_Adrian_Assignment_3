package org.example.dtos;

import org.example.entities.Device;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class DeviceDTOBuilder {
    public static DeviceDTO toDeviceDTO(Device device) {
        return new DeviceDTO(device.getId(), device.getPerson(), device.getDescription(), device.getAddress(), device.getConsumption());
    }

    public static Device toEntity(DeviceDTO deviceDTO) {
        return new Device(deviceDTO.getPerson(), deviceDTO.getDescription(), deviceDTO.getAddress(), deviceDTO.getConsumption());
    }
    public static Device toEntityWithId(DeviceDTO deviceDTO) {
        return new Device(deviceDTO.getId(), deviceDTO.getPerson(), deviceDTO.getDescription(), deviceDTO.getAddress(),
                deviceDTO.getConsumption());
    }
}
