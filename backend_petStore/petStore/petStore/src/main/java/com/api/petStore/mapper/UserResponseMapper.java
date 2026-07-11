package com.api.petStore.mapper;

import com.api.petStore.dto.response.CustomerResponseDTO;
import com.api.petStore.dto.response.EmployeeResponseDTO;
import com.api.petStore.dto.response.ManagerResponseDTO;
import com.api.petStore.entity.Customer;
import com.api.petStore.entity.Employee;
import com.api.petStore.entity.Manager;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserResponseMapper {
    ManagerResponseDTO toManagerResponseDTO(Manager manager);
    EmployeeResponseDTO toEmployeeResponseDTO(Employee employee);
    CustomerResponseDTO toCustomerResponseDTO(Customer customer);
}
