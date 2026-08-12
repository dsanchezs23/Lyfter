package com.api.petStore.mapper;

import com.api.petStore.dto.request.CustomerRequestDTO;
import com.api.petStore.dto.request.UserRequestDTO;
import com.api.petStore.entity.Customer;
import com.api.petStore.entity.Employee;
import com.api.petStore.entity.Manager;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    Manager toManager(UserRequestDTO dto);
    Employee toEmployee(UserRequestDTO dto);
    Customer toCustomer(CustomerRequestDTO dto);
}