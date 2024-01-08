package org.example.repositories;


import org.example.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {
    @Query
    List<Device> findByDescription(String name);
    @Query
    List<Device> findByAddress(String address);
    @Query
    List<Device> findByPerson(Integer person);
    @Query
    List<Device> findByConsumption(int consumption);
}
