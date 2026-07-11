package com.api.petStore.mapper;

import com.api.petStore.dto.request.CustomerRequestDTO;
import com.api.petStore.dto.request.EmployeeRequestDTO;
import com.api.petStore.dto.request.ManagerRequestDTO;
import com.api.petStore.entity.Customer;
import com.api.petStore.entity.Employee;
import com.api.petStore.entity.Manager;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    Manager toManager(ManagerRequestDTO dto);
    Employee toEmployee(EmployeeRequestDTO dto);
    Customer toCustomer(CustomerRequestDTO dto);
}