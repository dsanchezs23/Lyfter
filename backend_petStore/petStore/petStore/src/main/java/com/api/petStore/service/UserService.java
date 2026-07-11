package com.api.petStore.service;

import com.api.petStore.dto.request.CustomerRequestDTO;
import com.api.petStore.dto.request.EmployeeRequestDTO;
import com.api.petStore.dto.request.ManagerRequestDTO;
import com.api.petStore.dto.request.UserRequestDTO;
import com.api.petStore.dto.response.UserResponseDTO;
import com.api.petStore.entity.Customer;
import com.api.petStore.entity.Employee;
import com.api.petStore.entity.Manager;
import com.api.petStore.enums.Role;
import lombok.RequiredArgsConstructor;
import com.api.petStore.mapper.UserMapper;
import com.api.petStore.mapper.UserResponseMapper;
import org.springframework.stereotype.Service;
import com.api.petStore.repository.CustomerRepository;
import com.api.petStore.repository.EmployeeRepository;
import com.api.petStore.repository.ManagerRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;
    private final ManagerRepository managerRepository;
    private final UserMapper userMapper;
    private final UserResponseMapper userResponseMapper;

    public UserResponseDTO createUser(UserRequestDTO userRequestDTO, Role role) throws Exception {
        if  (role == Role.MANAGER && userRequestDTO instanceof ManagerRequestDTO managerRequestDTO) {
            Manager manager = userMapper.toManager(managerRequestDTO);
            return userResponseMapper.toManagerResponseDTO(managerRepository.save(manager));
        }
        if (role == Role.EMPLOYEE && userRequestDTO instanceof EmployeeRequestDTO employeeRequestDTO) {
            Employee employee = userMapper.toEmployee(employeeRequestDTO);
            return userResponseMapper.toEmployeeResponseDTO(employeeRepository.save(employee));
        }
        if (userRequestDTO instanceof CustomerRequestDTO customerRequestDTO) {
               Customer customer = userMapper.toCustomer(customerRequestDTO);
               return userResponseMapper.toCustomerResponseDTO(customerRepository.save(customer));
        }

        throw new Exception("Role or DTO type mismatch: It was not possible to create the user");
    }

    public UserResponseDTO getUserById(String id, Role role) throws Exception {
        if  (role == Role.MANAGER) {
            return userResponseMapper.toManagerResponseDTO(managerRepository.findById(id));
        }
        if (role == Role.EMPLOYEE){
            return userResponseMapper.toEmployeeResponseDTO(employeeRepository.findById(id));
        }
        if (role == Role.CUSTOMER){
            return userResponseMapper.toCustomerResponseDTO(customerRepository.findById(id));
        }

        throw new Exception("Role or DTO type mismatch: It was not possible to get the user");
    }

    public List<UserResponseDTO> getAllUsers(Role role) throws Exception {
        if  (role == Role.MANAGER) {
            return managerRepository.findAll().stream()
                    .map(userResponseMapper::toManagerResponseDTO)
                    .collect(Collectors.toList());
        }

        if (role == Role.EMPLOYEE){
            return employeeRepository.findAll().stream()
                    .map(userResponseMapper::toEmployeeResponseDTO)
                    .collect(Collectors.toList());
        }

        if (role == Role.CUSTOMER){
            return customerRepository.findAll().stream()
                    .map(userResponseMapper::toCustomerResponseDTO)
                    .collect(Collectors.toList());
        }

        throw new Exception("Role or DTO type mismatch: It was not possible to get the users");
    }
}
